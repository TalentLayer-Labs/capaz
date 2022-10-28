//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

/**
 * @title CapazCommon
 * @author Capaz Team @ ETHLisbon Hackathon
 */
contract CapazCommon {
    /// @notice Shared Escrow informations
    /// @param sender the sender of the funds
    /// @param receiver the receiver of the funds
    /// @param tokenAddress the erc20 token address
    /// @param totalAmount the total amount of tokens to be escrowed
    /// @param startTime the start of the first period
    /// @param periodDuration the duration of each period in seconds (Could be in seconds: 3 hours, 5days, 1 week...)
    /// @param periods the total numbers of periods
    /// @param yieldStrategyId the Id of the yield strategy to be use
    /// @param escrowAddress the address of the dedecated CapazEscrow instance
    struct Escrow {
        address sender;
        address receiver;
        address tokenAddress;
        uint256 totalAmount;
        uint256 startTime;
        uint256 periodDuration;
        uint256 periods;
        uint256 yieldStrategyId;
        address escrowAddress;
    }
}
