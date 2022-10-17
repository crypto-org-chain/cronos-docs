# Page 2

Tools > New C++ Class... > All Classes > DefiWalletCoreActor

<figure><img src="../../../.gitbook/assets/image (33).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../.gitbook/assets/image (23).png" alt=""><figcaption></figcaption></figure>

Edit CronosPlayDemo.Build.cs, add PlayCppSdkLibrary

```
PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "HeadMountedDisplay", "PlayCppSdkLibrary" });

```

