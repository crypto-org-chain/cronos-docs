# EVM Opcode: DIFFICULTY / PREVRANDAO

The `DIFFICULTY` opcode (`0x44`) pushes the current block's difficulty value onto the stack. In Solidity, this is exposed as `block.difficulty`.

After Ethereum's Merge in 2022, the same opcode was repurposed and renamed to `PREVRANDAO` (EIP-4399). In Solidity it became `block.prevrandao`. The opcode number `0x44` is the same; only what it returns changed.

On Cronos, this opcode returns `0`.

#### Background

On proof-of-work Ethereum, `DIFFICULTY` returned how hard it was to mine the current block, a large number that adjusted over time. Smart contracts occasionally read this value, though it was not safe to use as a random number source since miners could influence it.

After the Merge, Ethereum replaced proof-of-work with proof-of-stake and repurposed the opcode. It now returns the RANDAO mix value from the previous block, which is a pseudo-random value produced by combining validator signatures over many blocks. This made `block.prevrandao` a better (though still imperfect) source of on-chain randomness.

Cronos uses Cosmos SDK BFT consensus and has neither proof-of-work difficulty nor Ethereum's RANDAO mechanism. There is no meaningful value to return, so the opcode returns `0`.

#### Behaviour Comparison

* **Ethereum (pre-Merge):** `DIFFICULTY` returns the current block's mining difficulty.
* **Ethereum (post-Merge):** `PREVRANDAO` returns the previous block's RANDAO mix, a pseudo-random value.
* **Cronos:** Returns `0`. There is no proof-of-work and no RANDAO.

#### What This Means for Your Contract

* Do not use `block.difficulty` or `block.prevrandao` as a source of randomness on Cronos. On Cronos, both always return `0`. Any contract logic that depends on this value being random or variable will not work correctly.

```solidity
// This does NOT produce randomness on Cronos — always returns 0
uint256 rand = uint256(block.prevrandao);
```

* Porting contracts from Ethereum that use `block.difficulty` for randomness needs a fix. A common pattern in older Ethereum contracts is using `block.difficulty` combined with other values to generate a pseudo-random number. This pattern breaks on Cronos since the input is always `0`.

```solidity
// Common Ethereum pattern, broken on Cronos
uint256 rand = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, msg.sender)));
```

{% hint style="info" %}
Audit any Ethereum contract that reads `block.difficulty` or `block.prevrandao` before deploying on Cronos. If the contract uses it for randomness or any variable logic, it needs to be updated.
{% endhint %}

#### Recommended Alternative

Use a decentralised oracle for randomness on Cronos. The following are available on Cronos mainnet:

* [Witnet](https://docs.witnet.io/): https://docs.cronos.com/for-dapp-developers/dev-tools-and-integrations/witnet#randomness-oracle-in-smart-contracts
* [Pyth Entropy](https://docs.pyth.network/entropy): on-chain random number generation by Pyth Network.

#### Checking the Value

**Via JSON-RPC**

```shell
curl https://evm.cronos.com/ \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}'
```

The `difficulty` and `mixHash` fields in the response correspond to this opcode. On Cronos, `difficulty` is `0`:

```json
{
   "id": 1,
   "result": {
       ...
       "difficulty": "0x0",
       "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
       ...
   },
   "jsonrpc": "2.0"
}
```
