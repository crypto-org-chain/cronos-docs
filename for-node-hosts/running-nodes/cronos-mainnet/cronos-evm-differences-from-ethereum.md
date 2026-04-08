# Cronos EVM: Differences from Ethereum

### Overview

While Cronos is an EVM-compatible chain, its underlying architecture as a Cosmos SDK blockchain (built using Ethermint) introduces several technical nuances that deviate from standard Ethereum behavior. Understanding these differences is critical for developers migrating dApps or building indexing solutions.

### 1. Batch Transactions

The most significant architectural departure is how multiple messages are handled within a single transaction envelope.

* **Ethereum:** Typically, an Ethereum transaction is a single signed message. To execute multiple actions, a user must send multiple transactions or use a smart contract (like a "`Multicall`" contract) to bundle calls.
* **Cronos:** Leveraging the Cosmos SDK, Cronos supports Batch Transactions. In this model, a single Cosmos transaction can contain multiple `MsgEthereumTx` messages within its `body.messages`.

#### Key Characteristics of Cronos Batching

* **Execution:** Messages execute sequentially in the same block.
* **Fees:** They share a single Cosmos fee envelope; the total gas limit and fee amount are the aggregate sums of the individual parts.
* **Indexing:** Each message generates a separate Ethereum receipt, assigned sequential `transactionIndex` values (0, 1, 2, etc.).

{% hint style="warning" %}
**Predictability:** Developers should never rely on a contract address generated during a batch transaction. Because nonces are verified differently during batch submission, the resulting contract address can be unpredictable compared to the standard Ethereum derivation.
{% endhint %}

#### Implementation Example (Integration Pattern)

The canonical pattern for building these transactions involves extracting messages from individual EVM transactions and wrapping them into a single Cosmos body:

```python
def build_batch_tx(w3, cli, txs, key):
    signed_txs = [sign_transaction(w3, tx, key) for tx in txs]
    # Convert signed Eth txs to Cosmos-compatible EVM messages
    tmp_txs = [cli.build_evm_tx(Web3.to_hex(s.raw_transaction)) for s in signed_txs]

    msgs = [tx["body"]["messages"][0] for tx in tmp_txs]
    # Aggregate fees and gas
    total_fee = sum(int(tx["auth_info"]["fee"]["amount"][0]["amount"]) for tx in tmp_txs)
    total_gas = sum(int(tx["auth_info"]["fee"]["gas_limit"]) for tx in tmp_txs)

    return {
        "body": { "messages": msgs, ... },
        "auth_info": { "fee": { "amount": [{"denom": "basetcro", "amount": str(total_fee)}], "gas_limit": str(total_gas) }, ... }
    }
```

### 2. Transaction Hash Uniqueness

A fundamental assumption in Ethereum is that a transaction hash (`TxHash`) is a unique identifier. Cronos has historically deviated from this.

* **Ethereum:** Enforces strict uniqueness. Once a transaction is included in a block, that hash cannot be reused for a different state change.
* **Cronos (Legacy):** In versions prior to `v0.7`, a bug existed that allowed the same transaction to be executed multiple times across different blocks. This resulted in duplicate transaction hashes at different block heights.

#### **Impact on Indexers and RPCs**

Standard Ethereum-style indexers and RPC nodes (using calls like `eth_getTransactionReceipt` or `eth_getBlockByNumber`) are often unprepared for non-unique hashes.

* **Data Inconsistency:** Fetching a receipt by hash might return the "wrong" instance if multiple exist.
* **Reconciliation:** Developers building on Cronos must implement custom reconciliation strategies to handle these duplicates to ensure data integrity, especially when migrating or indexing legacy block data. We recommend overriding the transaction receipt with the receipt returned for the most recent block.
