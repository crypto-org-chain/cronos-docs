// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {MyERC1155} from "../src/MyERC1155.sol";

contract MyERC1155Test is Test {
    MyERC1155 internal token;
    address internal alice = address(0xA11CE);

    string constant TOKEN_URI = "https://example.com/api/token/{id}.json";

    function setUp() public {
        token = new MyERC1155(TOKEN_URI);
    }

    function test_Uri() public view {
        assertEq(token.uri(0), TOKEN_URI);
    }

    function test_MinterCanMint() public {
        token.mint(alice, 1, 10, "");
        assertEq(token.balanceOf(alice, 1), 10);
    }

    function test_MinterCanMintBatch() public {
        uint256[] memory ids = new uint256[](2);
        ids[0] = 1;
        ids[1] = 2;
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 5;
        amounts[1] = 7;

        token.mintBatch(alice, ids, amounts, "");
        assertEq(token.balanceOf(alice, 1), 5);
        assertEq(token.balanceOf(alice, 2), 7);
    }

    function test_NonMinterCannotMint() public {
        vm.prank(alice);
        vm.expectRevert();
        token.mint(alice, 1, 10, "");
    }

    function test_PauseBlocksMint() public {
        token.pause();
        vm.expectRevert();
        token.mint(alice, 1, 10, "");
    }
}
