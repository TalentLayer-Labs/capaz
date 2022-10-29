// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CapazERC20 is ERC20 {
    address public owner;

    constructor() ERC20("Capaz", "CPZ") {
        _mint(msg.sender, 100000);
        owner = msg.sender;
    }

    function decimals() public view virtual override returns (uint8) {
        return 2;
    }
}
