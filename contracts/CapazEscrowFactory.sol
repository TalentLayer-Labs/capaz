//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ICapazEscrow} from "./interfaces/ICapazEscrow.sol";
import {CapazEscrow} from "./CapazEscrow.sol";
import {CapazCommon} from "./CapazCommon.sol";
import {ERC2981} from "./EIP2981/ERC2981.sol";

/**
 * @title CapazEscrowFactory
 * @author Capaz Team @ ETHLisbon Hackathon
 */
contract CapazEscrowFactory is ERC721, ERC2981, Ownable, CapazCommon {
    using Counters for Counters.Counter;
    using Strings for uint256;

    /// tokenId to Escrow mapping
    mapping(uint256 => Escrow) public escrows;

    // Counter of nft
    Counters.Counter private _tokenIdCounter;

    // Strategy id to pool address
    mapping(CapazCommon.Strategy => address) public strategyPools;

    /**
     * Allows a user to mint a new escrow payment
     * Fees defined to the deployer - 0,5%
     */
    constructor() ERC721("Capaz Escrow Tokens", "CET") {
        setRoyalties(msg.sender, 50);
    }

    /**
     * Allows a user to mint a new escrow payment
     * @param _escrow The escrow configuration
     */
    function mint(Escrow memory _escrow)
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
    function getEscrow(uint256 tokenId) public view returns (Escrow memory) {
        return escrows[tokenId];
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC2981, ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * Update royalties recipient and value
     * @param recipient address which will receive the royalties
     * @param value percentage (using 2 decimals - 10000 = 100%)
     */
    function setRoyalties(address recipient, uint256 value) public onlyOwner {
        _setRoyalties(recipient, value);
    }

    /**
     * Get the dynamic token URI
     * @param tokenId NFT id
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721)
        returns (string memory)
    {
        return _buildTokenURI(tokenId);
    }

    /**
     * Get the strategy pool for a given strategy id
     * @param strategyId strategy id
     */
    function getStrategyPool(CapazCommon.Strategy strategyId)
        public
        view
        returns (address)
    {
        return strategyPools[strategyId];
    }

    /**
     * Sets a new strategy pool or updates an existing one
     * 
     * @param strategyId the strategy id
     * @param pool the address of the pool
     */
    function setStrategyPool(CapazCommon.Strategy strategyId, address pool) public onlyOwner {
        strategyPools[strategyId] = pool;
    }

    /**
     * return metadata json with escrow info & a dynamic SVG
     * @param tokenId NFT id
     */
    function _buildTokenURI(uint256 tokenId)
        internal
        view
        returns (string memory)
    {
        Escrow memory escrow = getEscrow(tokenId);
        string memory tokenSymbol = ERC20(escrow.tokenAddress).symbol();
        string memory escrowValue = appendString(
            escrow.totalAmount.toString(),
            " ",
            tokenSymbol
        );

        bytes memory image = abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg"><defs><filter id="A"><feFlood flood-opacity="0"/><feBlend in="SourceGraphic"/><feGaussianBlur stdDeviation="189"/></filter></defs><path fill="#60f" d="M0 0h900v900H0z"/><g filter="url(#A)"><circle cx="469" cy="489" r="420" fill="#4facf7"/><circle cx="353" cy="137" r="420" fill="#60f"/><g fill="#4facf7"><circle cx="708" cy="201" r="420"/><circle cx="276" cy="580" r="420"/></g><circle cx="681" cy="835" r="420" fill="#60f"/><circle cx="105" cy="146" r="420" fill="#4facf7"/></g><text x="30" y="70" fill="#fff">Capaz Escrow</text><text x="30" y="700" fill="#fff">',
                        escrowValue,
                        "</text></svg>"
                    )
                )
            )
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"sender":"',
                                escrow.sender,
                                '{"receiver":"',
                                escrow.receiver,
                                '{"totalAmount":"',
                                escrowValue,
                                '", "image":"',
                                image,
                                unicode'", "description": "Capaz Escrow"}'
                            )
                        )
                    )
                )
            );
    }

    /**
     * concat 3 strings together
     * Notes: as we use solidity 8.10 due to aeve we can't use string.concat function
     */
    function appendString(
        string memory _a,
        string memory _b,
        string memory _c
    ) internal pure returns (string memory) {
        return string(abi.encodePacked(_a, _b, _c));
    }

    /**
     * Checker to ensure that the escrow configuration is valid
     */
    modifier onlyValidEscrow(Escrow memory _escrow) {
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
        Escrow escrow
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
