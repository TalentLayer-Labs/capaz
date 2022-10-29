// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {DataTypes} from "@aave/core-v3/contracts/protocol/libraries/types/DataTypes.sol";

import {IStrategy} from "./interfaces/IStrategy.sol";

contract AaveStrategy is IStrategy, Ownable {
    // AAVE Pool Proxy address
    IPool public pool;

    constructor(address _pool) {
        pool = IPool(_pool);
    }

    /**
     * Update pool address
     */
    function setPool(address _pool) external onlyOwner {
        pool = IPool(_pool);
    }

    /**
     * @dev Sender should first approve this contract to spend the amount of tokens to be deposited
     */
    function deposit(address token, uint256 amount) external onlyOwner {
        // Send tokens to this contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Approve AAVE pool to spend any amount of tokens
        if (IERC20(token).allowance(address(this), address(pool)) < amount) {
            IERC20(token).approve(address(pool), type(uint256).max);
        }

        // Supply to AAVE
        pool.supply(token, amount, address(this), 0);

        // Get aToken address from underlying token address
        IERC20 aToken = IERC20(getYieldTokenFromUnderlying(token));
        
        // Send aTokens to the sender
        aToken.transfer(msg.sender, aToken.balanceOf(address(this)));
    }

    /**
     * @dev Sender should first approve this contract to spend the amount of aTokens to be used for withdraw
     */
    function claim(address token, uint256 amount, address user) external onlyOwner {
        // Get aToken address from underlying token address
        IERC20 aToken = IERC20(getYieldTokenFromUnderlying(token));

        // Get aTokens from sender
        aToken.transferFrom(msg.sender, address(this), amount);
        
        // Withdraw from AAVE to the user
        pool.withdraw(token, amount, user);
    }

    /**
     * @dev Sender should first approve this contract to spend its entire amount of aTokens
     */
    function claimAll(address token, address user) external onlyOwner {
        // Get aToken address from underlying token address
        IERC20 aToken = IERC20(getYieldTokenFromUnderlying(token));

        // Get all aTokens from sender
        aToken.transferFrom(msg.sender, address(this), aToken.balanceOf(msg.sender));

        // Withdraw from AAVE to the user
        pool.withdraw(token, type(uint256).max, user);
    }

    /**
     * Returns the address of the aToken corresponding to the given underlying token
     * @param token address of the underlying token
     */
    function getYieldTokenFromUnderlying(address token) public view returns (address) {
        DataTypes.ReserveData memory reserveData = pool.getReserveData(token);
        return reserveData.aTokenAddress;
    }
}
