# CDC Pay Integration
This page illustrates some integration options for the CDC Pay module. The CDC Pay module can be intergated directly into your game development environment.

## Pre-requisites

- Crypto.com Pay Developer [access](https://merchant.crypto.com/users/sign_in/)
- Optional:
  - Webhook server (e.g. nodejs, [ngrok](https://ngrok.com/)) 

### Overview
The CDC Pay module makes use of REST API calls to trigger certain actions. These action will create events that are retrievable via webhooks. The following shell command illsutrates how to initiate the CDC Pay payment.

```sh
POST https://pay.crypto.com/api/payments
```
```sh
curl https://pay.crypto.com/api/payments \
  -u SECRET_KEY: \
  -d amount=2500 \
  -d currency=USD \
  -d description="Crypto.com Tee (Unisex)"
```

::: tip
This API can be called using either your Secret Key or Publishable Key. These keys are generated in the merchant center [dashboard](https://merchant.crypto.com/users/sign_in/).
:::

## Integrating with Unity
To use the CDC Pay module in Unity we can simple use the [UnityWebRequest](https://docs.unity3d.com/ScriptReference/Networking.UnityWebRequest.Post.html) module to simulate a post request. We recommend to use a webhook server to retrieve the payment event responses.

- Create payment example
    ```csharp
    using UnityEngine;
    using UnityEngine.Networking;
    using System.Collections;

    public class CDCPayment : MonoBehaviour
    {
        void Start()
        {
            StartCoroutine(Pay());
        }

        IEnumerator Pay()
        {
            WWWForm form = new WWWForm();
            form.AddField("amount", "1000");
            form.AddField("currency", "USD");
            form.AddField("description", "Product Name");
            form.AddField("return_url", "http://YOUR_WEBSITE.com/orders/123/complete");
            form.AddField("cancel_url", "http://YOUR_WEBSITE.com/orders/123/fail");

            using (UnityWebRequest www = UnityWebRequest.Post("https://pay.crypto.com/api/payments", form))
            www.SetRequestHeader("Authorization", "Bearer SECURITY_KEY");
            {
                yield return www.SendWebRequest();

                if (www.result != UnityWebRequest.Result.Success)
                {
                    Debug.Log(www.error);
                }
                else
                {
                    Debug.Log(www.downloadHandler.data);
                }
            }
        }
    }
    ```

## Unity Webview Module
This section illustrates how a new webview game object is created to display the CDC Pay page within the game. To install the webview module, please follow the examples below.

1. Create a new 3d Game in Unity.

2. Add the following dependency to the manifest file in `Packages/manifest.json`
    ```json
    "net.gree.unity-webview": "https://github.com/gree/unity-webview.git?path=/dist/package",
    ```

3. Create a button game object.
    <img src="./assets/web-view/web-view-integration-step-3.png" />

4. Create a script called `CdcPay.cs` and add the following code to your

    ```csharp
    using System.Collections;
    using System.Collections.Generic;
    using UnityEngine;
    using UnityEngine.SceneManagement;
    using UnityEngine.UI;
    using UnityEngine.Networking; 

    public class CdcPay : MonoBehaviour
    {
        public Text status;
        WebViewObject webViewObject;

        public class Response {
            public string payment_url;
        }

        public void OnCDCPay()
        {
            StartCoroutine(Checkout());
        }

        IEnumerator Checkout()
        {
            WWWForm form = new WWWForm();
            form.AddField("amount", "1000");
            form.AddField("currency", "USD");
            form.AddField("description", "Product Name");
            form.AddField("return_url", "http://YOUR_WEBSITE.com/orders/123/complete");
            form.AddField("cancel_url", "http://YOUR_WEBSITE.com/orders/123/fail");

            using (UnityWebRequest www = UnityWebRequest.Post("https://pay.crypto.com/api/payments", form))
            {
                www.SetRequestHeader("Authorization", "Bearer pk_test_Lp6yX1M1fyx4zmyAyzLNwH1H");
                yield return www.SendWebRequest();
                Response data = JsonUtility.FromJson<Response>(System.Text.Encoding.UTF8.GetString(www.downloadHandler.data));
                
                if (www.result != UnityWebRequest.Result.Success)
                {
                    Debug.Log(www.error);
                    Debug.Log(www.downloadHandler.data);
                }
                else
                {
                    webViewObject = (new GameObject("WebViewObject")).AddComponent<WebViewObject>();
                    webViewObject.Init((msg) => {
                    Debug.Log(msg);
                    });
                    webViewObject.LoadURL(data.payment_url);
                    webViewObject.SetVisibility(true); 
                }                    
            }
        }
    }
    ```

5. Create an empty game object called script, and add the `CdcPay.cs` script to it.

6. Drag the script gameobject into the button onClick component and select the `CdcPay()` method

6. Run from the editor and click the checkout button.

    Click Button 
    <img src="./assets/web-view/web-view-integration-step-7a.png" />
    Complete test Payment
    <img src="./assets/web-view/web-view-integration-step-7b.png" />

7. Complete a test order and retrieve the payload via webhook as explained in the next section.
    <img src="./assets/web-view/web-view-integration-step-8.png" />
::: tip
Client Logic can be invoked in the game directly. Therefore, the onApprove function should only handle screen changes. It should be accompanied by server side logic like [Webhooks](https://pay-docs.crypto.com/?shell#api-reference-webhooks) to complete your orders.
:::

## Webhooks
Webhooks make it easier to integrate with Crypto.com Pay by allowing you to subscribe to a set of events. You can refer to [Resources](https://pay-docs.crypto.com/?shell#api-reference-resources) for the schema of the objects.

### Overview
To simulate a purchase and retrieve the payload from the CDC Pay events, you can use this webhook server [example](https://github.com/cronos-labs/play-cpp-sdk/tree/main/demo).

### Requirements
- [node.js](https://nodejs.org/en/)) 
- [ngrok](https://ngrok.com/)) 

### Installation

 1. Clone the following repository
    ```sh
    git clone https://github.com/cronos-labs/play-cpp-sdk.git
    ```
2.  Run the following commands:
    ```sh
    cd demo
    npm install
    node server.js
    ```
    ::: tip
    Please ensure to repalce the `SIGNATURE_SECRET` from you merchants dashboard after adding the webhook endpoint.
    :::
4. Open a new terminal and run the following command:
    ```sh
    ngrok http 4567
    ```
5. Add the forwarding url from the ngrok GUI as your payload endpoint in your merchant dashboard.
    <img src="./assets/webhook/webhook-step-1.png" />
6. Run the CDC Pay API from a client (e.g. the webview module in Unity).
    <img src="./assets/webhook/webhook-step-2.png" />

## CDC Pay documentation
You can read more about the CDC Pay integration [here](https://pay-docs.crypto.com/?shell#overview-home).