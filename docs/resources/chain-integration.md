# Cronos Integration documentation 

## Useful Links

- [Cronos website](https://cronos.crypto.org/)
- [GitHub Repository](https://github.com/crypto-org-chain/cronos)
- [Official Documentation](https://cronos.crypto.org/docs/)
- [Faucet](https://cronos.crypto.org/faucet/) (Note that the faucet only takes eth-type `0x...`  addr)
- [Binaries](https://github.com/crypto-org-chain/cronos/releases)
- [Seeds for fullnode](https://github.com/crypto-org-chain/cronos-testnets/blob/main/testnet.json#L2)
- [Testnet genesis](https://github.com/crypto-org-chain/cronos-testnets/blob/main/cronostestnet_338-1/genesis.json)


## Setup Guide

- **Cronos Testnet**:
    - [Joining the Cronos Testnet](https://cronos.crypto.org/docs/getting-started/)
    - [Using MetaMask](https://cronos.crypto.org/docs/getting-started/metamask.html)
    - [Deploying Smart Contract](https://cronos.crypto.org/docs/getting-started/cronos-smart-contract.html)

- **Mainnet**:
    - [Running a full node;](https://crypto.org/docs/getting-started/mainnet.html)
    - [Running a validator;](https://crypto.org/docs/getting-started/mainnet_validator.html)
    - [Mainnet Validator Security Checklist.](https://crypto.org/docs/getting-started/security-checklist.html#part-1-conduct-survey-on-general-controls-of-hosting-data-centre)    

- **Croeseid Testnet**: 
    - [Joining the Croeseid Testnet](https://crypto.org/docs/getting-started/croeseid-testnet.html)
    - [Deploy testnet node with nix](https://crypto.org/docs/getting-started/croeseid-testnet-nix.html#pre-requisites)

- **Devnet**
    - [Running latest development network locally](https://crypto.org/docs/getting-started/local-devnet.html#overview)

## RPCs for Cronos Testnet

1. **Tendermint RPC**
 - https://cronos-testnet.crypto.org/ 
 - http://cronos-testnet.crypto.org:26657/

2. **Cosmos RPC**
 - https://cronos-testnet.crypto.org:1317/

3. **gRPC Based**
 - https://cronos-testnet.crypto.org:9090/

4. **EVM HTTP JSON RPC** 
 - https://cronos-testnet.crypto.org:8545/

5. **EVM WS JSON RPC**
 - https://cronos-testnet.crypto.org:8546/


## API Clients and libraries

- [**TypeScript** library](https://github.com/crypto-org-chain/chain-jslib);
- [**Python** library](https://pypi.org/project/chainlibpy/#description);
- [**Rust** library](https://github.com/crypto-org-chain/chainlib-rs) (note that it is not feature complete);
- [@cosmjs/stargate](https://github.com/cosmos/cosmjs/tree/master/packages/stargate).


## Public Nodes for Mainnet and Croeseid Testnet 

### Mainnet - `crypto-org-chain-mainnet-1`

- [Tendermint](https://mainnet.crypto.org:26657/)
- [Cosmos RESTful gRPC](https://mainnet.crypto.org:1317/)

### Croeseid Testnet - `testnet-croeseid-4`

- [Tendermint](https://testnet-croeseid-4.crypto.org:26657/)
- [Cosmos RESTful gRPC](https://testnet-croeseid-4.crypto.org:1317/)


## Block Explorer 

### Cronos
[https://cronos-explorer.crypto.org/](https://cronos-explorer.crypto.org)

### Mainnet
[https://crypto.org/explorer](https://crypto.org/explorer)

### Croeseid Testnet
[https://crypto.org/explorer/croeseid4/](https://crypto.org/explorer/croeseid4)

## Community
[Discord](https://discord.gg/cGtxgVfGMZ)
