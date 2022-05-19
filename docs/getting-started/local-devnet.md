---
meta:
  - name: "title"
    content: Cronos | Crypto.org EVM Chain | Local Network Deployment
  - name: "description"
    content: Learn how to compile and run the latest development version of Cronos testnet from scratch. This page is for building and running the latest development version of the chain for testing purpose only.
  - name: "og:title"
    content: Cronos | Crypto.org EVM Chain | Local Network Deployment
  - name: "og:type"
    content: Website
  - name: "og:description"
    content: Learn how to compile and run the latest development version of Cronos testnet from scratch. This page is for building and running the latest development version of the chain for testing purpose only.
  - name: "og:image"
    content: https://cronos.org/og-image.png
  - name: "twitter:title"
    content: Cronos | Crypto.org EVM Chain | Local Network Deployment
  - name: "twitter:site"
    content: "@cryptocom"
  - name: "twitter:card"
    content: summary_large_image
  - name: "twitter:description"
    content: Learn how to compile and run the latest development version of Cronos testnet from scratch. This page is for building and running the latest development version of the chain for testing purpose only.
  - name: "twitter:image"
    content: https://cronos.org/og-image.png
canonicalUrl: https://cronos.org/docs/getting-started/local-devnet.html
---

# Devnet: Running Latest Development Node

::: warning CAUTION
this page is for building and running the latest development version of the chain for testing purpose only. Please note that is under active development and is highly unstable and subject to breaking changes. You should expect a moderate amount of troubleshooting work is required.

For anyone interested in joining the Cronos testnet,
please refer to our public testnet documentation which will be released shortly.
:::

By following this tutorial, you can compile and run the latest development version of Cronos testnet from scratch. It is intended for testing purpose only.


## Overview

