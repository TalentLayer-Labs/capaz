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
     */
    function deposit(address pool, address token, uint256 amount) external {
        // TODO: add address of the user to params

        // Send tokens to this contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

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
     * @param user address of the user who should received the withdrawn tokens
     */
    function claim(address pool, address token, uint256 amount, address user) external {
        // Withdraw from AAVE to the user
        IPool(pool).withdraw(token, amount, user);
    }

    /**
     * @param pool AAVE pool proxy address
     * @param token token address
     * @param user address of the user who should received the withdrawn tokens
     */
    function claimAll(address pool, address token, address user) external {
        // Withdraw from AAVE to the user
        IPool(pool).withdraw(token, type(uint).max, user);
    }
}
