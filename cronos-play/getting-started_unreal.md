# Unreal Engine Plugin

### Pre-requisites

Unreal Engine 4.27 and 5.0 are supported, i.e. one of them should be installed via the Epic Games Launcher.

### Supported OS

* **Windows**: Make sure you use Visual Studio 2019 or later.(2022) it's already coded, if any compiling errors occur, add these line to top of c++ file:

```cpp
#pragma warning(disable:4583)
#pragma warning(disable:4582)
```

* **macOS**: Make sure you use Xcode 13.2.1. If you are building the C++ SDK bindings and the corresponding binaries from Rust for Unreal Engine 5, then make sure to set a deployment target for the [Cronos Play C++ SDK](https://github.com/cronos-labs/play-cpp-sdk):

```rust
export MACOSX_DEPLOYMENT_TARGET=10.15
cargo build ..
// You may check the deployment target using `otool`:
otool -l <resulting binary>.dylib
// where The `LC_BUILD_VERSION/minos` should be `10.15`.
```

## Start building!

### How to compile

To compile the existing library, follow the steps below:

1. Install unreal engine 4.27
2. Clone the following repository

```bash
git clone https://github.com/cronos-labs/play-unreal-plugin
```

1. open `CronosPlaySdk/CronosPlaySdk.uproject` with the unreal editor

### How to install

To install, run the following commands:

1. Run the following commands to copy dynamic libraries for ue4 editor

```bash
git clone https://github.com/cronos-labs/play-unreal-plugin
cd CronosPlaySdk 
`copydll.sh` or `copydll.bat`
mkdir Plugins
copy ./CronosPlaySdk/Plugins/CronosPlayUnreal yourProjectFolder/Plugins/
cd yourProjectFolder/Plugins/
`copydll.sh` or `copydll.bat`
```

### How to start coding

1. click **add blueprint** in the ue4 menu
2. inherit DefiWalletCoreActor or PlayCppSdkActor
3. drag & drop your class to the scene
4. category is **CronosPlayUnreal**
5. the api in `..Blueprint.h` is stateless, and can be called anywhere in the blueprint

![centered image](assets/unreal-engine/blue\_print.png)

## Documentation for UE function and blueprint

Users can also download the [CronosPlaySdkHelp](https://github.com/cronos-labs/play-unreal-plugin/releases) and check the documentation for ue function and blueprint document.

## Unreal Engine sample code

This section contains a sample project that uses the Cronos Play Unreal SDK plugin. For more information, please see the [Cronos Play Unreal SDK plugin repository](https://github.com/cronos-labs/play-unreal-plugin).

### Pre-requisites

Visual Studo 2019 or later (2022) or XCODE 13.2.1 Unreal Engine 4.27 and 5.0 are supported, i.e. one of them should be installed via the Epic Games Launcher.

### Installation

To install, run the following commands:

#### **macOS**

1. Run the following commands

```bash
git clone https://github.com/cronos-labs/play-unreal-demo
cd play-unreal-demo/CronosPlayUnrealDemo/
`copydlls.sh`
```

1. `CronosPlayUnrealDeemo.project` with the unreal editor

#### **Windows**

1. Run the following commands

```bash
git submodule update --init --recursive`
cd CronosPlayUnrealDemo`
`copydll.bat`
```

1. `CronosPlayUnrealDemo.project`with the unreal editor

### Documentation generation

Currently, this is supported on Windows via [KantanDocGen Plugin](https://github.com/kamrann/KantanDocGenPlugin):

1. Run `getdoc.sh` inside [Git shell](https://gitforwindows.org)
2. Enable KantanDocGenPlugin in plugins
3. Open the plugin dialog: File -> KantanDocGen
4. Navigate in this dialog: Class Search -> Native Module -> Click + -> **CronosPlayUnreal**
5. Click on "Generate Docs"
   * location: **CronosPlaySdk/Saved/KantanDocGen/**

### More information for Cronos Play

If you are interested to build on Cronos, please visit [Cronos Play](https://cronos.org/play) or fill this [Contact Form](https://airtable.com/shrFiQnLrcpeBp2lS) for more information.
