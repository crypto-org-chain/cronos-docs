// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {MyERC721} from "../src/MyERC721.sol";

// Deploy with:
// forge script script/MyERC721.s.sol:MyERC721Script --rpc-url cronos_testnet --broadcast
contract MyERC721Script is Script {
    function run() external returns (MyERC721 token) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        // MyERC721 constructor takes no arguments
        token = new MyERC721();
        vm.stopBroadcast();

        console.log("MyERC721 deployed to:", address(token));
    }
}
