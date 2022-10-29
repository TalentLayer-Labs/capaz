//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IStrategy {
    /**
     * Deposits the given amount of tokens into the given pool
     * 
     * @param pool pool proxy address
     * @param token token address
     * @param amount amount to deposit
     */
    function deposit(address pool, address token, uint256 amount) external;

    /**
     * Withdraws the given amount of tokens from the pool to a given address
     * 
     * @param pool pool proxy address
     * @param token token address
     * @param amount amount to withdraw
     * @param user address of the user who should receive the withdrawn tokens
     */
    function claim(address pool, address token, uint256 amount, address user) external;

    /**
     * Withdraws the whole amount of tokens from the pool to a given address
     * 
     * @param pool pool proxy address
     * @param token token address
     * @param user address of the user who should receive the withdrawn tokens
     */
    function claimAll(address pool, address token, address user) external;
}
