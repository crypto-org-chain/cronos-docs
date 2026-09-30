---
description: >-
  Build a Foundry project from scratch, configure it for Cronos EVM, and deploy
  a sample contract with forge script.
---

# Foundry Integration

[Foundry](https://book.getfoundry.sh/) is a Solidity-native toolchain: tests, deploy scripts and fixtures are all written in Solidity, and there is no Node.js dependency.

### Prerequisites

* A wallet private key: With a small amount of CRO to pay for gas fees. (For testnet TCRO, use the faucet at[ https://faucet.cronos.com/](https://faucet.cronos.com/).)
* An RPC endpoint: See details [here](../../introduction/introduction.md).
* A Cronos Explorer API key, see how to obtain it [here](../block-explorer-and-api-keys.md#creating-account-and-getting-api-key-cronos-explorer).

### Step 1. Install Foundry

Run the following in your terminal:

```bash
curl -L https://foundry.paradigm.xyz | bash && foundryup
```

This installs `forge`, `cast`, `anvil` and `chisel`.

Verify the installation with:

```bash
forge --version
```

### Step 2. Create and initialize the project

```bash
forge init my-cronos-project
cd my-cronos-project
```

Foundry creates the following structure:

```
my-cronos-project/
├── src/          # Your contracts
├── test/         # Tests
├── script/       # Deployment scripts
└── foundry.toml  # Project configuration
```

### Step 3. Write your contract

`forge init` creates a sample contract `Counter.sol` at `src/`. You can remove it and add your contracts to `src/`.&#x20;

### Step 3.1. Install Dependencies

For example, to add `OpenZeppelin` as a dependency:

```bash
forge install OpenZeppelin/openzeppelin-contracts@v5.6.0
```

Then add the remapping to `foundry.toml`:

```toml
[profile.default]
remappings = [    
    "@openzeppelin/=lib/openzeppelin-contracts/",
]
```

{% hint style="warning" %}
Pin the versions. An unpinned `forge install` tracks the default branch, so a later `forge update` can silently change your bytecode — and bytecode that no longer matches is bytecode you cannot verify.
{% endhint %}

### Step 4. Configure `.env`

Create a `.env` file in the project root:

```
PRIVATE_KEY=your_private_key_here
CRONOS_EXPLORER_API_KEY_MAINNET=your_mainnet_api_key_here
CRONOS_EXPLORER_API_KEY_TESTNET=your_testnet_api_key_here
```

Then load it before running any scripts:

```bash
source .env
```

Check how to get a Cronos Explorer API key [here](../block-explorer-and-api-keys.md#creating-account-and-getting-api-key-cronos-explorer).

{% hint style="danger" %}
Never commit your `.env` file to version control. Add it to `.gitignore` to keep your private key safe.
{% endhint %}

{% hint style="danger" %}
`.env` holds your private key in plain text. For mainnet work, prefer Foundry's encrypted keystore (`cast wallet import`) and pass `--account <name>` instead of relying on `PRIVATE_KEY`.
{% endhint %}

### Step 5. Configure Cronos

Set the compiler, both RPC aliases and both verification endpoints in `foundry.toml` , example config:

{% code title="foundry.toml" lineNumbers="true" %}
```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc = "0.8.28"
evm_version = "cancun"
optimizer = true
optimizer_runs = 200
remappings = ["@openzeppelin/=lib/openzeppelin-contracts/"]

# Cronos EVM RPC endpoints
[rpc_endpoints]
cronos_mainnet = "https://evm.cronos.com/"
cronos_testnet = "https://evm-t3.cronos.com/"

# Cronos Explorer verification endpoints.
# The API key is passed on the command line with --etherscan-api-key.
[etherscan]
cronos_mainnet = { key = "${CRONOS_EXPLORER_MAINNET_API_KEY}", chain = 25, url = "https://explorer-api.cronos.org/mainnet/api/v2" }
cronos_testnet = { key = "${CRONOS_EXPLORER_TESTNET_API_KEY}", chain = 338, url = "https://explorer-api.cronos.org/testnet/api/v2" }
```
{% endcode %}

{% hint style="info" %}
Foundry has no `gasPrice` config field, instead it reads the gas price from the node via `eth_gasPrice`, which is correct on Cronos. If a transaction stalls, override it explicitly with `--gas-price 10100000000000` (10,100 gwei) — check the current level at [explorer.cronos.com/charts](https://explorer.cronos.com/charts).
{% endhint %}

### Step 6. Compile

```bash
forge build
```

### Step 7. Test

`forge init` creates a sample test for `Counter.sol` at `test/`.  To run it:

```bash
forge test
```

### Step 8. Deploy

Foundry deploys with Solidity scripts, `forge init` creates a sample script at `src/`.  To run it:

```
forge script script/Counter.s.sol:CounterScript \
  --rpc-url cronos_testnet \
  --broadcast
```

`--rpc-url cronos_testnet` refers to the alias defined in `[rpc_endpoints]`. Swap it for `cronos_mainnet` to deploy to mainnet. Drop `--broadcast` to simulate without sending anything.

### Step 9. Verify

Run `forge verify-contract` after deployment:

```bash
forge verify-contract <ADDRESS> src/Counter.sol:Counter \
  --chain-id 338 \
  --verifier-url https://explorer-api.cronos.org/testnet/api/v2 \
  --etherscan-api-key YOUR_CRONOS_EXPLORER_TESTNET_API_KEY \
```

For contracts that take parameters in contructor, add `--constructor-args` and `cast abi-encode`. For example, the verification command for an ERC20 token that takes `name` and `symbol` as constructor parameters will look like:

```bash
forge verify-contract <ADDRESS> src/MyERC20.sol:MyERC20 \
  --chain-id 338 \
  --verifier-url https://explorer-api.cronos.org/testnet/api/v2 \
  --etherscan-api-key $CRONOS_EXPLORER_TESTNET_API_KEY \
  --constructor-args $(cast abi-encode "constructor(string,string)" "My token name" "My token symbol")
```
