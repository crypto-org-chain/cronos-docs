// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {MyERC721} from "../src/MyERC721.sol";

contract MyERC721Test is Test {
    MyERC721 internal token;
    address internal alice = address(0xA11CE);

    function setUp() public {
        token = new MyERC721();
    }

    function test_Metadata() public view {
        assertEq(token.name(), "MyToken");
        assertEq(token.symbol(), "MTK");
    }

    function test_MinterCanMint() public {
        token.safeMint(alice, "ipfs://token/0");
        assertEq(token.ownerOf(0), alice);
        assertEq(token.tokenURI(0), "ipfs://token/0");
    }

    function test_NonMinterCannotMint() public {
        vm.prank(alice);
        vm.expectRevert();
        token.safeMint(alice, "ipfs://token/0");
    }

    function test_PauseBlocksMint() public {
        token.pause();
        vm.expectRevert();
        token.safeMint(alice, "ipfs://token/0");
    }
}
