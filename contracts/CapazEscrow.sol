//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {ICapazEscrowFactory} from "./interfaces/ICapazEscrowFactory.sol";
import {IStrategy} from "./interfaces/IStrategy.sol";
import {CapazCommon} from "./CapazCommon.sol";
import {AaveStrategy} from "./AaveStrategy.sol";

/**
 * @title CapazEscrow
 * @author Capaz Team @ ETHLisbon Hackathon
 */
contract CapazEscrow is Ownable {
    ICapazEscrowFactory escrowFactory;
    uint256 tokenId;
    uint256 claimedAmount;
    bool isYieldClaimed;
    IStrategy strategy;


    /**
     * Function called when the contract instance is cloned
     * @param _tokenId The tokenId to setup
     */
    function setup(uint256 _tokenId) public onlyOwner {
        tokenId = _tokenId;
        escrowFactory = ICapazEscrowFactory(owner());
        CapazCommon.Escrow memory escrow = getEscrow();

        CapazCommon.Strategy strategyId = escrow.yieldStrategyId;

        // Check if a strategy is set
        if (strategyId != CapazCommon.Strategy.None) {
            if (strategyId == CapazCommon.Strategy.Aave) {
                strategy = new AaveStrategy();
            } else {
                revert("Strategy not supported");
            }

            address token = escrow.tokenAddress;
            uint256 totalAmount = escrow.totalAmount;

            // Approve strategy to use token
            IERC20(token).approve(address(strategy), totalAmount);

            // Deposit token to strategy pool
            address pool = escrowFactory.getStrategyPool(escrow.yieldStrategyId);
            strategy.deposit(pool, token, totalAmount);
        } 

        emit SetUp(escrow.sender, escrow.receiver, escrow);
    }

    /**
     * Get the total amount of token that the receiver can claimed
     */
    function releasableAmount() public view returns (uint256) {
        CapazCommon.Escrow memory escrow = getEscrow();
        uint256 periods = escrow.periods;
        uint256 periodsPassed = Math.min(
            (block.timestamp - escrow.startTime) / escrow.periodDuration,
            periods
        );
        uint256 releasable = (periodsPassed * escrow.totalAmount) / periods;
        return releasable;
    }

    /**
     * Let the receiver release the avaiable funds
     */
    function release() public onlyReceiver {
        CapazCommon.Escrow memory escrow = getEscrow();
        address receiver = escrow.receiver;
        uint256 amount = releasableAmount();
        require(amount > 0, "You don't have any funds to release");
        IERC20(escrow.tokenAddress).transfer(receiver, amount);
        claimedAmount += amount;

        emit Released(receiver, amount);
    }

    /**
     * Let the sender get is yield and choose how he want to distribute them
     */
    function distributeYield(address user1, address user2) public onlySender {
        // claim yield and distribute
        CapazCommon.Escrow memory escrow = getEscrow();
        require(
            block.timestamp >= escrowEndTimestamp(escrow),
            "CapazEscrow: Escrow has not ended yet"
        );
        require(!isYieldClaimed, "CapazEscrow: Yield already claimed");

        //!TODO first release the remaining funds
        
        //!TODO claim yield and distribute
        if (user1 == user2) {
            // send all to same user
        } else {
            // send half to each user
        }
        uint256 amount;
        emit YieldDistributed(user1, user2, amount);
    }

    /**
     * Get the escrow configuration linked to this instance
     */
    function getEscrow() public view returns (CapazCommon.Escrow memory) {
        return escrowFactory.getEscrow(tokenId);
    }

    /**
     * Get the total duration of the escrow
     */
    function escrowLenght(CapazCommon.Escrow memory _escrow)
        public
        pure
        returns (uint256)
    {
        return _escrow.periods * _escrow.periodDuration;
    }

    /**
     * Get the timestamt of the last period
     */
    function escrowEndTimestamp(CapazCommon.Escrow memory _escrow)
        public
        pure
        returns (uint256)
    {
        return _escrow.startTime + escrowLenght(_escrow);
    }

    /**
     * Checker to ensure that the caller is the sender of the escrow
     */
    modifier onlySender() {
        require(
            msg.sender == escrowFactory.getEscrow(tokenId).sender,
            "CapazEscrow: Only sender can call this function"
        );
        _;
    }

    /**
     * Checker to ensure that the caller is the receiver of the escrow
     */
    modifier onlyReceiver() {
        require(
            msg.sender == escrowFactory.getEscrow(tokenId).receiver,
            "CapazEscrow: Only receiver can call this function"
        );
        _;
    }

    /**
     * Emit when the contract is created
     * @param sender Address of the sender of the escrow
     * @param receiver Address of the receiver of the escrow
     * @param escrow the complete escrow configuration
     */
    event SetUp(
        address indexed sender,
        address indexed receiver,
        CapazCommon.Escrow escrow
    );

    /**
     * Emit when funds are released to the receiver
     * @param receiver Address of the receiver of the escrow
     * @param amount total token released
     */
    event Released(address receiver, uint256 amount);

    /**
     * Emit when yields are distributed
     * @param user1 Address of first user to share the yield
     * @param user2 Address of second user to share the yield
     */
    event YieldDistributed(address user1, address user2, uint256 amount);
}
