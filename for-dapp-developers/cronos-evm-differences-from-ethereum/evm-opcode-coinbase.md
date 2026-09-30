# EVM Opcode: COINBASE

The `COINBASE` opcode (`0x41`) pushes the current block's coinbase address onto the stack. In Solidity, this is exposed as `block.coinbase`.

The term comes from Bitcoin, where the first transaction in every block is called the coinbase transaction. This is the transaction that mints new coins as the block reward, and the address receiving that reward is the coinbase address. Ethereum kept the same concept: each block has a `coinbase` field that identifies who gets paid for producing it.

On Ethereum, the `feeRecipient` is an address set by the block builder to collect priority fees. On Cronos, there is no miner or fee recipient. Cronos uses Cosmos SDK BFT consensus where blocks are proposed by validators, so `COINBASE` returns the EVM address of the validator that proposed the current block.

#### Behaviour Comparison

* **Ethereum:** `COINBASE` returns the `feeRecipient` set by the block builder, usually a wallet or contract that receives priority fees.
* **Cronos:** `COINBASE` returns the EVM address of the current block's proposing validator. This address is not set up to receive contract calls or transfers.

#### What This Means for Your Contract

* Sending CRO to `block.coinbase` does not work as a miner bribe. On Ethereum, searchers often pay miners directly using `block.coinbase.transfer(amount)`. On Cronos, this sends CRO to the validator's derived EVM address, which the validator does not monitor or control for this purpose.
* Using `block.coinbase` as an access control check is unreliable. The block proposer rotates each block based on Cosmos SDK validator selection, so you cannot predict or rely on a specific address being the proposer.
* Reading `block.coinbase` for logging works fine. If you only read the value for informational purposes (e.g. recording which validator proposed a block), it is valid and stable within a given block.

{% hint style="info" %}
Audit any Ethereum contract that uses `block.coinbase` before deploying on Cronos. Contracts that send CRO to `block.coinbase` or use it as a fee-recipient address will not behave as expected.
{% endhint %}

#### Checking the Value

**Via Smart Contract (Solidity)**

If you are writing a smart contract, you can read it directly by accessing the variable in your functions:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MinerReader {
    function getMinerAddress() public view returns (address) {
        // Reads the coinbase address of the current block
        return block.coinbase; 
    }
}
```

**Via Cronos Explorer**

The coinbase address for any block is shown on [Cronos Explorer](https://explorer.cronos.com/) under the `Validator` field on the block detail page. For example: https://explorer.cronos.com/block/81008315

**Via JSON-RPC**

```shell
curl https://evm.cronos.com/ \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}'
```

The `miner` field in the response is the coinbase address:

```json
{
   "id": 1,
   "result": {
       ...
       "hash": "0x...",
       "miner": "0x1e0c93bb9abcc94f24916a6d571450ae62462ecd",
       "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
       "nonce": "0x0000000000000000",
       "number": "0x4d416bb",
       ...
   },
   "jsonrpc": "2.0"
}
```
