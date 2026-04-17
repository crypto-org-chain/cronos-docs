---
description: >-
  Set up a single-node Cronos Devnet on your local machine for testing and
  development purposes.
---

# Single-node Devnet

{% hint style="warning" %}
CAUTION&#x20;

This page is for building and running the latest development version of the chain for testing purpose only. Please note that is under active development and is highly unstable and subject to breaking changes. You should expect a moderate amount of troubleshooting work is required.
{% endhint %}

{% hint style="info" %}
This below was verified with [cronosd v1.7.1](https://github.com/crypto-org-chain/cronos/releases/tag/v1.7.1) on `macOS` (arm64) and `Linux` (arm64 or x86\_64).
{% endhint %}

### Prerequisites

* **macOS** or **Linux**
* **Jq** - JSON processor
* **Curl**

### Step 1: Download the Cronos Binary

Download the pre-built `cronosd` binary from the [official releases page](https://github.com/crypto-org-chain/cronos/releases/tag/v1.7.1).

<pre class="language-bash"><code class="lang-bash">mkdir -p ~/cronos-devnet &#x26;&#x26; cd ~/cronos-devnet

# macOS:
curl -sL -o cronos.tar.gz \
<strong>  "https://github.com/crypto-org-chain/cronos/releases/download/v1.7.1/cronos_1.7.1_Darwin_arm64.tar.gz"
</strong>
# OR linux(x86_64):
# curl -sL -o cronos.tar.gz \
#  "https://github.com/crypto-org-chain/cronos/releases/download/v1.7.1/cronos_1.7.1_Linux_x86_64.tar.gz"

# OR linux(arm64):
<strong># curl -sL -o cronos.tar.gz \
</strong>#  "https://github.com/crypto-org-chain/cronos/releases/download/v1.7.1/cronos_1.7.1_Linux_arm64.tar.gz"

tar xzf cronos.tar.gz
</code></pre>

Verify the installation:

<pre class="language-bash"><code class="lang-bash"><strong>./bin/cronosd version
</strong># Expected output: v1.7.1
</code></pre>

### Step 2: Initialize the Devnet

Customize and run the following script(referring to [start-local-node.sh](https://github.com/crypto-org-chain/cronos/blob/main/start-local-node.sh)) to set up a fresh single-validator devnet. Please note that this will **remove any existing `~/.cronos` data directory**.

```bash
#!/bin/bash
set -e

CRONOSD="$(pwd)/bin/cronosd"
CHAINID="cronos_9000-1"
MONIKER="localtestnet"

# --- Pre-funded accounts (mnemonics included for development use only) ---

# Validator account — address: 0x7cb61d4117ae31a12e393a1cfa3bac666481d02e
VAL_KEY="localkey"
VAL_MNEMONIC="gesture inject test cycle original hollow east ridge hen combine junk child bacon zero hope comfort vacuum milk pitch cage oppose unhappy lunar seat"

# User 1 — address: 0xc6fe5d33615a1c52c08018c47e8bc53646a0e101
USER1_KEY="user1"
USER1_MNEMONIC="copper push brief egg scan entry inform record adjust fossil boss egg comic alien upon aspect dry avoid interest fury window hint race symptom"

# User 2 — address: 0x963ebdf2e1f8db8707d05fc75bfeffba1b5bac17
USER2_KEY="user2"
USER2_MNEMONIC="maximum display century economy unlock van census kite error heart snow filter midnight usage egg venture cash kick motor survey drastic edge muffin visual"

# Clean up previous data
rm -rf ~/.cronos*

# Import keys
echo "$VAL_MNEMONIC"   | $CRONOSD keys add $VAL_KEY   --recover --keyring-backend test --algo "eth_secp256k1"
echo "$USER1_MNEMONIC" | $CRONOSD keys add $USER1_KEY  --recover --keyring-backend test --algo "eth_secp256k1"
echo "$USER2_MNEMONIC" | $CRONOSD keys add $USER2_KEY  --recover --keyring-backend test --algo "eth_secp256k1"

# Initialize the chain
$CRONOSD init $MONIKER --chain-id $CHAINID

# Configure genesis: set block gas limit + EVM denom
cat $HOME/.cronos/config/genesis.json \
  | jq '.consensus["params"]["block"]["max_gas"]="10000000" | .app_state.evm.params.evm_denom="basetcro" | .app_state.feemarket.params.base_fee="100000000000"' \
  > $HOME/.cronos/config/tmp_genesis.json \
  && mv $HOME/.cronos/config/tmp_genesis.json $HOME/.cronos/config/genesis.json

# Add genesis accounts (each gets 1000 basetcro + 1 stake)
$CRONOSD genesis add-genesis-account \
  "$($CRONOSD keys show $VAL_KEY -a --keyring-backend test)" \
  1000000000000000000000basetcro,1000000000000000000stake --keyring-backend test

$CRONOSD genesis add-genesis-account \
  "$($CRONOSD keys show $USER1_KEY -a --keyring-backend test)" \
  1000000000000000000000basetcro,1000000000000000000stake --keyring-backend test

$CRONOSD genesis add-genesis-account \
  "$($CRONOSD keys show $USER2_KEY -a --keyring-backend test)" \
  1000000000000000000000basetcro,1000000000000000000stake --keyring-backend test

# Create and collect genesis transaction
$CRONOSD genesis gentx $VAL_KEY 1000000000000000000stake \
  --chain-id $CHAINID --keyring-backend test

$CRONOSD genesis collect-gentxs
$CRONOSD genesis validate

# Add blocked addresses
echo "blocked-addresses = ['crc16z0herz998946wr659lr84c8c556da55dc34hh']" \
  >> $HOME/.cronos/config/app.toml

echo "Devnet initialized successfully!"

```

Save this as `setup-devnet.sh`, make it executable, and run it:

```bash
chmod +x setup-devnet.sh
bash setup-devnet.sh
```

### Step 3: Start the Node

Then start the node:

```bash
./bin/cronosd start \
  --pruning=nothing \
  --rpc.unsafe \
  --log_level info \
  --json-rpc.api eth,txpool,personal,net,debug,web3 \
  --minimum-gas-prices 200000basetcro \
  --api.enable
```

You should see log output indicating blocks are being produced. The node is ready when you see lines like:

```
INF committed state block_app_hash=... height=1
```

> **Note:** You may see `ERR Setting ante handler without blacklist` in the logs — this is expected and does not affect functionality.

### Step 4: Verify the Node

Open a new terminal and run the following checks:

**Check node status (Tendermint RPC):**

```bash
curl -s http://localhost:26657/status | jq '.result.sync_info'
```

You should see `catching_up: false` and an increasing `latest_block_height`.

**Check latest block number (EVM JSON-RPC):**

```bash
curl -s http://localhost:8545 \
  -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

**Check account balance:**

```bash
curl -s http://localhost:8545 \
  -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x7cb61d4117ae31a12e393a1cfa3bac666481d02e","latest"],"id":1}'
```

### Service Endpoints

| Service                  | URL                      |
| ------------------------ | ------------------------ |
| EVM JSON-RPC (HTTP)      | `http://localhost:8545`  |
| EVM JSON-RPC (WebSocket) | `ws://localhost:8546`    |
| Tendermint RPC           | `http://localhost:26657` |
| Cosmos REST API          | `http://localhost:1317`  |

### Pre-funded Accounts

Three accounts are created at genesis, each funded with **1000 basetcro** (the native EVM token) and **1 stake** (the staking token).

| Name       | Role      | EVM Address                                  |
| ---------- | --------- | -------------------------------------------- |
| `localkey` | Validator | `0x7cb61d4117ae31a12e393a1cfa3bac666481d02e` |
| `user1`    | Test user | `0xc6fe5d33615a1c52c08018c47e8bc53646a0e101` |
| `user2`    | Test user | `0x963ebdf2e1f8db8707d05fc75bfeffba1b5bac17` |

{% hint style="warning" %}
**Warning**

These mnemonics are publicly known and intended for local development only. **Never** use them on mainnet or testnet.
{% endhint %}

#### Importing Accounts into MetaMask / Wallets

You can derive the private keys from the mnemonics above, or export them directly:

```bash
./bin/cronosd keys unsafe-export-eth-key localkey --keyring-backend test
./bin/cronosd keys unsafe-export-eth-key user1 --keyring-backend test
./bin/cronosd keys unsafe-export-eth-key user2 --keyring-backend test
```

When adding the network to MetaMask:

| Field           | Value                   |
| --------------- | ----------------------- |
| Network Name    | Cronos Devnet           |
| RPC URL         | `http://localhost:8545` |
| Chain ID        | `9000`                  |
| Currency Symbol | `tcro`                  |

### Common Operations

**Stop the node:**

```bash
# Graceful shutdown
kill $(pgrep cronosd)
```

**Restart with existing data:**

```bash
./bin/cronosd start \
  --pruning=nothing \
  --rpc.unsafe \
  --log_level info \
  --json-rpc.api eth,txpool,personal,net,debug,web3 \
  --minimum-gas-prices 200000basetcro \
  --api.enable
```

**Full reset (wipe all data and re-initialize):**

```bash
bash setup-devnet.sh
```

**Send a transaction via CLI:**

```bash
./bin/cronosd tx bank send localkey crc1cml96vmptgw99syqrrz8az79xer2pcgpj22459 \
  1000000000000000000basetcro \
  --keyring-backend test \
  --chain-id cronos_9000-1 \
  --gas-prices 200000basetcro \
  --yes
```

