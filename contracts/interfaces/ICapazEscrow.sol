//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface ICapazEscrow {
    function setup(uint256 _tokenId) external;

    function release() external returns (uint256);
}
