# Chain ID and Address Format

## Chain ID

Crypto.org Chain has different Chain ID to distinguish between _devnet_, _testnet_ and _mainnet_. When running the Crypto.org Chain in your local environment, you will also need to decide your own Chain ID.

For example, our testnet Chain ID is `cronostestnet-338`.

## Address prefix

[BIP-0173](https://github.com/satoshilabs/slips/blob/master/slip-0173.md) defines a new format for segregated witness output addresses that contains a human-readable part that identifies the coin type. Crypto.org Chain has different address prefixes for its corresponding network types, these prefixes are:

| Testnet |
| ------- |
| `eth`   |

Crypto.org Chain uses the Bech32 address format wherever users must handle binary data. Bech32 encoding provides robust integrity checks on data and the human readable part(HRP) that provides contextual hints that can assist UI developers with providing informative error messages. Specifically, we have the following HRP prefix for different addresses types in the mainnet:

|                    | Address bech32 Prefix |
| ------------------ | --------------------- |
| Account            | `eth`                 |
| Validator Operator | `ethvaloper`          |
| Consensus Nodes    | `ethvalcons`          |

We can use the `keys show` command of `ethermintd` with the flag `--bech <type> (acc|val|cons) ` to obtain the addresses and keys as mentioned above: for example,

```
$ ethermintd keys show mykey --bech acc
- name: mykey
  type: local
  address: eth1qsklxwt77qrxur494uvw07zjynu03dq9alwh37
  pubkey: '{"@type":"/ethermint.crypto.v1alpha1.ethsecp256k1.PubKey","key":"A8nbJ3eW9oAb2RNZoS8L71jFMfjk6zVa1UISYgKK9HPm"}'
  mnemonic: ""

$ ethermintd keys show test --bech val
- name: mykey
  type: local
  address: ethvaloper1qsklxwt77qrxur494uvw07zjynu03dq9rdsrlq
  pubkey: '{"@type":"/ethermint.crypto.v1alpha1.ethsecp256k1.PubKey","key":"A8nbJ3eW9oAb2RNZoS8L71jFMfjk6zVa1UISYgKK9HPm"}'
  mnemonic: ""

$ ethermintd keys show test --bech cons
- name: mykey
  type: local
  address: ethvalcons1qsklxwt77qrxur494uvw07zjynu03dq9h7rlnp
  pubkey: '{"@type":"/ethermint.crypto.v1alpha1.ethsecp256k1.PubKey","key":"A8nbJ3eW9oAb2RNZoS8L71jFMfjk6zVa1UISYgKK9HPm"}'
  mnemonic: ""
```