The first option is to use [pystarport](https://github.com/crypto-org-chain/chain-main/tree/master/pystarport), a dedicated script similar to [cosmos starport](https://github.com/tendermint/starport), but without the scaffolding feature to build a local development network with multiple validators. Another option is to use a shell script `init.sh` to build a local development network with a single validator.


## Pre-requisites

### Option 1. Using `pystarport`

- Python > 3.7.3
- [cronosd](https://github.com/crypto-org-chain/cronos)

To install pystarport, run:

```
$ git clone https://github.com/crypto-org-chain/cronos.git
$ cd cronos
$ pip3 install pystarport
```

### Option 2. Using Shell script

Install the binded version, which install cronosd together, and find it by the absolute path:

```
git clone https://github.com/crypto-org-chain/cronos
cd cronos
make install
```

Afterward, you can verify that by

```bash
$ cronosd -h
```

and also you can check the version of the cronosd to see if it is built with the later commit:

```bash
$ cronosd version
[version-g<commit_hash>]
```




## Step 1. Customize your devnet 

_Note_: You can skip this section and start a local devnet without customization.


### Option 1. Using `pystarport`

You can customize your devnet based on `cronos/scripts/cronos-devnet.yaml`, for example:

```yaml
  cronos_777-1:                   # change the chain-id
      json-rpc:
      address: "0.0.0.0:8545"     # change the JSON-RPC address and port
      ws-address: "0.0.0.0:8546"  # change the JSON-RPC websocket address and port
      api: "eth,net,web3,debug"
.......
  accounts:
    - name: community
      coins: 10000000000000000000000basetcro
      mnemonic: ${COMMUNITY_MNEMONIC}
    - name: signer1
      coins: 20000000000000000000000basetcro
      mnemonic: ${SIGNER1_MNEMONIC}
    - name: signer2
      coins: 30000000000000000000000basetcro
      mnemonic: ${SIGNER2_MNEMONIC}
```
The default configuration will give us two devnet validators with the chain-id `cronos_777-1`; three accounts `community`, `signer1` and `signer2` with some allocated funds at the genesis.

### Option 2. Using Shell script
You can copy the `init.sh` [here](https://raw.githubusercontent.com/crypto-org-chain/cronos-docs/master/docs/getting-started/assets/init_cronos_chain/init.sh) and customize your devnet based on `cronos/init.sh`, for example:

```yaml
### customize the name of your key, the chain-id and moniker of the node ###
  KEY="mykey"
  CHAINID="cronos_777-1"
  MONIKER="localtestnet"
.......
### specify the default keyring back-backend to be 'test' for convenience ###
  cronosd config keyring-backend test
  cronosd config chain-id $CHAINID
.......
# Allocate genesis accounts (cosmos formatted addresses)
  cronosd add-genesis-account $KEY 100000000000000000000000000aphoton --keyring-backend test
# Sign genesis transaction
  cronosd gentx $KEY 1000000000000000000000aphoton --keyring-backend test --chain-id $CHAINID
```

The default configuration will give us a single validator devnet with the chain-id `cronos_777-1`; one account under the name of `mykey` with some allocated funds at the genesis.


## Step 2. Start the devnet

Once we finish with the configuration, we are ready to start the chain: in the repository root directory, run

### Option 1. Using `pystarport`

```sh
$ pystarport serve --config ./scripts/cronos-devnet.yaml
```

Afterwards, keys will be generated according to the configuration specified, the accounts' information is generated in `data/cronos_777-1/accounts.json`, for example:

```json
[
  {"name": "validator", "type": "local", "address": "crc12luku6uxehhak02py4rcz65zu0swh7wjsrw0pp", "pubkey": "{\"@type\":\"/ethermint.crypto.v1.ethsecp256k1.PubKey\",\"key\":\"Am5xCmKjQt4O1NfEUy3Ly7r78ZZS7WeyN++rcOiyB++s\"}"}, 
  {"name": "validator", "type": "local", "address": "crc18z6q38mhvtsvyr5mak8fj8s8g4gw7kjjtsgrn7", "pubkey": "{\"@type\":\"/ethermint.crypto.v1.ethsecp256k1.PubKey\",\"key\":\"AkJ4WnUHRFLWKmrCInD/uPsByTddC6coh66ADcYZMV0b\"}"}, 
  {"name": "community", "type": "local", "address": "crc1czp5lh3ke85rruvg0vawec02perp2ul678x46r", "pubkey": "{\"@type\":\"/ethermint.crypto.v1.ethsecp256k1.PubKey\",\"key\":\"ApQozcgkbLxyWF5VYXBG7EY+R9p0IcyqngqaOz7FPJib\"}", "mnemonic": "figure outdoor option kitten force avocado hair rug shoulder win engage coconut record lounge insane royal crime powder dwarf monster car thing bench bamboo"}, 
  {"name": "signer1", "type": "local", "address": "crc1gt7cfua508jfexuf9ea4536sdqkv62dsxxalc2", "pubkey": "{\"@type\":\"/ethermint.crypto.v1.ethsecp256k1.PubKey\",\"key\":\"A/93qfsXgEexTmtrkcq+LtFfclUU3FjyJuOVeCR+qi/1\"}", "mnemonic": "pencil shrug wire extra bonus deny ride trap science clarify lonely profit rural quote hamster fuel pig speak total lumber bench canyon possible execute"}, 
  {"name": "signer2", "type": "local", "address": "crc1drs00mg2wfn26vtgsfqreq0m3jcfqf564gwkkk", "pubkey": "{\"@type\":\"/ethermint.crypto.v1.ethsecp256k1.PubKey\",\"key\":\"AkcixU8yAi547Oe9lUUMaQU4baQGCZU5ju2YeIZdaSOD\"}", "mnemonic": "cruel install century disease tired glass lesson mushroom donor usual uncover fly post stamp busy utility certain obscure whisper scene order want sentence reduce"}
]
```

Kindly save these mnemonics for key recovery later.

Blocks are now being generated! You can view the blockchain data by the rpc port of the `awesome0` (first node): [http://localhost:26657/](http://localhost:26657/).
Furthermore, you can also use the swagger doc of `awesome0` at [http://localhost:26654/swagger/](http://localhost:26654/swagger/).

It is worth mentioning that the `serve` command would truncate all the blocks previously generated and regenerate a new genesis block, which means you'll also lose all of your transaction records. If you wish to restart the chain with the existing blocks, please run `pystarport` with `start` command:

```bash
$ pystarport start --config ./scripts/cronos-devnet.yaml
```




## Step 3. Interact with the chain

After the chain has been started, we may open up another terminal and start interacting with the chain by `cronosd`.

### Keys management

#### Restore the key

For Pystarport:

As in the last section, pre-created Hierarchical Deterministic (HD) mnemonic with genesis funds inside are prepared for you in the Devnet. To gain access to the funds, kindly restore the key by using the mnemonic before moving on to the next step.

**Note**: The keys are stored in your operating system by default, we will use `--keyring-backend test` for simplicity. You may refer to a more detailed explanation [here](../wallets/cli.md#the-keyring-keyring-backend-option). 

- Firstly, restore the key name as `signer2`:


```sh
$ cronosd keys add signer2 --recover --keyring-backend test
```

Fill in your bip39 mnemonic, as can be found in `data/cronos_777-1/accounts.json`. Note that these addresses and mnemonic phrases are different for everyone.

```bash
Enter your bip39 mnemonic
cruel install century disease tired glass lesson mushroom donor usual uncover fly post stamp busy utility certain obscure whisper scene order want sentence reduce
- name: signer2
  type: local
  address: crc1drs00mg2wfn26vtgsfqreq0m3jcfqf564gwkkk
  pubkey: '{"@type":"/ethermint.crypto.v1alpha1.ethsecp256k1.PubKey","key":"A9J4ELPAqyyrmypT9CtOVyWrO66eEXum3d8Z2mV7MS6O"}'
  mnemonic: ""
```



### Check account balance

You can, for example, check the account balance by

```sh
cronosd q bank balances crc1drs00mg2wfn26vtgsfqreq0m3jcfqf564gwkkk -o json | jq
```

For example:

```json
{
  "balances": [
    {
      "denom": "basetcro",
      "amount": "30000000000000000000000"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}
```

We can see that there is `30000000000000000000000` basetcro in this address.

### Transfer token to another address

- We are now ready to transfer token between different addresses; we can create another address with the key name `Bob`:

  ```
  $ cronosd keys add Bob --keyring-backend test
  ```

  which gives, for example:

 ```bash
  - name: Bob
  type: local
  address: crc1vqgk86fzr64xsyeemlxnxxeawcw0zfcx3dwgjt
  pubkey: '{"@type":"/ethermint.crypto.v1.ethsecp256k1.PubKey","key":"AsR5N3GJpk6TiN4EDYv7SsW/eKPvaLBkiEh/FFwcNvUoG"}'
  mnemonic: ""
  threshold: 0
  pubkeys: []
  ```

- Now we can transfer tokens to `Bob`, for example you can send `1basetcro` to Bob's address by

```sh
  $ cronosd tx bank send signer1 crc1vqgk86fzr64xsyeemlxnxxeawcw0zfcx3dwgjt 1basetcro --keyring-backend test --chain-id cronos_777-1
  ```

- Lastly, check balance of Bob's address:
  ```sh
  $ cronosd query bank balances crc1vqgk86fzr64xsyeemlxnxxeawcw0zfcx3dwgjt
  ```
  and we can see that 1 `basetcro` has already been transferred:
  ```bash
  balances:
  - amount: "1"
  denom: basetcro
  pagination:
  next_key: null
  total: "0"
  ```

Congratulations! You've successfully transferred tokens to Bob.

#### Check the current validator set

Firstly, we can check the details of the current validator set by the query command of cronosd, for example:

```
$ cronosd query staking validators -o json | jq
```

will result in

```json
{
  "validators": [
    {
      "operator_address": "ethvaloper1a303tt49l5uhe87yaneyggly83g7e4unxlc59p",
      "consensus_pubkey": {
        "@type": "/cosmos.crypto.ed25519.PubKey",
        "key": "T3srVdJb8CXku5GobwHHt37t2iGQ+mRL/bEHK8Zlusw="
      },
      "jailed": false,
      "status": "BOND_STATUS_BONDED",
      "tokens": "1000000000000000000000",
      "delegator_shares": "1000000000000000000000.000000000000000000",
      "description": {
        "moniker": "localtestnet",
        "identity": "",
        "website": "",
        "security_contact": "",
        "details": ""
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2021-07-06T16:15:07.061973Z"
      },
      "min_self_delegation": "1"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}
```

then we can see that there are two active validator `localtestnet` at the moment.

For the validator, we can see that it comes with an address and a public key:

- `"operator_address"` - The operator address, which is used for identifying the operators of validators;
- `"consensus_pubkey"` - The consensus public key, which is used for identifying the validator nodes participating in consensus.