# Develop smart contracts and dapps

## Developer docs

Please visit zkSync's ZK Stack [reference documentation](https://era.zksync.io/docs/dev/building-on-zksync/hello-world.html).

## APIs/SDKs and JSON RPC endpoint

The JSON-RPC URL is: [https://rpc-zkevm-t0.cronos.org](https://rpc-zkevm-t0.cronos.org).

Please expect the JSON-RPC URL to be rate limited. Rate limits will change over time.

The usual ZK Stack APIs/SDKs can be used on Cronos zkEVM chain: see the [documentation here](https://era.zksync.io/docs/api/).

## Smart contract development using Hardhat (Javascript)

[Hardhat](https://hardhat.org/) is an Ethereum development environment designed for smart contract development in Solidity. You will need the zkSync plugin [documented here](https://era.zksync.io/docs/tools/hardhat/).

For your convenience, you can refer to this working [Hardhat boilerplate project](https://github.com/kentimsit/cronos-zkevm-hardhat-boilerplate) specifically customized for Cronos zkEVM:

* Refer to the [README.md](https://github.com/kentimsit/cronos-zkevm-hardhat-boilerplate/blob/main/README.md) file for a list of frequently used commands.
* The typical network configuration parameters are shown in the [hardhat.config.ts](https://github.com/kentimsit/cronos-zkevm-hardhat-boilerplate/blob/main/hardhat.config.ts) file.
* The [scripts](https://github.com/kentimsit/cronos-zkevm-hardhat-boilerplate/tree/main/scripts) directory contains some useful examples of scripts and functions that you may need to execute L1 <> L2 cross-chain transactions.

Due to Cronos zkEVM's custom protocol token (TCRO instead of ETH), not all zkSync Javascript SDK methods work as intended, and in that case you need to call the underlying smart contracts directly. Please look at the scripts directory to find the correct approach for your use case.

If you are planning to deploy a ERC20 token on Cronos zkEVM, keep in mind that there are two ways to do this:

* Deploy directly on the L2: this approach is simple to implement, but in that case, the ERC20 token won’t be supported natively by the hyperbridge between L1 and L2, and between hyperchains. A custom bridge will be required to withdraw or transfer tokens from the L2.
* Deploy first on the L1, then deposit to the L2: this approach requires two steps, but its advantage is that the tokens will be natively supported by the hyperbridge between L1 and L2. They can be deposited into the L2, or withdrawn from the L2, at will. When the first token is deposited from L1 to L2, the hyberbridge automatically creates a ERC20 smart contract on L2, which is the representation of the L1 token on the L2.

After deploying your smart contract, you will need to publish and verify its code in the block explorer:

* If you have deployed directly on the L2, the deployment script included in the boilerplate project performs the contract code publication and verification automatically.
* If you deploy first on the L1 (Ethereum Sepolia), you can publish and verify the contract code on the Etherscan Sepolia block explorer as usual. With respect to publishing and verifying the code of the L2 smart contract created by the hyperbridge, this is not yet supported.

## App development using Python

You can read about the Zksync Python SDK, a wrapper around web3.py, [here](https://era.zksync.io/docs/api/python/).

To instantiate the Web3 provider with Cronos zkEVM, simply use:

```python
from zksync2.module.module_builder import ZkSyncBuilder
w3provider = ZkSyncBuilder.build("https://rpc-zkevm-t0.cronos.org/")
```

If you need both the zksync2 library and the web3 library, note that zksync2 is only compatible with version `web3==6.0.0`.

