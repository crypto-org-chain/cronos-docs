# Quick Start for Sellers

This section explains how sellers (API providers, resource servers) can integrate x402 payment verification and settlement into their services. For the buyer-side implementation, see [Quick Start for Buyers](quick-start-for-buyers.md).

### Prerequisites

* Cronos-compatible wallet for receiving payments

### Integration Steps

1. **Detect Payment Requirement:** Check if the requested resource requires payment
2. **Respond with 402:** Return payment requirements to the buyer
3. **Extract Payment Header:** Buyer retries with signed authorization in `X-PAYMENT`
4. **Verify Payment:** Forward to facilitator's [Verify Endpoint](api-reference.md#verify-endpoint)
5. **Settle Payment:** If valid, call the [Settle Endpoint](api-reference.md#settle-endpoint)&#x20;
6. **Deliver Resource:** Return protected content with 200 OK

### Complete Payment Flow

```javascript
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Configuration
const FACILITATOR_URL = 'https://facilitator.cronoslabs.org/v2/x402';
const SELLER_WALLET = process.env.SELLER_WALLET;
const USDCE_CONTRACT = '0xc01efAaF7C5C61bEbFAeb358E1161b537b8bC0e0'; // Cronos testnet - see Network Constants

// Protected API endpoint
app.get('/api/premium-data', async (req, res) => {
  const paymentHeader = req.headers['X-PAYMENT'] || req.body?.paymentHeader;

  // Step 1: Check if payment is provided
  if (!paymentHeader) {
    return res.status(402).json({
      error: 'Payment Required',
      x402Version: 1,
      paymentRequirements: {
        scheme: 'exact',
        network: 'cronos-testnet', // Switch to 'cronos' for Cronos mainnet
        payTo: SELLER_WALLET,
        asset: USDCE_CONTRACT,
        description: 'Premium API data access',
        mimeType: 'application/json',
        maxAmountRequired: '1000000', // 1 USDC.e (6 decimals)
        maxTimeoutSeconds: 300
      }
    });
  }

  try {
    const requestBody = {
      x402Version: 1,
      paymentHeader: paymentHeader,
      paymentRequirements: { 
        scheme: 'exact',
        network: 'cronos-testnet', // Same network as in 402 response
        payTo: SELLER_WALLET,
        asset: USDCE_CONTRACT,
        description: 'Premium API data access',
        mimeType: 'application/json',
        maxAmountRequired: '1000000',
        maxTimeoutSeconds: 300
      }
    };

    // Step 2: Verify payment
    const verifyRes = await axios.post(`${FACILITATOR_URL}/verify`, requestBody, {
      headers: { 'Content-Type': 'application/json', 'X402-Version': '1' }
    });

    if (!verifyRes.data.isValid) {
      return res.status(402).json({
        error: 'Invalid payment',
        reason: verifyRes.data.invalidReason
      });
    }

    // Step 3: Settle payment
    const settleRes = await axios.post(`${FACILITATOR_URL}/settle`, requestBody, {
      headers: { 'Content-Type': 'application/json', 'X402-Version': '1' }
    });

    // Step 4: Check settlement and return content
    if (settleRes.data.event === 'payment.settled') {
      return res.status(200).json({
        data: {
          premiumContent: 'This is your premium data',
        },
        payment: {
          txHash: settleRes.data.txHash,
          from: settleRes.data.from,
          to: settleRes.data.to,
          value: settleRes.data.value,
          blockNumber: settleRes.data.blockNumber,
          timestamp: settleRes.data.timestamp
        }
      });
    } else {
      return res.status(402).json({
        error: 'Payment settlement failed',
        reason: settleRes.data.error
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Server error processing payment',
      details: error.response?.data || error.message
    });
  }
});

app.listen(3000);
```

{% hint style="info" %}
**Note:** For Python, Go, or other language examples, the integration pattern is identical: make HTTP POST requests to `/verify` and `/settle` with the same JSON structure.
{% endhint %}

### Testing Your Integration

#### **1. Test Environment**

The facilitator uses a single base URL for both networks:

* **Facilitator URL**: `https://facilitator.cronoslabs.org/v2/x402`
* **Network Selection**: Specify via `"network"` field in payment requirements
  * Testnet: `"network": "cronos-testnet"` (Chain ID: `338`)
  * Mainnet: `"network": "cronos"` (Chain ID: `25`)

#### **2. Test Health Check**

See the [Health Check Endpoint](api-reference.md#health-check-endpoint) for details.

```bash
curl -X GET https://facilitator.cronoslabs.org/healthcheck
```

#### **3. Test** Supported

See the [Supported Endpoint](api-reference.md#api-endpoints) for details.

```bash
curl -X GET https://facilitator.cronoslabs.org/v2/x402/supported
```

#### **4. Simulate Payment Flow**

```bash
# Request without payment (should return 402)
curl -X GET http://localhost:3000/api/premium-data

# Request with payment header (after signing)
curl -X GET http://localhost:3000/api/premium-data \
  -H "X-PAYMENT: eyJ4NDAyVmVyc2lvbiI6MS4uLn0="
```

#### **5. Test Edge Cases**

See [Verify Endpoint](api-reference.md#verify-endpoint) and [Settle Endpoint](api-reference.md#settle-endpoint) for complete error documentation.

<table><thead><tr><th width="199.95703125">Scenario</th><th>Expected Response</th></tr></thead><tbody><tr><td>Invalid signature</td><td><code>{"isValid": false, "invalidReason": "Invalid EIP-3009 signature"}</code></td></tr><tr><td>Wrong network</td><td><code>{"isValid": false, "invalidReason": "Unsupported network: ethereum-mainnet"}</code></td></tr><tr><td>Duplicate nonce</td><td><code>{"event": "payment.failed", "error": "Authorization already used"}</code></td></tr><tr><td>Expired auth</td><td><code>{"event": "payment.failed", "error": "Authorization expired"}</code></td></tr></tbody></table>

#### **6. Monitor Transactions**

* Check facilitator response for `txHash` and `blockNumber`
* View on Cronos Block Explorer: `https://explorer.cronos.com/testnet/tx/[txHash]`
