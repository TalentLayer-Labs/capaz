//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ICapazEscrowFactory} from "./interfaces/ICapazEscrowFactory.sol";
import {CapazCommon} from "./CapazCommon.sol";

contract CapazEscrow is Ownable {
    uint256 tokenId;
    ICapazEscrowFactory escrowFactory;

    function setup(uint256 _tokenId) public onlyOwner {
        tokenId = _tokenId;
        escrowFactory = ICapazEscrowFactory(owner());
    }

    function intialise() public onlySender {
        CapazCommon.Escrow memory esc = es();
        address token = esc.tokenAddress;

        // deposit funds into aave
    }

    function releasableAmount(address _beneficiary)
        public
        view
        returns (uint256)
    {
        // calculate releasable amount
    }

    function vestedAmount(address _beneficiary) public view returns (uint256) {
        // calculate vested amount
    }

    function release() public onlySender {
        // release funds
    }

    function distributeYield() public {
        // claim yield and distribute
        CapazCommon.Escrow memory esc = es();
        require(
            block.timestamp >= escrowEndTimestamp(esc),
            "CapazEscrow: Escrow has not ended yet"
        );
    }

    function es() public view returns (CapazCommon.Escrow memory) {
        return escrowFactory.getEscrow(tokenId);
    }

    function escrowLenght(CapazCommon.Escrow memory _es)
        public
        pure
        returns (uint256)
    {
        return _es.times * _es.periodDuration;
    }

    function escrowEndTimestamp(CapazCommon.Escrow memory _es)
        public
        pure
        returns (uint256)
    {
        return _es.startTime + escrowLenght(_es);
    }

    modifier onlySender() {
        require(
            msg.sender == escrowFactory.getEscrow(tokenId).sender,
            "CapazEscrow: Only sender can call this function"
        );
        _;
    }

    modifier onlyReceiver() {
        require(
            msg.sender == escrowFactory.getEscrow(tokenId).receiver,
            "CapazEscrow: Only sender can call this function"
        );
        _;
    }
}
