---
meta:
  - name: "title"
    content: Cronos | Crypto.org EVM Chain | Chain ID and Address Format
  - name: "description"
    content: Find out more about Bech32 address, BIP-0173 address prefix and Chain ID format in this documentation.
  - name: "og:title"
    content: Cronos | Crypto.org EVM Chain | Chain ID and Address Format
  - name: "og:type"
    content: Website
  - name: "og:description"
    content: Find out more about Bech32 address, BIP-0173 address prefix and Chain ID format in this documentation.
  - name: "og:image"
    content: https://cronos.org/og-image.png
  - name: "twitter:title"
    content: Cronos | Crypto.org EVM Chain | Chain ID and Address Format
  - name: "twitter:site"
    content: "@cryptocom"
  - name: "twitter:card"
    content: summary_large_image
  - name: "twitter:description"
    content: Find out more about Bech32 address, BIP-0173 address prefix and Chain ID format in this documentation.
  - name: "twitter:image"
    content: https://cronos.org/og-image.png
canonicalUrl: https://cronos.org/docs/chain-details/chain-id.html
---

# Chain ID and Address Format

## Chain ID

Cronos has different Chain ID to distinguish between _devnet_, _testnet_ and _mainnet_. When running the Cronos in your local environment, you will also need to decide your own Chain ID.

For example, our testnet Chain ID is `cronostestnet_338-1`.

## Address prefix

[BIP-0173](https://github.com/satoshilabs/slips/blob/master/slip-0173.md) defines a new format for segregated witness output addresses that contains a human-readable part that identifies the coin type. Cronos has different address prefixes for its corresponding network types, these prefixes are:

| Testnet |
| ------- |
| `tcrc`   |

Cronos uses the Bech32 address format wherever users must handle binary data. Bech32 encoding provides robust integrity checks on data and the human readable part(HRP) that provides contextual hints that can assist UI developers with providing informative error messages. Specifically, we have the following HRP prefix for different addresses types in the mainnet:

|                    | Address bech32 Prefix |
| ------------------ | --------------------- |
| Account            | `tcrc`                 |
| Validator Operator | `tcrcvaloper`          |
| Consensus Nodes    | `tcrcvalcons`          |

We can use the `keys show` command of `cronosd` with the flag `--bech <type> (acc|val|cons) ` to obtain the addresses and keys as mentioned above: for example,

```
$ cronosd keys show mykey --bech acc
- name: mykey
  type: local
  address: tcrc1qsklxwt77qrxur494uvw07zjynu03dq9alwh37
  pubkey: '{"@type":"/ethermint.crypto.v1alpha1.ethsecp256k1.PubKey","key":"A8nbJ3eW9oAb2RNZoS8L71jFMfjk6zVa1UISYgKK9HPm"}'
  mnemonic: ""

$ cronosd keys show test --bech val
- name: mykey
  type: local
  address: tcrcvaloper1qsklxwt77qrxur494uvw07zjynu03dq9rdsrlq
  pubkey: '{"@type":"/ethermint.crypto.v1alpha1.ethsecp256k1.PubKey","key":"A8nbJ3eW9oAb2RNZoS8L71jFMfjk6zVa1UISYgKK9HPm"}'
  mnemonic: ""

$ cronosd keys show test --bech cons
- name: mykey
  type: local
  address: tcrcvalcons1qsklxwt77qrxur494uvw07zjynu03dq9h7rlnp
  pubkey: '{"@type":"/ethermint.crypto.v1alpha1.ethsecp256k1.PubKey","key":"A8nbJ3eW9oAb2RNZoS8L71jFMfjk6zVa1UISYgKK9HPm"}'
  mnemonic: ""
```
