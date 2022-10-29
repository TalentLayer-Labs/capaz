// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";

import {IStrategy} from "./interfaces/IStrategy.sol";

contract AaveStrategy is IStrategy, Ownable {

    /**
     * @dev Sender should first approve this contract to spend the amount of tokens to be deposited
     */
    function deposit(address pool, address token, uint256 amount) external onlyOwner {
        // Send tokens to this contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Approve AAVE pool to spend any amount of tokens
        if (IERC20(token).allowance(address(this), pool) < amount) {
            IERC20(token).approve(pool, type(uint256).max);
        }

        console.log("Depositing to pool: ", pool);
        console.log("Token: ", token);
        console.log("Amount: ", amount);
        // Supply to AAVE
        // IPool(pool).supply(token, amount, address(this), 0);
    }

    function claim(address pool, address token, uint256 amount, address user) external onlyOwner {
        console.log("Claiming from pool: ", pool);
        console.log("Token: ", token);
        console.log("Amount: ", amount);
        console.log("User: ", user);

        // Withdraw from AAVE to the user
        // IPool(pool).withdraw(token, amount, user);
    }

    function claimAll(address pool, address token, address user) external onlyOwner {
        console.log("Claiming all from pool: ", pool);
        console.log("Token: ", token);
        console.log("User: ", user);

        // Withdraw from AAVE to the user
        // IPool(pool).withdraw(token, type(uint256).max, user);
    }
}
