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

### Install `cronosd`

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

for using Pystarport only (Optional)
```bash
$ python3 -m pip install pystarport
```

## Step 1. Customize your devnet 

_Note_: You can skip this section and start a local devnet without customization.

### Option 1. Using Shell script
You can customize your devnet based on `cronos/init.sh`, for example:

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

### Option 2. Using `pystarport`
[Pystarport](https://github.com/crypto-com/pystarport) is like a cosmos starport without the scaffolding feature. it's mainly used for development and testing. It's developed for the Crypto.org Chain, but it can also be used for any cosmos-sdk based projects.

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

## Step 2. Start the devnet

Once we finish with the configuration, we are ready to start the chain: in the repository root directory, run

### Option 1. Using Shell script
Start a devnet node
```sh
$ ./init.sh
```

### Option 2. Using `pystarport`

To start devnet node with `pystarport`, you can choose either one of the commands:

`pystarport serve` is replacing the existing data with the new one (e.g. tx history, account balance, node config).

```bash
$ pystarport serve --config ./scripts/cronos-devnet.yaml
```
or `pystarport start` is preserving and starting with the existing data

```bash
$ pystarport start --config ./scripts/cronos-devnet.yaml
```

Get node status (Optional)
```bash
$ pystarport supervisorctl status
```

Stop all nodes (Optional)
```bash
$ pystarport supervisorctl stop all
```

Blocks are now being generated! You can verify and visit the rpc port [http://localhost:26657/](http://localhost:26657/) to view the blockchain data.

## Step 3. Interact with the chain

After the chain has been started, we may open up another terminal and start interacting with the chain by `cronosd`.

### Keys management

A key will be generated according to the configuration specified in `init.sh`. By default, the key will be stored in the `--keyring-backend test` and the name of the key will be `mykey` . In another terminal window or tab,

```
$ cronosd keys list
```

You will be able to list the address with allocated initial funds, for example:

```json
[
  {
    "name": "mykey",
    "type": "local",
    "address": "tcrc1cfmydxvlz0a3yeeh4an5ay94lyfv0flw5svzez",
    "pubkey": "{\"@type\":\"/ethermint.crypto.v1alpha1.ethsecp256k1.PubKey\",\"key\":\"AssVo7smZ323alb4hq2SIJ/TZw2rJeslZlZK7EGqyC8H\"}"
  }
]
```

or get the info for recovery from accounts.json file
```
/cronos/data/cronos_777-1/accounts.json
```

You will also be able to restore the key by using the mnemonic. The keys are stored in the operating system by default, we use `--keyring-backend` test for simplicity.

```
$ cronosd keys add mykey --recover --keyring-backend test
```

```bash
Enter your bip39 mnemonic
sense slim three rally device lazy slice thumb bridge general essence seven diamond broom scan tell cactus into exotic paddle ignore tape unaware also
- name: mykey
  type: local
  address: tcrc1a303tt49l5uhe87yaneyggly83g7e4uncdxqtl
  pubkey: '{"@type":"/ethermint.crypto.v1alpha1.ethsecp256k1.PubKey","key":"A9J4ELPAqyyrmypT9CtOVyWrO66eEXum3d8Z2mV7MS6O"}'
  mnemonic: ""
```


### Check account balance

You can check the account balance by

```
cronosd q bank balances tcrc14r2pnjm3v8sng8f9y9can4luykrltz36y6vcsp -o json | jq
```

For example:

```bash
{
  "balances": [
    {
      "denom": "aphoton",
      "amount": "99999000000000000000000000"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}
```

We can see that there is `99999000000000000000000000` aphoton in this address.

### Transfer token to another address

- We are now ready to transfer token between different addresses; we can create another address with the key name `Bob`:

  ```
  $ cronosd keys add Bob --keyring-backend test
  ```

  which gives, for example:

  ```
  - name: Bob
  type: local
  address: tcrcxwxk09wds0u2k6l39sp0e8ajx3jkw6dm0z5c26
  pubkey: tcrcpub17weu6qepqwaqek0we9a6ujsnmc3ke3xwkpl68qylcfkazv5tm04y80x004gy2uy3g8p
  mnemonic: ""
  threshold: 0
  pubkeys: []
  **Important** write this mnemonic phrase in a safe place.
  It is the only way to recover your account if you ever forget your password.
  refuse tray sauce area battle decide slot tilt position refuse blouse sauce mimic panic combine know stem section sustain reveal clever final assume flash
  ```

- Now we can transfer tokens to `Bob`, for example you can send `1aphoton` to Bob's address by

  ```
  $ cronosd tx bank send mykey tcrc1xwxk09wds0u2k6l39sp0e8ajx3jkw6dm0z5c26 1aphoton --keyring-backend test
  ```

- Check the transaction detail by hash
  ```
  $ cronosd query tx --type=hash 41D23A35EAB0BE5879D25E761F906B2FAD7349F34BFFC96E9D1DE8EEE6B82D9F
  ```


- Lastly, check balance of Bob's address:
  ```
  $ cronosd query bank balances tcrc1xwxk09wds0u2k6l39sp0e8ajx3jkw6dm0z5c26
  ```
  and we can see that 1 `aphoton` has already been transferred:
  ```
  balances:
  - amount: "1"
  denom: aphoton
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