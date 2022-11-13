// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ICapazEscrowFactory} from "./interfaces/ICapazEscrowFactory.sol";
import {ICapazEscrow} from "./interfaces/ICapazEscrow.sol";
import {CapazCommon} from "./CapazCommon.sol";
import {IwETH} from "./interfaces/IwETH.sol";

/**
 * @title CapazWETHAdapter
 * @author Capaz Team @ ETHLisbon Hackathon
 */
contract CapazWETHAdapter is Ownable, ReentrancyGuard, CapazCommon {
    ICapazEscrowFactory public escrowFactory;
    IwETH public wETH;

    /**
     * @param _escrowFactory The escrow factory address
     * @param _wETH The wETH address
     */
    constructor(address _escrowFactory, address _wETH) {
        escrowFactory = ICapazEscrowFactory(_escrowFactory);
        wETH = IwETH(_wETH);
    }

    /**
     * @notice Wraps ETH and mints a new escrow
     * @param _escrow Escrow information
     */
    function mint(Escrow memory _escrow)
        public
        payable
        virtual
        nonReentrant
        onlyValidEscrow(_escrow)
    {
        wETH.deposit{value: msg.value}();
        wETH.approve(address(escrowFactory), msg.value);
        escrowFactory.mint(_escrow);
    }

    /**
     * @notice Redeems wETH from an escrow and unwraps it
     * @param _escrow Escrow information
     */
    function redeem(Escrow memory _escrow) public payable virtual nonReentrant {
        uint256 amount = ICapazEscrow(_escrow.escrowAddress).release();
        wETH.withdraw(amount);
        payable(_escrow.receiver).transfer(amount);
    }

    /**
     * @notice Updates escrow factory address
     * @dev Revert if caller is not `owner`
     * @param _newEscrowFactory address of the new escrow factory
     */
    function updateEscrowFactory(address _newEscrowFactory) external onlyOwner {
        escrowFactory = ICapazEscrowFactory(_newEscrowFactory);
    }

    /**
     * Retrieve ETH balance from the adapter
     * @param _to user to send the funds
     * @param _amount amount to send
     */
    function emergencyReturn(address _to, uint256 _amount) external onlyOwner {
        payable(_to).transfer(_amount);
    }

    receive() external payable {}

    modifier onlyValidEscrow(Escrow memory _escrow) {
        require(
            _escrow.tokenAddress == address(wETH),
            "Capaz: Invalid token address"
        );
        require(msg.value > 0, "Capaz: Invalid amount");
        require(msg.value == _escrow.totalAmount, "Capaz: Invalid amount");
        _;
    }
}
