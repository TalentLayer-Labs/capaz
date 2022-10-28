//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {ICapazEscrow} from "./interfaces/ICapazEscrow.sol";
import {CapazEscrow} from "./CapazEscrow.sol";
import {CapazCommon} from "./CapazCommon.sol";

contract CapazEscrowFactory is ERC721 {
    using Counters for Counters.Counter;

    mapping(uint256 => CapazCommon.Escrow) public escrows;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Capaz Escrow Tokens", "CET") {}

    function mint(CapazCommon.Escrow memory _escrow)
        public
        onlyValidEscrow(_escrow)
        returns (uint256)
    {
        //!TODO right now done without using openzeppelin clone

        address newEscrow = address(new CapazEscrow());
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _escrow.escrowAddress = newEscrow;
        escrows[tokenId] = _escrow;
        _safeMint(_escrow.receiver, tokenId);

        emit EscrowCreated(_escrow.sender, _escrow.receiver, _escrow);

        return tokenId;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        super.transferFrom(from, to, tokenId);
        escrows[tokenId].receiver = to;

        emit ReceiverUpdated(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        super.safeTransferFrom(from, to, tokenId);
        escrows[tokenId].receiver = to;

        emit ReceiverUpdated(from, to, tokenId);
    }

    function getEscrow(uint256 tokenId)
        public
        view
        returns (CapazCommon.Escrow memory)
    {
        return escrows[tokenId];
    }

    modifier onlyValidEscrow(CapazCommon.Escrow memory _esc) {
        require(
            _esc.totalAmount > 0,
            "CapazEscrowFactory: totalAmount must be greater than 0"
        );
        require(
            _esc.periodDuration > 0,
            "CapazEscrowFactory: periodDuration must be greater than 0"
        );
        require(
            _esc.periods > 0,
            "CapazEscrowFactory: times must be greater than 0"
        );
        require(
            _esc.startTime > block.timestamp,
            "CapazEscrowFactory: startTime must be greater than current time"
        );
        _;
    }

    event EscrowCreated(
        address indexed sender,
        address indexed receiver,
        CapazCommon.Escrow escrow
    );

    event ReceiverUpdated(
        address indexed sender,
        address indexed receiver,
        uint256 tokenId
    );
}
