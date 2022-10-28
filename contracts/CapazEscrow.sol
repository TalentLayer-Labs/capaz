//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {ICapazEscrowFactory} from "./interfaces/ICapazEscrowFactory.sol";
import {CapazCommon} from "./CapazCommon.sol";

contract CapazEscrow is Ownable {
    ICapazEscrowFactory escrowFactory;
    uint256 tokenId;
    uint256 claimedAmount;
    bool isYieldClaimed;

    function setup(uint256 _tokenId) public onlyOwner {
        tokenId = _tokenId;
        escrowFactory = ICapazEscrowFactory(owner());
        claimedAmount = 0;
    }

    function intialise() public onlySender {
        CapazCommon.Escrow memory esc = es();
        address token = esc.tokenAddress;
        //!TODO deposit funds into strategy

        emit Initialised(esc.sender, esc.receiver, esc);
    }

    function releasableAmount() public view returns (uint256) {
        CapazCommon.Escrow memory esc = es();
        uint256 periods = esc.periods;
        uint256 periodsPassed = Math.min(
            (block.timestamp - esc.startTime) / esc.periodDuration,
            periods
        );
        uint256 releasable = (periodsPassed * esc.totalAmount) / periods;
        return releasable;
    }

    function release() public onlySender {
        CapazCommon.Escrow memory esc = es();
        address receiver = esc.receiver;
        uint256 releasable = releasableAmount();
        IERC20(esc.tokenAddress).transfer(receiver, releasable);
        claimedAmount += releasableAmount();

        emit Released(receiver, releasable);
    }

    function distributeYield(address user1, address user2) public {
        // claim yield and distribute
        CapazCommon.Escrow memory esc = es();
        require(
            block.timestamp >= escrowEndTimestamp(esc),
            "CapazEscrow: Escrow has not ended yet"
        );
        require(!isYieldClaimed, "CapazEscrow: Yield already claimed");

        //!TODO claim yield and distribute
        if (user1 == user2) {
            // send all to same user
        } else {
            // send half to each user
        }
        uint256 amount;
        emit YieldDistributed(user1, user2, amount);
    }

    function es() public view returns (CapazCommon.Escrow memory) {
        return escrowFactory.getEscrow(tokenId);
    }

    function escrowLenght(CapazCommon.Escrow memory _es)
        public
        pure
        returns (uint256)
    {
        return _es.periods * _es.periodDuration;
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

    event Initialised(
        address indexed sender,
        address indexed receiver,
        CapazCommon.Escrow escrow
    );
    event Released(address receiver, uint256 amount);
    event YieldDistributed(address user1, address user2, uint256 amount);
}
