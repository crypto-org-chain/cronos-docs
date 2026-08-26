// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {MyERC20} from "../src/MyERC20.sol";

// Deploy with:
// forge script script/MyERC20.s.sol:MyERC20Script --rpc-url cronos_testnet --broadcast
contract MyERC20Script is Script {
    function run() external returns (MyERC20 token) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        token = new MyERC20("My token name", "My token symbol");
        vm.stopBroadcast();

        console.log("MyERC20 deployed to:", address(token));
    }
}
