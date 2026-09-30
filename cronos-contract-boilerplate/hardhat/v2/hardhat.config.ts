import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const privateKey: string = <string>process.env.PRIVATE_KEY;
const accounts: string[] = privateKey ? [privateKey] : [];
const cronosApiKeyMainnet: string = <string>(
    process.env.CRONOS_EXPLORER_MAINNET_API_KEY
);
const cronosApiKeyTestnet: string = <string>(
    process.env.CRONOS_EXPLORER_TESTNET_API_KEY
);

task("accounts", "Prints the list of accounts", async (args, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const config: HardhatUserConfig = {
    networks: {
        hardhat: {},
        cronos: {
            url: "https://evm.cronos.com/",
            chainId: 25,
            accounts,
            gasPrice: 10100000000000,
        },
        cronosTestnet: {
            url: "https://evm-t3.cronos.com/",
            chainId: 338,
            accounts,
            gasPrice: 10100000000000,
        },
    },
    etherscan: {
        apiKey: {
            cronos: cronosApiKeyMainnet,
            cronosTestnet: cronosApiKeyTestnet,
        },
        customChains: [
            {
                network: "cronos",
                chainId: 25,
                urls: {
                    apiURL:
                        "https://explorer-api.cronos.org/mainnet/api/v1/hardhat/contract?apikey=" +
                        cronosApiKeyMainnet,
                    browserURL: "https://explorer.cronos.com",
                },
            },
            {
                network: "cronosTestnet",
                chainId: 338,
                urls: {
                    apiURL:
                        "https://explorer-api.cronos.org/testnet/api/v1/hardhat/contract?apikey=" +
                        cronosApiKeyTestnet,
                    browserURL: "https://explorer.cronos.com/testnet",
                },
            },
        ],
    },
    solidity: {
        version: "0.8.28",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            evmVersion: "cancun",
        },
    },
};

export default config;
