//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import {CapazCommon} from "../CapazCommon.sol";

interface ICapazEscrowFactory {
    function getEscrow(uint256 tokenId)
        external
        view
        returns (CapazCommon.Escrow memory);
        
    function mint(CapazCommon.Escrow memory _escrow) external returns (uint256);

    function getStrategy(uint256 strategyId) external view returns (address);
}
