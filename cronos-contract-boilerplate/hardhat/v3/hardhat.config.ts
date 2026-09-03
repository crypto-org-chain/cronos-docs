import "dotenv/config";
import hardhatToolboxViem from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable, defineConfig } from "hardhat/config";
import hardhatVerify from "@nomicfoundation/hardhat-verify";

const networkArg = process.argv[process.argv.indexOf('--network') + 1] ?? 'hardhat';
console.log('Network:', networkArg);

export default defineConfig({
    plugins: [hardhatToolboxViem, hardhatVerify,],
    solidity: {
        profiles: {
            default: {
                version: "0.8.28",
            },
            production: {
                version: "0.8.28",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        },
    },
    networks: {
        cronos: {
            type: "http",
            chainType: "l1",
            url: "https://evm.cronos.com/",
            chainId: 25,
            accounts: [configVariable("PRIVATE_KEY")],
            gasPrice: 10100000000000,
        },
        cronosTestnet: {
            type: "http",
            chainType: "l1",
            url: "https://evm-t3.cronos.com/",
            chainId: 338,
            accounts: [configVariable("PRIVATE_KEY")],
            gasPrice: 10100000000000,
        },
    },
    chainDescriptors: {
        25: {
            name: "cronos",
            blockExplorers: {
                etherscan: {
                    name: "Cronos Explorer",
                    url: "https://explorer.cronos.com",
                    apiUrl:
                        "https://explorer-api.cronos.org/mainnet/api/v2",
                },
            },
        },
        338: {
            name: "cronosTestnet",
            blockExplorers: {
                etherscan: {
                    name: "Cronos Explorer Testnet",
                    url: "https://explorer.cronos.com/testnet",
                    apiUrl: "https://explorer-api.cronos.org/testnet/api/v2",
                },
            },
        },
    },
    verify: {
        etherscan: {
            apiKey: networkArg === "cronos"
                ? configVariable("CRONOS_EXPLORER_MAINNET_API_KEY") ?? ""
                : networkArg === "cronosTestnet"
                    ? configVariable("CRONOS_EXPLORER_TESTNET_API_KEY") ?? ""
                    : "",
        },
        blockscout: {
            enabled: false,
        },
        sourcify: {
            enabled: false,
        },
    },
});
