# Block Explorer and API Keys

### Block Explorers

{% tabs %}
{% tab title="Cronos Mainnet" %}
* **"Cronos Explorer"** - [https://explorer.cronos.org/](https://explorer.cronos.org/)
* [https://cronos.org/explorer](https://cronos.org/explorer/)
* [https://cronoscan.com/](https://cronoscan.com)
{% endtab %}

{% tab title="Testnet" %}
* **"Cronos Testnet Explorer"** - [https://explorer.cronos.org/testnet](https://explorer.cronos.org/testnet)
* [https://cronos.org/explorer/testnet3](https://cronos.org/explorer/testnet3)
{% endtab %}
{% endtabs %}

Cronos Explorer is the reference transaction and block explorer on Cronos `https://explorer.cronos.org`

### Creating Account and Getting API Key **Cronso Explorer**

The Cronos Explorer Developer APIs are designed to provide accessible and consistent Cronos data to the Cronos community.&#x20;

As a means to provide equitable access to blockchain data, we've developed the Cronos Developer APIs to empower developers with direct access to Cronos's blockchain data and services via `GET/POST` requests.

### 1. Register an Account <a href="#id-1-register-an-account" id="id-1-register-an-account"></a>

Head over to the [**Account Registration**](https://explorer.cronos.org/register) page and provide email and password for your account.

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

### 2. Verify Your Email <a href="#id-2-verify-your-email" id="id-2-verify-your-email"></a>

A verification code will be sent to your email address to verify your sign up request. Fill in on the verification page for completing your registration

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

### 3. Exploring Your Account <a href="#id-3-exploring-your-account" id="id-3-exploring-your-account"></a>

Upon signing in, you will have access to your account dashboard where you can make full use of Cronos explorer's features such as viewing API keys and viewing submitted contract verification status.

<figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>



### 4. Getting an Default API Key <a href="#id-4-getting-an-default-api-key" id="id-4-getting-an-default-api-key"></a>

From your Account Dashboard, click on label **My API Keys**. From there, you may view your API Keys. By Default, each Cronos Explorer account will assign a default API Key on registration completed.



<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

### 5. Using APIs <a href="#id-5-using-apis" id="id-5-using-apis"></a>

Once you have obtained your API key, you can fetch data from the provided endpoints.

_Example:_

```
  curl --request GET 'https://explorer-api.cronos.org/mainnet/api/v1/{module}/{action}?apikey={your_apikey}
```



### API Documentation&#x20;

Please visit [https://explorer-api-doc.cronos.org/mainnet/](https://explorer-api-doc.cronos.org/mainnet/) for API documentation.

