# Oracles: Chainlink

## Chainlink on Cronos

Cronos integrates with Chainlink across two products: CCIP (cross-chain messaging and token transfers) and CRE (Chainlink Runtime Environment for off-chain compute). CCIP supports both Cronos EVM and Cronos zkEVM on mainnet and testnet, while CRE currently supports only Cronos EVM testnet.

{% hint style="warning" %}
**Note on Price Feeds:** Chainlink Data Feeds (on-chain price oracles) are not currently deployed on Cronos EVM. For price feed needs, Cronos developers should use [Pyth Network](https://docs.cronos.com/for-dapp-developers/dev-tools-and-integrations/pyth) or [Band Protocol](https://docs.cronos.com/for-dapp-developers/dev-tools-and-integrations/band-protocol), both of which have active integrations on Cronos.
{% endhint %}

### Chainlink CCIP

[Chainlink CCIP](https://docs.chain.link/ccip) (Cross-Chain Interoperability Protocol) enables smart contracts to send messages and transfer tokens across blockchains. Cronos integrated CCIP in March 2025.

#### Cronos EVM Mainnet (Chain ID: 25)

| Contract                  | Address                                    |
| ------------------------- | ------------------------------------------ |
| **Router**                | 0xE26B0A098D861d5C7d9434aD471c0572Ca6EAa67 |
| **ARM Proxy (RMN)**       | 0xd22A59e9b4eA2af16e66487411204224F5003351 |
| **Token Admin Registry**  | 0x32c4634338f1386fdD18E0bD6dF51Ca2Fa56f762 |
| **Token Pool Factory**    | 0xABF586910586b8dcbdF92f1C5e2Ae14106f3DD16 |
| **Registry Module Owner** | 0x36293c0fbF1872Be5b6cBc65704fB22d41405388 |

| Parameter          | Value                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Chain Selector** | 1456215246176062136                                                                                                      |
| **Router Version** | 1.2.0                                                                                                                    |
| **Fee Tokens**     | LINK (0x8c80A01F461f297Df7F9DA3A4f740D7297C8Ac85), WCRO (0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23), CRO (Native Token) |

#### Cronos EVM Testnet (Chain ID: 338)

| Contract                  | Address                                    |
| ------------------------- | ------------------------------------------ |
| **Router**                | 0xa0F5f5867F528CCc0f9bCc5225063b4A38b5dEBd |
| **ARM Proxy (RMN)**       | 0x967C605BFF8B9f7a4866ac9d1Ecc660F9CAd08Af |
| **Token Admin Registry**  | 0x58A89590d10BA6553760ca81E66Ce06dfB70429a |
| **Token Pool Factory**    | 0x5D445DF89674096B6A138565cAE955FF816f352D |
| **Registry Module Owner** | 0xAA3450998528E43322698a914D0b756B98292A3b |
| **Committee Verifier**    | 0x8f3ee3c77D2B27c32306a89D367654F959Db223D |

| Parameter          | Value                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **Chain Selector** | 2995292832068775165                                                                                                       |
| **Fee Tokens**     | LINK (0x2896e619Fa7c831A7E52b87EffF4d671bEc6B262), WCRO (0x5C50653Ada833D649a718ba4D1Fb9e2EE49c202d), TCRO (Native Token) |

#### Cronos zkEVM Mainnet (Chain ID: 388)

| Contract                  | Address                                    |
| ------------------------- | ------------------------------------------ |
| **Router**                | 0x17b828DF8679D68318f0849C1221AD1760699eCb |
| **ARM Proxy (RMN)**       | 0xA6f2662523693CFA3Ff2e36e3550ea432864c7DA |
| **Token Admin Registry**  | 0x94Fa8b263dEb66fA3e160D408Cd200be8b030609 |
| **Registry Module Owner** | 0x5Fa0fa2f1dE61BddD68dc8902b59Eaa028BE6F57 |

| Parameter          | Value                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **Chain Selector** | 8788096068760390840                                                                                                        |
| **Router Version** | 1.2.0                                                                                                                      |
| **Fee Tokens**     | LINK (0x61170ca9fB9cF98d4c7d684e07be6D969D59667E), WZKCRO(0xC1bF55EE54E16229d9b369a5502Bfe5fC9F20b6d), zkCRO(Native Token) |

#### Cronos zkEVM Testnet (Chain ID: 240)

| Contract                  | Address                                    |
| ------------------------- | ------------------------------------------ |
| **Router**                | 0xFeFC5B70DA3297A8470e4D0D2Ea85E0F63bA6b0c |
| **ARM Proxy (RMN)**       | 0xb776AF2E561Dd8720148D56C7316fDA56B56b9C8 |
| **Token Admin Registry**  | 0x314B7a51b7472B7F3A998AeA30Cc4Aab731063C8 |
| **Registry Module Owner** | 0xbF7Fa3d397a92cE20Cd6Aa5376F0A4e41eD3f1b4 |

| Parameter          | Value                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Chain Selector** | 16487132492576884721                                                                                                        |
| **Fee Tokens**     | LINK (0xB96217A159cB11Bc51E87c8CAe46C7dF8826A827), WZKCRO(0xeD73b53197189BE3Ff978069cf30eBc28a8B5837), zkTCRO(Native Token) |

#### Sending a Cross-Chain Message

CCIP lets a contract on a source chain send a message that is delivered to a contract on a destination chain. The flow has three moving parts:

1. Sender contract (source chain): builds the message and calls the Router.
2. Router contract (both chains): Chainlink-deployed; estimates fees and dispatches/delivers messages.
3. Receiver contract (destination chain): inherits `CCIPReceiver` and handles the incoming message.

**Example**

Here is a minimal example of sending a message from Cronos EVM to another CCIP-supported chain using Solidity.

**Step 1 — Sender contract (source chain)**

Key steps inside the send function:

1. Build a `Client.EVM2AnyMessage` struct.
2. Call `router.getFee()` to price the message.
3. Ensure the contract holds enough fee tokens and approve the Router to spend the fee.
4. Call `router.ccipSend()`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";

contract Sender {
    IRouterClient private router;
    IERC20 private linkToken;

    constructor(address _router, address _link) {
        router = IRouterClient(_router);
        linkToken = IERC20(_link);
    }

    function sendMessage(
        uint64 destinationChainSelector,
        address receiver,
        string calldata text
    ) external returns (bytes32 messageId) {
        // 1. Build the message
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(text),
            tokenAmounts: new Client.EVMTokenAmount[](0), // no tokens, message only
            extraArgs: Client._argsToBytes(
                Client.GenericExtraArgsV2({
                    gasLimit: 200_000,
                    allowOutOfOrderExecution: true
                })
            ),
            feeToken: address(linkToken)
        });

        // 2. Estimate the fee
        uint256 fee = router.getFee(destinationChainSelector, message);

        // 3. Approve the router to pull LINK fees
        linkToken.approve(address(router), fee);

        // 4. Dispatch
        messageId = router.ccipSend(destinationChainSelector, message);
    }
}
```

**Step 2 — Receiver contract (destination chain)**

Inherit `CCIPReceiver`. The base contract guards `ccipReceive()` with an onlyRouter modifier and forwards to your `_ccipReceive()` implementation.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";


contract Receiver is CCIPReceiver {
   bytes32 public lastMessageId;
   string public lastText;


   constructor(address _router) CCIPReceiver(_router) {}


   function _ccipReceive(
       Client.Any2EVMMessage memory message
   ) internal override {
       lastMessageId = message.messageId;
       lastText = abi.decode(message.data, (string));


       // Optional but recommended: validate source chain + sender
       // uint64 srcSelector = message.sourceChainSelector;
       // address srcSender = abi.decode(message.sender, (address));
   }


   function getLastReceivedMessageDetails()
       external
       view
       returns (bytes32, string memory)
   {
       return (lastMessageId, lastText);
   }
}
```

