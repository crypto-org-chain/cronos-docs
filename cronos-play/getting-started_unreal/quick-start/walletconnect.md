# WalletConnect

First, we create a variable `PlayCppSdkActor` that references `BP Play Cpp Sdk`. It will be used to reference objects/instances of the **Blueprint Play Cpp Sdk** class, which provides WalletConnect functions.

<figure><img src="../../../.gitbook/assets/image (28).png" alt=""><figcaption></figcaption></figure>

Then, use Spawn Actor from Class to spawn from `BP Play Cpp Sdk`, and set the return value to variable `PlayCppSdkActor` for later easy access.&#x20;

<figure><img src="../../../.gitbook/assets/image (30).png" alt=""><figcaption></figcaption></figure>

Call `InitializeWalletConnect` function from `PlayCppSdkActor` with the following inputs:

* `Description`: Defi WalletConnect example.
* `Url`: [http://localhost:8080/](http://localhost:8080/)
* `Name`: Defi WalletConnect Web3 Example
* `Icon Urls`: Connect with Make Array

<figure><img src="../../../.gitbook/assets/image (29).png" alt=""><figcaption></figcaption></figure>

Drag Pin Out from function `InitializeWalletConnect`, search and **select Add Custom Event...**

<figure><img src="../../../.gitbook/assets/image (14).png" alt=""><figcaption></figcaption></figure>

Connect the `Succeed` result to the `Condition` of a node **Branch**

<figure><img src="../../../.gitbook/assets/image (23).png" alt=""><figcaption></figcaption></figure>

If the callback return True, then call `SetupCallback` and `GetConnectionString` as below, finally print the connection string in the Game.

<figure><img src="../../../.gitbook/assets/image (19).png" alt=""><figcaption></figcaption></figure>

In Android, launch the WalletConnect Deep link as below:

<figure><img src="../../../.gitbook/assets/image (15) (3).png" alt=""><figcaption></figcaption></figure>

The full blueprint demo:

<figure><img src="../../../.gitbook/assets/image (18).png" alt=""><figcaption></figcaption></figure>
