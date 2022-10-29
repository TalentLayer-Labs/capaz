//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IStrategy {
    /**
     * Deposits the given amount of tokens into the given pool
     * 
     * @param token token address
     * @param amount amount to deposit
     */
    function deposit(address token, uint256 amount) external;

    /**
     * Withdraws the given amount of tokens from the pool to a given address
     * 
     * @param token token address
     * @param amount amount to withdraw
     * @param user address of the user who should receive the withdrawn tokens
     */
    function claim(address token, uint256 amount, address user) external;

    /**
     * Withdraws the whole amount of tokens from the pool to a given address
     * 
     * @param token token address
     * @param user address of the user who should receive the withdrawn tokens
     */
    function claimAll(address token, address user) external;

    /**
     * Returns the amount of the strategy yield token given the underlying token
     * @param token the underlying token
     */
    function getYieldTokenFromUnderlying(address token) external view returns (address) ;
}
