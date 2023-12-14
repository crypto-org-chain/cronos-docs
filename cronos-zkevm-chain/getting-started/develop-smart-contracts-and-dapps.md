# Develop smart contracts and dapps

## Developer docs

Please visit zkSync's ZK Stack [reference documentation](https://era.zksync.io/docs/dev/building-on-zksync/hello-world.html).

## APIs/SDKs and JSON RPC endpoint

The JSON-RPC URL is: [https://rpc-zkevm-t0.cronos.org](https://rpc-zkevm-t0.cronos.org).

Please expect the JSON-RPC URL to be rate limited. Rate limits will change over time.

The usual ZK Stack APIs/SDKs can be used on Cronos zkEVM chain: see the [documentation here](https://era.zksync.io/docs/api/).

## Smart contract development using Hardhat

[Hardhat](https://hardhat.org/) is an Ethereum development environment designed for smart contract development in Solidity. You will need the zkSync plugin [documented here](https://era.zksync.io/docs/tools/hardhat/).

To get started with smart contract development:

* [Install Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#installation) as you would do it for an Ethereum project
* Configure your environment for Node 18 (for example, if you use nvm: `nvm use 18)`
* Create a project scaffolding using `npx zksync-cli create my_project_name --template hardhat_solidity` (note:  on some machines like MacOS, this errors if the path to your local directory contains space characters. In that case, start the project somewhere else). You can use npm for dependencies.
* Populate the `.env` file with your developer wallet's private key under the `WALLET_PRIVATE_KEY` variable.

If you encounter issues, please pay attention to dependency limitations. For example, you need to use the OpenZeppelin version supported by the dependencies: ("@openzeppelin/contracts": "^4.6.0") and compiler.

Smart contract verification is not yet supported in Hardhat for the Cronos zkEVM network. This documentation will be updated when it is.

## App development using Python

You can read about the Python SDK, a wrapper around web3.py, [here](https://era.zksync.io/docs/api/python/).

To instantiate the Web3 provider with Cronos zkEVM, simply use:

```python
from zksync2.module.module_builder import ZkSyncBuilder
w3provider = ZkSyncBuilder.build("https://rpc-zkevm-t0.cronos.org/")
```

If you need both the zksync2 library and the web3 library, note that zksync2 is only compatible with version `web3==6.0.0`.

