# Cronos Integration documentation

## Useful Links

- [Cronos website](https://cronos.org/)
- [GitHub Repository](https://github.com/crypto-org-chain/cronos)
- [Official Documentation](https://cronos.org/docs/)
- [Cronos Binaries](https://github.com/crypto-org-chain/cronos/releases)

## Integration guide for **Cronos Mainnet Beta**

### Setup Guide

- [Joining the Cronos Mainnet](https://cronos.org/docs/getting-started/cronos-mainnet.html)
- [Deploying Smart Contract](https://cronos.org/docs/getting-started/cronos-smart-contract.html)
- [Seeds for Fullnode](https://github.com/crypto-org-chain/cronos-mainnet#seed-nodes)
- [Genesis files](https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet_25-1/genesis.json)
- [JSON-RPC Swagger Playground](https://cronos.org/docs/swagger?network=mainnet)
- [Using MetaMask](https://cronos.org/docs/getting-started/metamask.html)

### RPC URLs for Cronos mainnet Beta

:::danger Public RPCs URL Updates:
The Cronos RPC endpoints have been lately updated (shown as below) and it is recommended for users to update the endpoints. The old endpoints are still available for compatibility but maybe deprecated later.
:::

:::tip Request Limits on Public RPCs:
To provide a stable experience to users, there is a request rate limit on the public RPCs to ensure fair usage. If your application requires a higher usage, please consider setting up your own nodes. You can also reach out to us on [Discord](https://discord.gg/cGtxgVfGMZ) for assistance.
:::

:::tip Public RPCs Integration Tips:
There are more than one machines serving the public RPC services. There is no guarantee that you are served by the same machine every time. This could break the assumptions of some applications. For example when you want to broadcast multiple transactions in sequential account nonce at once, each transactions may arrive on different machines if you are not broadcasting them in a batch.

If this assumption is important in your application, please consider setting up your own nodes.
:::

1. **Tendermint RPC**

   - [https://rpc.cronos.org/](https://rpc.cronos.org/)

2. **Cosmos RESTful**

   - [https://rest.cronos.org/](https://rest.cronos.org/)

3. **Cosmos gRPC Based**

   - [https://grpc.cronos.org/](http://grpc.cronos.org/)

4. **EVM HTTP JSON RPC (Web3 compatible)**
   - [https://evm.cronos.org/](https://evm.cronos.org/)

### Official token contract addresses for Cronos mainnet Beta

| Token name | Address                                                                                                                               | Decimal |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| WCRO       | [0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23](https://cronoscan.com/tokens/0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23/token-transfers) | 18      |
| WETH       | [0xe44Fd7fCb2b1581822D0c862B68222998a0c299a](https://cronoscan.com/tokens/0xe44Fd7fCb2b1581822D0c862B68222998a0c299a/token-transfers) | 18      |
| WBTC       | [0x062E66477Faf219F25D27dCED647BF57C3107d52](https://cronoscan.com/tokens/0x062E66477Faf219F25D27dCED647BF57C3107d52/token-transfers) | 8       |
| USDC       | [0xc21223249CA28397B4B6541dfFaEcC539BfF0c59](https://cronoscan.com/tokens/0xc21223249CA28397B4B6541dfFaEcC539BfF0c59/token-transfers) | 6       |
| USDT       | [0x66e428c3f67a68878562e79A0234c1F83c208770](https://cronoscan.com/tokens/0x66e428c3f67a68878562e79A0234c1F83c208770/token-transfers) | 6       |
| DAI        | [0xF2001B145b43032AAF5Ee2884e456CCd805F677D](https://cronoscan.com/tokens/0xF2001B145b43032AAF5Ee2884e456CCd805F677D/token-transfers) | 18      |
| SHIB       | [0xbED48612BC69fA1CaB67052b42a95FB30C1bcFee](https://cronoscan.com/tokens/0xbED48612BC69fA1CaB67052b42a95FB30C1bcFee/token-transfers) | 18      |
| DOGE       | [0x1a8E39ae59e5556B56b76fCBA98d22c9ae557396](https://cronoscan.com/tokens/0x1a8E39ae59e5556B56b76fCBA98d22c9ae557396/token-transfers) | 8       |
| ATOM       | [0xB888d8Dd1733d72681b30c00ee76BDE93ae7aa93](https://cronoscan.com/address/0xB888d8Dd1733d72681b30c00ee76BDE93ae7aa93/transactions)   | 6       |
| LINK       | [0xBc6f24649CCd67eC42342AccdCECCB2eFA27c9d9](https://cronoscan.com/address/0xBc6f24649CCd67eC42342AccdCECCB2eFA27c9d9/transactions)   | 18      |
| ENJ        | [0x0A92ea8a197919aCb9BC26660Ed0D43D01ed26b7](https://cronoscan.com/address/0x0A92ea8a197919aCb9BC26660Ed0D43D01ed26b7/transactions)   | 18      |
| ELON       | [0x02DCcaf514C98451320a9365C5b46C61d3246ff3](https://cronoscan.com/address/0x02DCcaf514C98451320a9365C5b46C61d3246ff3/transactions)   | 18      |
| TUSD       | [0x87EFB3ec1576Dec8ED47e58B832bEdCd86eE186e](https://cronoscan.com/address/0x87EFB3ec1576Dec8ED47e58B832bEdCd86eE186e/transactions)   | 18      |
| LUNA       | [0x9278C8693e7328bef49804BacbFb63253565dffD](https://cronoscan.com/address/0x9278C8693e7328bef49804BacbFb63253565dffD/transactions)   | 6       |
| DOT        | [0x994047FE66406CbD646cd85B990E11D7F5dB8fC7](https://cronoscan.com/address/0x994047FE66406CbD646cd85B990E11D7F5dB8fC7/transactions)   | 10      |
| ADA        | [0x0e517979C2c1c1522ddB0c73905e0D39b3F990c0](https://cronoscan.com/address/0x0e517979C2c1c1522ddB0c73905e0D39b3F990c0/transactions)   | 6       |
| RADAR      | [0xa58e3AeAeA3292c3E260378e55E9684C59E7A27a](https://cronoscan.com/address/0xa58e3AeAeA3292c3E260378e55E9684C59E7A27a/transactions)   | 18      |
| DERC       | [0x98616a1427a1734DaEbA1E1894db48051244A065](https://cronoscan.com/address/0x98616a1427a1734DaEbA1E1894db48051244A065/transactions)   | 18      |
| PENDLE     | [0x49c3bBB239f4FB44327073510f4bA72D207a81D6](https://cronoscan.com/address/0x49c3bBB239f4FB44327073510f4bA72D207a81D6/transactions)   | 18      |
| TUSD       | [0x87EFB3ec1576Dec8ED47e58B832bEdCd86eE186e](https://cronoscan.com/address/0x87EFB3ec1576Dec8ED47e58B832bEdCd86eE186e/transactions)   | 18      |
| XLM        | [0x747d6C858168B8cD6e537160320b5dE58FD3367C](https://cronoscan.com/address/0x747d6C858168B8cD6e537160320b5dE58FD3367C/transactions)   | 7       |
| EOS        | [0xA37caA841072a305a0799718aFA16cd504C52118](https://cronoscan.com/address/0xA37caA841072a305a0799718aFA16cd504C52118/transactions)   | 4       |
| QRDO       | [0x70BB395F1A824D9a3F9D510C25e699cEaf603dEc](https://cronoscan.com/address/0x70BB395F1A824D9a3F9D510C25e699cEaf603dEc/transactions)   | 8       |
| ALI        | [0x45C135C1CDCE8d25A3B729A28659561385C52671](https://cronoscan.com/address/0x45C135C1CDCE8d25A3B729A28659561385C52671/transactions)   | 18      |
| APE        | [0x9C62F89a8C9907582f21205Ce90443730361EA05](https://cronoscan.com/address/0x9C62F89a8C9907582f21205Ce90443730361EA05/transactions)   | 18      |
| MATIC      | [0xf78a326ACd53651F8dF5D8b137295e434B7c8ba5](https://cronoscan.com/address/0xf78a326ACd53651F8dF5D8b137295e434B7c8ba5/transactions)   | 18      |
| FTM        | [0x63888BaFc5975630E4E5CF50c3845a3250115F64](https://cronoscan.com/address/0x63888BaFc5975630E4E5CF50c3845a3250115F64/transactions)   | 18      |
| AKT        | [0x39a65A74Dc5A778Ff93d1765Ea51F57BC49c81B3](https://cronoscan.com/address/0x39a65A74Dc5A778Ff93d1765Ea51F57BC49c81B3/transactions)   | 6       |
| CRV        | [0xfEf44a0C77eca218F443382d3128a7A251a8C542](https://cronoscan.com/address/0xfEf44a0C77eca218F443382d3128a7A251a8C542/transactions)   | 18      |
| ALICE      | [0x46EfE38eC0558C48352e2eBc85AF3bd2E87Fb2A1](https://cronoscan.com/address/0x46EfE38eC0558C48352e2eBc85AF3bd2E87Fb2A1/transactions)   | 6       |
| SLP        | [0xc00DcfBc7aC19B7210fa9c73b5F1d2E0f7E62711](https://cronoscan.com/address/0xc00DcfBc7aC19B7210fa9c73b5F1d2E0f7E62711/transactions)   | 0       |
| AXS        | [0xE27753e456AbA584f10aCEf0B4e367EF38f01e14](https://cronoscan.com/address/0xE27753e456AbA584f10aCEf0B4e367EF38f01e14/transactions)   | 18      |
| GALA       | [0x7A887D4f8a3221e1aaFA2f4435b774D51429A3e1](https://cronoscan.com/address/0x7A887D4f8a3221e1aaFA2f4435b774D51429A3e1/transactions)   | 8       |
| LTC        | [0x9d97Be214b68C7051215BB61059B4e299Cd792c3](https://cronoscan.com/address/0x9d97Be214b68C7051215BB61059B4e299Cd792c3/transactions)   | 8       |
| ICP        | [0x8Bf3E654075E269c1C415e4889C12D9837452be0](https://cronoscan.com/address/0x8Bf3E654075E269c1C415e4889C12D9837452be0/transactions)   | 8       |
| SAND       | [0x9097eA65B55dfC7383A7EFB465e8fFC18D46e784](https://cronoscan.com/address/0x9097eA65B55dfC7383A7EFB465e8fFC18D46e784/transactions)   | 18      |
| BCH        | [0x7589B70aBb83427bb7049e08ee9fC6479ccB7a23](https://cronoscan.com/address/0x7589B70aBb83427bb7049e08ee9fC6479ccB7a23/transactions)   | 8       |
| ALGO       | [0x2fEfe47989214c2e74A6319076c138d395681407](https://cronoscan.com/address/0x2fEfe47989214c2e74A6319076c138d395681407/transactions)   | 6       |
| MANA       | [0x6Ed8c99E5c6B2c551e012E4272d8f3d1DF23a71A](https://cronoscan.com/address/0x6Ed8c99E5c6B2c551e012E4272d8f3d1DF23a71A/transactions)   | 18      |
| UNI        | [0x16aD43896f7C47a5d9Ee546c44A22205738B329c](https://cronoscan.com/address/0x16aD43896f7C47a5d9Ee546c44A22205738B329c/transactions)   | 18      |
| SOL        | [0xc9DE0F3e08162312528FF72559db82590b481800](https://cronoscan.com/address/0xc9DE0F3e08162312528FF72559db82590b481800/transactions)   | 9       |
| AVAX       | [0x8d58088D4E8Ffe75A8b6357ba5ff17B93B912640](https://cronoscan.com/address/0x8d58088D4E8Ffe75A8b6357ba5ff17B93B912640/transactions)   | 9       |
| ZIL        | [0xc70ed252E55d68A7020A754Fb92Fa5c68e3c199f](https://cronoscan.com/address/0xc70ed252E55d68A7020A754Fb92Fa5c68e3c199f/transactions)   | 12      |
| FLOW       | [0x22EF9d73EA90E774CfB21fADDF84b37BD54FE7a6](https://cronoscan.com/address/0x22EF9d73EA90E774CfB21fADDF84b37BD54FE7a6/transactions)   | 8       |
| IMX        | [0x8f27dB0E597B67F33d5Fb58D5EEcD6A3CC780942](https://cronoscan.com/address/0x8f27dB0E597B67F33d5Fb58D5EEcD6A3CC780942/transactions)   | 18      |
| OMG        | [0x5a56509C61ad80680caF5b3B980E6C88319eeE33](https://cronoscan.com/address/0x5a56509C61ad80680caF5b3B980E6C88319eeE33/transactions)   | 18      |
| AAVE       | [0xE657b115bc45c0786274c824f83e3e02CE809185](https://cronoscan.com/address/0xE657b115bc45c0786274c824f83e3e02CE809185/transactions)   | 18      |
| LRC        | [0xAF760dE3201fEeD80FEeA59FB16A8360C8c4d1a2](https://cronoscan.com/address/0xAF760dE3201fEeD80FEeA59FB16A8360C8c4d1a2/transactions)   | 18      |
| DAR        | [0x5893915Fe3d15e4004F7232c80036bFa92aCa564](https://cronoscan.com/address/0x5893915Fe3d15e4004F7232c80036bFa92aCa564/transactions)   | 6       |
| GRT        | [0x4c523222Cd0DE11616F7aD685f24145B9FaF7996](https://cronoscan.com/address/0x4c523222Cd0DE11616F7aD685f24145B9FaF7996/transactions)   | 18      |
| CHZ        | [0x4E4F362170bFb88D3c9378FF7818d93fC2fbd257](https://cronoscan.com/address/0x4E4F362170bFb88D3c9378FF7818d93fC2fbd257/transactions)   | 18      |
| INJ        | [0x4E05F3C7ee6155e3add224470E1c4583D4F424A3](https://cronoscan.com/address/0x4E05F3C7ee6155e3add224470E1c4583D4F424A3/transactions)   | 18      |
| KNC        | [0xd73EBf885C4157D3E88c6D87ad3b8018B4a32fEF](https://cronoscan.com/address/0xd73EBf885C4157D3E88c6D87ad3b8018B4a32fEF/transactions)   | 18      |
| XTZ        | [0x9D5a7d02D51Dc523197e62c2865907dbB53642Af](https://cronoscan.com/address/0x9D5a7d02D51Dc523197e62c2865907dbB53642Af/transactions)   | 6       |
| RUNE       | [0x171C8AAA57D0107d0187f54Ccf4CC03406E76a4E](https://cronoscan.com/address/0x171C8AAA57D0107d0187f54Ccf4CC03406E76a4E/transactions)   | 8       |
| KSM        | [0x0BD48A8A9565385649D9d7f1c945D1d0C4543E26](https://cronoscan.com/address/0x0BD48A8A9565385649D9d7f1c945D1d0C4543E26/transactions)   | 12      |
| HNT        | [0x61426C150207AbF8a215f3377a0819dDcA842aF3](https://cronoscan.com/address/0x61426C150207AbF8a215f3377a0819dDcA842aF3/transactions)   | 8       |
| NEO        | [0xB3fc0777738168ce33B228F1831EEbD5A81aaDB3](https://cronoscan.com/address/0xB3fc0777738168ce33B228F1831EEbD5A81aaDB3/transactions)   | 0       |
| YFI        | [0x7bDF81a86f4AA8B442Ca05670Cbf296BB22Bc7bB](https://cronoscan.com/address/0x7bDF81a86f4AA8B442Ca05670Cbf296BB22Bc7bB/transactions)   | 18      |
| SUSHI      | [0xdb3de0AAC8A39490932FA19c2e32F179368Ab840](https://cronoscan.com/address/0xdb3de0AAC8A39490932FA19c2e32F179368Ab840/transactions)   | 18      |
| QNT        | [0x7d54F4E05f273a9317f723997612Ed64eF53C900](https://cronoscan.com/address/0x7d54F4E05f273a9317f723997612Ed64eF53C900/transactions)   | 18      |
| MKR        | [0xab9Cf8C5A9B6Cf5215c82D088D37d04bB146704A](https://cronoscan.com/address/0xab9Cf8C5A9B6Cf5215c82D088D37d04bB146704A/transactions)   | 18      |
| HOT        | [0xc4010CfB5172D82A348bcBC8cD543733c1e9BF89](https://cronoscan.com/address/0xc4010CfB5172D82A348bcBC8cD543733c1e9BF89/transactions)   | 18      |
| QTUM       | [0x32529346958711B3beF92B96507C14821e50C9c8](https://cronoscan.com/address/0x32529346958711B3beF92B96507C14821e50C9c8/transactions)   | 8       |
| CELR       | [0xfA0235feF8644C107f7e531Fa9CFe0613Fbe8909](https://cronoscan.com/address/0xfA0235feF8644C107f7e531Fa9CFe0613Fbe8909/transactions)   | 18      |
| REN        | [0x2b4eE166a125E01Aba019885932C944cEfED2932](https://cronoscan.com/address/0x2b4eE166a125E01Aba019885932C944cEfED2932/transactions)   | 18      |
| BAT        | [0x2F712E0a6f92e3f865EaEb86f07BAFc67974d26c](https://cronoscan.com/address/0x2F712E0a6f92e3f865EaEb86f07BAFc67974d26c/transactions)   | 18      |
| SRM        | [0xB858e614779f148992949A3b15E6127dDA204ca4](https://cronoscan.com/address/0xB858e614779f148992949A3b15E6127dDA204ca4/transactions)   | 6       |
| DYDX       | [0x4442C740cc5B47F032983106E66E3C9dC945676C](https://cronoscan.com/address/0x4442C740cc5B47F032983106E66E3C9dC945676C/transactions)   | 18      |

## Integration guide for **Cronos Testnet**

### Setup Guide

- [Joining the Cronos Testnet](https://cronos.org/docs/getting-started/cronos-testnet.html)
- [Testnet Faucet](https://cronos.org/faucet/)
  - Note that the faucet only takes eth-type `0x...` addr
- [Seeds for fullnode](https://github.com/crypto-org-chain/cronos-testnets/blob/main/testnet.json#L21)
- [Genesis files](https://raw.githubusercontent.com/crypto-org-chain/cronos-testnets/main/cronostestnet_338-1/genesis.json)
- [JSON-RPC Swagger Playground](https://cronos.org/docs/swagger)
- Using Metamask for testnet
  - Network Name: **Cronos Testnet**
  - New RPC URL: **https://evm-t3.cronos.org/**
  - Chain ID: **338**
  - Currency Symbol: **TCRO**
  - Block Explorer URL: **https://testnet.cronoscan.com/**

### RPC URLs for For Cronos testnet

:::tip
The Cronos Testnet RPC endpoints have been lately updated shown as below and it is recommanded for users to update the endpoints, while the old endpoints will still be compatible.
:::

1. **Cosmos RPC**

   - https://rpc-t3.cronos.org/

2. **gRPC Based**

   - https://grpc-t3.cronos.org/

3. **Cosmos RESTful**

   - https://rest-t3.cronos.org/

4. **EVM HTTP JSON RPC**

   - https://evm-t3.cronos.org/

### Mock token contract addresses for Cronos testnet

| Token name | address                                      | decimal |
| ---------- | -------------------------------------------- | ------- |
| WCRO       | `0x6a3173618859C7cd40fAF6921b5E9eB6A76f1fD4` | 18      |
| WETH       | `0x796135E94527c38433e9c42f4Cd91ca931E5e6A6` | 18      |
| WBTC       | `0xEE200f25d7B1B9518AC944fd60b113d39bee209c` | 8       |
| USDC       | `0x25f0965F285F03d6F6B3B21c8EC3367412Fd0ef6` | 6       |
| USDT       | `0xa144617Afd9205AF1ceDE3Cc671da1a409A82c5a` | 6       |
| DAI        | `0x8662A8111daEC7570a1bDF3dbd3E163d41563904` | 18      |

## API Clients and libraries

- [**TypeScript** library](https://github.com/crypto-org-chain/chain-jslib);
- [**Python** library](https://pypi.org/project/chainlibpy/#description);
- [**Rust** library](https://github.com/crypto-org-chain/chainlib-rs) (note that it is not feature complete);
- [@cosmjs/stargate](https://github.com/cosmos/cosmjs/tree/master/packages/stargate).

# Ethereum type JSON-RPC Methods

### Pre-requisite Readings

- [Ethereum JSON-RPC](https://eth.wiki/json-rpc/API) {prereq}
- [Geth JSON-RPC APIs](https://geth.ethereum.org/docs/rpc/server) {prereq}

Below is a list of Ethereum type JSON-RPC Methods where users can curl via local node. While you can also surf to our swagger playground for a better understanding.

- [Mainnet swagger playground](https://cronos.org/docs/swagger?network=mainnet)
- [Testnet swagger playground](https://cronos.org/docs/swagger)

### JSON-RPC Methods

| Method                                                                            | Namespace | Implemented | Public |
| --------------------------------------------------------------------------------- | --------- | ----------- | ------ |
| [`web3_clientVersion`](#web3-clientversion)                                       | Web3      | ✔           | ✔      |
| [`web3_sha3`](#web3-sha3)                                                         | Web3      | ✔           | ✔      |
| [`net_version`](#net-version)                                                     | Net       | ✔           | ✔      |
| [`net_peerCount`](#net-peerCount)                                                 | Net       | ✔           | ✔      |
| [`net_listening`](#net-listening)                                                 | Net       | ✔           | ✔      |
| [`eth_protocolVersion`](#eth-protocolversion)                                     | Eth       | ✔           | ✔      |
| [`eth_syncing`](#eth-syncing)                                                     | Eth       | ✔           | ✔      |
| [`eth_gasPrice`](#eth-gasprice)                                                   | Eth       | ✔           | ✔      |
| [`eth_accounts`](#eth-accounts)                                                   | Eth       | ✔           | ✔      |
| [`eth_blockNumber`](#eth-blocknumber)                                             | Eth       | ✔           | ✔      |
| [`eth_getBalance`](#eth-getbalance)                                               | Eth       | ✔           | ✔      |
| [`eth_getStorageAt`](#eth-getstorageat)                                           | Eth       | ✔           | ✔      |
| [`eth_getTransactionCount`](#eth-gettransactioncount)                             | Eth       | ✔           | ✔      |
| [`eth_getBlockTransactionCountByNumber`](#eth-getblocktransactioncountbynumber)   | Eth       | ✔           | ✔      |
| [`eth_getBlockTransactionCountByHash`](#eth-getblocktransactioncountbyhash)       | Eth       | ✔           | ✔      |
| [`eth_getCode`](#eth-getcode)                                                     | Eth       | ✔           | ✔      |
| [`eth_sign`](#eth-sign)                                                           | Eth       | ✔           | ✔      |
| [`eth_sendTransaction`](#eth-sendtransaction)                                     | Eth       | ✔           | ✔      |
| [`eth_sendRawTransaction`](#eth-sendrawtransaction)                               | Eth       | ✔           | ✔      |
| [`eth_call`](#eth-call)                                                           | Eth       | ✔           | ✔      |
| [`eth_estimateGas`](#eth-estimategas)                                             | Eth       | ✔           | ✔      |
| [`eth_getBlockByNumber`](#eth-getblockbynumber)                                   | Eth       | ✔           | ✔      |
| [`eth_getBlockByHash`](#eth-getblockbyhash)                                       | Eth       | ✔           | ✔      |
| [`eth_getTransactionByHash`](#eth-gettransactionbyhash)                           | Eth       | ✔           | ✔      |
| [`eth_getTransactionByBlockHashAndIndex`](#eth-gettransactionbyblockhashandindex) | Eth       | ✔           | ✔      |
| [`eth_getTransactionReceipt`](#eth-gettransactionreceipt)                         | Eth       | ✔           | ✔      |
| [`eth_newFilter`](#eth-newfilter)                                                 | Eth       | ✔           | ✔      |
| [`eth_newBlockFilter`](#eth-newblockfilter)                                       | Eth       | ✔           | ✔      |
| [`eth_newPendingTransactionFilter`](#eth-newpendingtransactionfilter)             | Eth       | ✔           | ✔      |
| [`eth_uninstallFilter`](#eth-uninstallfilter)                                     | Eth       | ✔           | ✔      |
| [`eth_getFilterChanges`](#eth-getfilterchanges)                                   | Eth       | ✔           | ✔      |
| [`eth_getFilterLogs`](#eth-getfilterlogs)                                         | Eth       | ✔           | ✔      |
| [`eth_getLogs`](#eth-getlogs)                                                     | Eth       | ✔           | ✔      |
| `eth_getTransactionbyBlockNumberAndIndex`                                         | Eth       |             | ✔      |
| `eth_submitHashrate`                                                              | Eth       |             |        |
| `eth_getCompilers`                                                                | Eth       |             |        |
| `eth_compileLLL`                                                                  | Eth       |             |        |
| `eth_compileSolidity`                                                             | Eth       |             |        |
| `eth_compileSerpent`                                                              | Eth       |             |        |
| `eth_signTransaction`                                                             | Eth       |             |        |
| [`eth_coinbase`](#eth-coinbase)                                                   | Eth       | ✔           |        |
| [`eth_getProof`](#eth-getProof)                                                   | Eth       | ✔           |        |
| [`eth_subscribe`](#eth-subscribe)                                                 | Websocket | ✔           |        |
| [`eth_unsubscribe`](#eth-unsubscribe)                                             | Websocket | ✔           |        |

:::tip
Block Number can be entered as a Hex string, `"earliest"`, `"latest"` or `"pending"`.
:::
:::tip
While the examples below make use of local node http://localhost:8545, users may also use our public full node:
https://evm-t3.cronos.org:8545/
:::

## JSON-RPC namespaces

### Pre-requisite Readings

- [Geth JSON-RPC Namespaces](https://geth.ethereum.org/docs/rpc/server) {prereq}

### Ethereum Namespaces

| Namespace                                     | Description                                                                                                                                                                                                                  | Supported | Enabled by Default |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------ |
| [`eth`](./endpoints.md#eth-methods)           | Cronos provides several extensions to the standard `eth` JSON-RPC namespace.                                                                                                                                                 | ✔         | ✔                  |
| [`web3`](./endpoints.md#web3-methods)         | The `web3` API provides utility functions for the web3 client.                                                                                                                                                               | ✔         | ✔                  |
| [`net`](./endpoints.md#net-methods)           | The `net` API provides access to network information of the node                                                                                                                                                             | ✔         | ✔                  |
| `clique`                                      | The `clique` API provides access to the state of the clique consensus engine. You can use this API to manage signer votes and to check the health of a private network.                                                      | ❌        |                    |
| `debug`                                       | The `debug` API gives you access to several non-standard RPC methods, which will allow you to inspect, debug and set certain debugging flags during runtime.                                                                 | ✔         |                    |
| `les`                                         | The `les` API allows you to manage LES server settings, including client parameters and payment settings for prioritized clients. It also provides functions to query checkpoint information in both server and client mode. | ❌        |                    |
| [`miner`](./endpoints.md#miner-methods)       | The `miner` API allows you to remote control the node’s mining operation and set various mining specific settings.                                                                                                           | ✔         | ❌                 |
| [`txpool`](./endpoints.md#txpool-methods)     | The `txpool` API gives you access to several non-standard RPC methods to inspect the contents of the transaction pool containing all the currently pending transactions as well as the ones queued for future processing.    | ✔         | ❌                 |
| `admin`                                       | The `admin` API gives you access to several non-standard RPC methods, which will allow you to have a fine grained control over your nodeinstance, including but not limited to network peer and RPC endpoint management.     | ❌        |                    |
| [`personal`](./endpoints.md#personal-methods) | The `personal` API manages private keys in the key store.                                                                                                                                                                    | ✔         | ❌                 |

## Block Explorer

- Cronos Mainnet Beta:
  [https://cronoscan.com/](https://cronoscan.com)
- Cronos Testnet:
  [https://testnet.cronoscan.com/](https://testnet.cronoscan.com/)

## Community

[Discord](https://discord.gg/cGtxgVfGMZ)
