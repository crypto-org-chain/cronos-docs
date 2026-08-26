// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {MyERC1155} from "../src/MyERC1155.sol";

// Deploy with:
// forge script script/MyERC1155.s.sol:MyERC1155Script --rpc-url cronos_testnet --broadcast
contract MyERC1155Script is Script {
    string constant TOKEN_URI = "https://example.com/api/token/{id}.json";

    function run() external returns (MyERC1155 token) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        token = new MyERC1155(TOKEN_URI);
        vm.stopBroadcast();

        console.log("MyERC1155 deployed to:", address(token));
    }
}
