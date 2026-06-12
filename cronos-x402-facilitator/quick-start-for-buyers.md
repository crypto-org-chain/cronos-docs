# Quick Start for Buyers

This section explains how buyers (wallets, AI agents, or applications) can generate valid payment headers that authorize token transfers and authenticate payment when accessing protected resources. For the seller-side implementation, see [Quick Start for Sellers](quick-start-for-sellers.md).

### Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* Cronos-compatible wallet with private key or browser wallet extension
* _USDC.E_ token balance (see [Network Constants](api-reference.md#network-constants) for contract addresses)
  * For Cronos Testnet, you can obtain _devUSDC.e_ tokens from the [faucet](https://faucet.cronos.org/) for testing purposes

### Integration Steps <a href="#integration-steps" id="integration-steps"></a>

1. **Receive 402 Response** - Buyer requests resource and receives payment requirements
2. **Generate Payment Header** - Create EIP-3009 signature authorizing token transfer
3. **Retry with Payment** - Send request with `X-PAYMENT` containing authorization
4. **Receive Content** - Seller settles payment and returns protected resource

#### **Installation**

```bash
npm install ethers
```

#### **Complete Payment Flow**

```javascript
const axios = require('axios');
const { ethers } = require('ethers');
const { createPaymentHeader } = require('./payment-header-generator');

async function payForResource(resourceUrl, wallet) {
  try {
    // Step 1: Initial request to resource (expect 402)
    const initialResponse = await axios.get(resourceUrl).catch(err => err.response);

    // Step 2: Check for 402 Payment Required
    if (initialResponse.status !== 402) {
      return initialResponse.data;
    }

    const { paymentRequirements } = initialResponse.data;

    // Step 3: Generate payment header (sign EIP-3009 authorization)
    const paymentHeaderBase64 = await createPaymentHeader({
      wallet: wallet,
      paymentRequirements: paymentRequirements,
      network: paymentRequirements.network,
    });

    // Step 4: Retry request with payment header
    const paidResponse = await axios.get(resourceUrl, {
      headers: { 'X-PAYMENT': paymentHeaderBase64 },
    });
    
    return paidResponse.data;

  } catch (error) {
    throw error;
  }
}

// Example usage
async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.JsonRpcProvider('https://evm-t3.cronos.com');
  const wallet = new ethers.Wallet(privateKey, provider);

  const resourceUrl = 'https://seller-api.example.com/api/premium-data';
  const result = await payForResource(resourceUrl, wallet);

  return result;
}

main();
```

#### **Generating Payment Header**

```javascript
const { ethers } = require('ethers');

/**
 * Generates a random 32-byte nonce for EIP-3009 authorization
 */
function generateNonce() {
  return ethers.hexlify(ethers.randomBytes(32));
}

/**
 * Creates a signed payment header for x402 payments
 */
async function createPaymentHeader({ wallet, paymentRequirements, network }) {
  const { payTo, asset, maxAmountRequired, maxTimeoutSeconds, scheme } = paymentRequirements;

  // Generate unique nonce
  const nonce = generateNonce();
  
  // Calculate validity window
  const validAfter = 0; // Valid immediately
  const validBefore = Math.floor(Date.now() / 1000) + maxTimeoutSeconds;

  // Set up EIP-712 domain
  const domain = {
    name: "Bridged USDC (Stargate)",
    version: "1",
    chainId: "338",
    verifyingContract: asset,
  };

  // Define EIP-712 typed data structure
  const types = {
    TransferWithAuthorization: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'validAfter', type: 'uint256' },
      { name: 'validBefore', type: 'uint256' },
      { name: 'nonce', type: 'bytes32' },
    ],
  };

  // Create the message to sign
  const message = {
    from: wallet.address,
    to: payTo,
    value: maxAmountRequired,
    validAfter: validAfter,
    validBefore: validBefore,
    nonce: nonce,
  };

  // Sign using EIP-712
  const signature = await wallet.signTypedData(domain, types, message);

  // Construct payment header
  const paymentHeader = {
    x402Version: 1,
    scheme: scheme,
    network: network,
    payload: {
      from: wallet.address,
      to: payTo,
      value: maxAmountRequired,
      validAfter: validAfter,
      validBefore: validBefore,
      nonce: nonce,
      signature: signature,
      asset: asset,
    },
  };

  // Base64-encode
  return Buffer.from(JSON.stringify(paymentHeader)).toString('base64');
}

module.exports = { createPaymentHeader, generateNonce, NETWORKS, TOKEN_NAME, TOKEN_VERSION };
```

### **Common Pitfalls**

Common mistakes when implementing the payment header generation:

* **Wrong Token Metadata**

```javascript
// WRONG - will fail signature verification
const domain = { name: 'Bridged USDC', version: '2' };

// CORRECT - must be exact
const domain = { name: 'Bridged USDC (Stargate)', version: '1' };
```

* **Invalid Nonce Format**

```javascript
// WRONG
const nonce = ethers.hexlify(ethers.randomBytes(16)); // Too short
const nonce = '1234567890'; // Not hex

// CORRECT
const nonce = ethers.hexlify(ethers.randomBytes(32)); // 32 bytes
```

* **Decimal in Amount**

```javascript
// WRONG
const value = '1.5'; // Has decimal
const value = 1500000; // Number type (precision loss)

// CORRECT
const value = '1500000'; // Base units as string
```

* **Timestamp in Milliseconds**

```javascript
// WRONG
const validBefore = Date.now() + 300000; // Milliseconds

// CORRECT
const validBefore = Math.floor(Date.now() / 1000) + 300; // Seconds
```
