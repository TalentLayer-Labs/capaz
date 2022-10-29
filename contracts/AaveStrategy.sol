// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";

contract AaveStrategy {
    /**
     * @param pool AAVE pool proxy address
     * @param token token address
     * @param amount amount to deposit
     *
     * @dev Sender should first approve this contract to spend the amount of tokens to be deposited
     */
    function deposit(
        address pool,
        address token,
        uint256 amount
    ) external {
        // Send tokens to this contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Approve AAVE pool to spend any amount of tokens
        if (IERC20(token).allowance(address(this), pool) < amount) {
            IERC20(token).approve(pool, type(uint256).max);
        }

        // Supply to AAVE
        IPool(pool).supply(token, amount, address(this), 0);
    }

    /**
     * @param pool AAVE pool proxy address
     * @param token token address
     * @param amount amount to withdraw
     * @param user address of the user who should receive the withdrawn tokens
     */
    function claim(
        address pool,
        address token,
        uint256 amount,
        address user
    ) external {
        // Withdraw from AAVE to the user
        IPool(pool).withdraw(token, amount, user);
    }

    /**
     * @param pool AAVE pool proxy address
     * @param token token address
     * @param user address of the user who should receive the withdrawn tokens
     */
    function claimAll(
        address pool,
        address token,
        address user
    ) external {
        // Withdraw from AAVE to the user
        IPool(pool).withdraw(token, type(uint256).max, user);
    }
}
