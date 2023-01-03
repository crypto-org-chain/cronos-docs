# Banxa

### Introduction

Banxa powers the largest digital asset platforms by providing payments infrastructure and regulatory compliance across global markets. Our mission and vision is to build the bridge that provides people in every part of the world access to a fairer and more equitable financial system. Visit the [Banxa](https://docs.banxa.com/docs) documentation to find out more.&#x20;

### API Host

| Environment | API Host                         |
| ----------- | -------------------------------- |
| Sandbox     | https://cronos.banxa-sandbox.com |
| Production  | https://cronos.banxa.com         |

### NodeJS Examples

#### Generate HMAC Token

```typescript
const generateHmac = (signature: string, nonce: number): string => {
  const crypto = require("crypto");
  const key = "YOUR_BANXA_KEY";
  const secret = "YOUR_BANXA_SECRET_TOKEN";

  const localSignature = crypto
    .createHmac("SHA256", secret)
    .update(signature)
    .digest("hex");
  return `${key}:${localSignature}:${nonce}`;
};
```

{% hint style="info" %}
To get started using the Banxa APIs, please get in touch [here](https://banxa.com/talk-to-our-team/) with the Banxa team in order to get a user key and secret token.
{% endhint %}

#### Send Request

```typescript
const sendGetRequest = (query: string): void => {
  const hostname = "cronos.banxa-sandbox.com";
  const nonce = Date.now();
  const method = "GET";
  let data = method + "\n" + query + "\n" + nonce;

  const hmac = generateHmac(data, nonce);
  const https = require("https");
  const options = {
    hostname: hostname,
    path: query,
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${hmac}`,
    },
  };

  const req = https.get(
    options,
    (res: {
      statusCode: string;
      headers: string;
      setEncoding: (arg0: string) => void;
      on: (arg0: string, arg1: { (chunk: string): void }) => void;
    }) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding("utf8");
      res.on("data", (chunk: string) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on("end", () => {
        console.log("No more data in response.");
      });
    }
  );

  req.on("error", (e: { message: string }) => {
    console.error(`problem with request: ${e.message}`);
  });
};
```

### **Resources**

Here are additional resources to help you get started with Banxa:

* [Introduction and how to get started with Banxa](https://docs.banxa.com/docs)
* [Generating HMAC Auth](https://docs.banxa.com/recipes)
* [API References](https://docs.banxa.com/reference/get-fiat-currencies)
* [Changelog](https://docs.banxa.com/changelog)

