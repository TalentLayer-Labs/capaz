//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {ICapazEscrow} from "./interfaces/ICapazEscrow.sol";
import {CapazEscrow} from "./CapazEscrow.sol";
import {CapazCommon} from "./CapazCommon.sol";

/**
 * @title CapazEscrowFactory
 * @author Capaz Team @ ETHLisbon Hackathon
 */
contract CapazEscrowFactory is ERC721 {
    using Counters for Counters.Counter;

    /// tokenId to Escrow mapping
    mapping(uint256 => CapazCommon.Escrow) public escrows;

    // Counter of nft
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Capaz Escrow Tokens", "CET") {}

    /**
     * Allows a user to mint a new escrow payment
     * @param _escrow The escrow configuration
     */
    function mint(CapazCommon.Escrow memory _escrow)
        public
        onlyValidEscrow(_escrow)
        returns (uint256)
    {
        //!TODO right now done without using openzeppelin clone
        address newEscrow = address(new CapazEscrow());
        IERC20(_escrow.tokenAddress).transferFrom(
            _escrow.sender,
            newEscrow,
            _escrow.totalAmount
        );
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _escrow.escrowAddress = newEscrow;
        escrows[tokenId] = _escrow;
        ICapazEscrow(newEscrow).setup(tokenId);
        _safeMint(_escrow.receiver, tokenId);

        emit EscrowCreated(_escrow.sender, _escrow.receiver, _escrow);

        return tokenId;
    }

    /**
     * Transfer - the new owner of the nft become the receiver of the funds
     * @param from address of the sender
     * @param to address of the receiver
     * @param tokenId to transfer
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        super.transferFrom(from, to, tokenId);
        escrows[tokenId].receiver = to;

        emit ReceiverUpdated(from, to, tokenId);
    }

    /**
     * SafeTransfer - the new owner of the nft become the receiver of the funds
     * @param from address of the sender
     * @param to address of the receiver
     * @param tokenId NFT id to transfer
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        super.safeTransferFrom(from, to, tokenId);
        escrows[tokenId].receiver = to;

        emit ReceiverUpdated(from, to, tokenId);
    }

    /**
     * Get the escrow configuration for a given tokenId
     * @param tokenId nft id
     */
    function getEscrow(uint256 tokenId)
        public
        view
        returns (CapazCommon.Escrow memory)
    {
        return escrows[tokenId];
    }

    /**
     * Checker to ensure that the escrow configuration is valid
     */
    modifier onlyValidEscrow(CapazCommon.Escrow memory _escrow) {
        require(
            _escrow.totalAmount > 0,
            "CapazEscrowFactory: totalAmount must be greater than 0"
        );
        require(
            _escrow.periodDuration > 0,
            "CapazEscrowFactory: periodDuration must be greater than 0"
        );
        require(
            _escrow.periods > 0,
            "CapazEscrowFactory: times must be greater than 0"
        );
        require(
            _escrow.startTime > block.timestamp,
            "CapazEscrowFactory: startTime must be greater than current time"
        );
        _;
    }

    /**
     * Emit when a new escrow is created
     * @param sender Address of the sender of the escrow
     * @param receiver Address of the receiver of the escrow
     * @param escrow the complete escrow configuration
     */
    event EscrowCreated(
        address indexed sender,
        address indexed receiver,
        CapazCommon.Escrow escrow
    );

    /**
     * Emit when the NFT is transfered
     * @param sender Address of the sender of the escrow
     * @param receiver Address of the new receiver of the escrow
     * @param tokenId NFT id
     */
    event ReceiverUpdated(
        address indexed sender,
        address indexed receiver,
        uint256 tokenId
    );
}
