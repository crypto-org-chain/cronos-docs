// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {MyERC20} from "../src/MyERC20.sol";

contract MyERC20Test is Test {
    MyERC20 internal token;
    address internal deployer = address(this);
    address internal alice = address(0xA11CE);

    function setUp() public {
        token = new MyERC20("My token name", "My token symbol");
    }

    function test_Metadata() public view {
        assertEq(token.name(), "My token name");
        assertEq(token.symbol(), "My token symbol");
    }

    function test_InitialSupplyMintedToDeployer() public view {
        uint256 expected = 1_000_000 * (10 ** 18);
        assertEq(token.totalSupply(), expected);
        assertEq(token.balanceOf(deployer), expected);
    }

    function test_MinterCanMint() public {
        token.mint(alice, 500);
        assertEq(token.balanceOf(alice), 500);
    }

    function test_NonMinterCannotMint() public {
        vm.prank(alice);
        vm.expectRevert();
        token.mint(alice, 500);
    }

    function test_PauseBlocksTransfers() public {
        token.pause();
        vm.expectRevert();
        token.transfer(alice, 1);
    }
}
