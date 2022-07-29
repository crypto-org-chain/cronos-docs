# Cronos Play FAQ

**What is the difference between using the Cronos Play Gaming SDK and Moralis?**&#x20;

In short, there are more similarities than differences, because a lot of this stuff is based on similar open-source libraries. Both are wrappers that allow developers to abstract away the generic read/write functions that you need when you want your user to interact with an Ethereum-compatible chain.&#x20;

But Moralis SDK for Unity operates at a higher level of abstraction, meaning that it wraps and integrates more functionalities that you would need, as a developer, to code yourself otherwise. For example, Moralis SDK allows you to easily store your user data in their backend servers, whereas the Cronos Play integration of Chainsafe SDK (for Unity) does not include any backend, it's just a bunch of front-end functions that call a blockchain endpoint directly, with nothing in between.&#x20;

In summary, as a dev, if you want to rely more on "ready made" libraries and high levels of abstraction on top of basic Ethereum read/write functions, use Moralis. If you want more control over lower level code and more granular customization of how blockchain transactions are read and written, use the Chainsafe SDK. You can start with Moralis and switch if you see that you need more customization, as switching is not going to require a complete redesign of your code (the underlying logic is similar).
