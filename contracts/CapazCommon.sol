//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

contract CapazCommon {
    struct Escrow {
        address sender;
        address receiver;
        address tokenAddress;
        uint256 totalAmount;
        uint256 yieldStrategyId;
        uint256 periodDuration;
        uint256 startTime;
        address escrowAddress;
        uint256 times;
    }
}