**Step 3 — Deploy, fund, send, verify**

1. Deploy the Sender on the source chain, passing the source Router and fee token addresses.
2. Fund the Sender with fee tokens.
3. Deploy the Receiver on the destination chain, passing the destination Router address.
4. Send by calling `sendMessage(destinationChainSelector, receiverAddress, "Hello")` on the Sender.
5. Track the message in the [CCIP Explorer](https://ccip.chain.link/) using the returned messageId.
6. Verify by calling `getLastReceivedMessageDetails()` on the Receiver.

Delivery typically completes 5-10 minutes after source-chain finality. See more parameter details at [https://docs.chain.link/ccip/getting-started/evm](https://docs.chain.link/ccip/getting-started/evm), and for common destination chain selectors check the [CCIP Directory](https://docs.chain.link/ccip/directory).

#### Token Transfers via CCIP

CCIP supports cross-chain token transfers in addition to arbitrary messages. Token issuers on Cronos can register their tokens with the **Token Admin Registry** to make them transferable via CCIP.

To register a token:

1. Deploy a token pool contract that implements the CCIP pool interface.
2. Call the Token Admin Registry at `0x32c4634338f1386fdD18E0bD6dF51Ca2Fa56f762` (Cronos EVM) to register the pool.
3. Configure the remote chain pool pairings.

See the [Chainlink CCIP Token Registration guide](https://docs.chain.link/ccip/concepts/cross-chain-tokens) for full instructions.

As of July 2025, no tokens are registered for cross-chain transfer via CCIP on Cronos EVM yet. This is an open opportunity for token issuers on the network.

### Chainlink CRE (Runtime Environment)

Cronos integrated [Chainlink CRE](https://docs.chain.link/cre) in March 2026. CRE enables developers to run verifiable off-chain compute jobs, such as custom data aggregation, conditional automation, and AI inference, whose results can be delivered on-chain with cryptographic proof.

CRE is particularly useful for:

* Custom price feeds or indices not covered by standard oracle networks
* Automated contract execution triggered by off-chain events
* Verifiable computation results delivered on-chain

Refer to the [Chainlink CRE documentation](https://docs.chain.link/cre) for integration details.

#### Price Feeds on Cronos EVM

Chainlink Data Feeds are **not** deployed on Cronos EVM. Use the following alternatives:

**Pyth Network**

Pull-based oracle with \~400ms update frequency. Covers crypto, equities, FX, and commodities.

* Docs: [Cronos × Pyth](https://docs.cronos.com/for-dapp-developers/dev-tools-and-integrations/pyth)
* Price Feed IDs: [pyth.network/price-feeds](https://pyth.network/price-feeds)

**Band Protocol**

Push-based oracle via the `StdReferenceProxy` contract.

* Docs: [Cronos × Band Protocol](https://docs.cronos.com/for-dapp-developers/dev-tools-and-integrations/band-protocol)
