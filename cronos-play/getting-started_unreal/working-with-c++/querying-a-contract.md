# Querying a contract

After creating `MyDefiWalletCoreActor`, we can switch to the source code editor and add token querying feature in the actor.

### Adding`PlayCppSdkLibrary` as dependency module

* Edit `CronosPlayDemo.Build.cs`, and add `PlayCppSdkLibrary`, as one of the Dependency Modules.

```
PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "HeadMountedDisplay", "PlayCppSdkLibrary" });
```

### Querying the name of a ERC20 contract

* Create constructor, and two overridden functions: `BeginPlay` and `Tick`
* In `BeginPlay` function, call `Erc20Name`function from `ADefiWalletCoreActor`, and print out logs like below

```
bool success;
FString output_message;
ADefiWalletCoreActor::Erc20Name("0xf0307093f23311FE6776a7742dB619EB3df62969", name, success, output_message);
FString success_message = success ? "true" : "false";
UE_LOG(LogTemp, Display, TEXT("ERC20 name: %s"), *name);
UE_LOG(LogTemp, Display, TEXT("ERC20 success: %s"), *success_message);
UE_LOG(LogTemp, Display, TEXT("ERC20 output_message: %s"), *output_message);
```

### Examples

#### `MyDefiWalletCoreActor.h`

```
// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "DefiWalletCoreActor.h"
#include "MyDefiWalletCoreActor.generated.h"

/**
 * 
 */
UCLASS()
class CRONOSPLAYDEMO_API AMyDefiWalletCoreActor : public ADefiWalletCoreActor
{
	GENERATED_BODY()

public:
	AMyDefiWalletCoreActor();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:
	// Called every frame
	virtual void Tick(float DeltaTime) override;

	
};
```

#### `MyDefiWalletCoreActor.cpp`

```
// Fill out your copyright notice in the Description page of Project Settings.


#include "MyDefiWalletCoreActor.h"

// Sets default values
AMyDefiWalletCoreActor::AMyDefiWalletCoreActor() {
  // Set this actor to call Tick() every frame.  You can turn this off to
  // improve performance if you don't need it.
  PrimaryActorTick.bCanEverTick = true;
}


// Called when the game starts or when spawned
void AMyDefiWalletCoreActor::BeginPlay() {
	Super::BeginPlay();
	FString name;
	bool success;
	FString output_message;
	ADefiWalletCoreActor::Erc20Name("0xf0307093f23311FE6776a7742dB619EB3df62969", name, success, output_message);
	FString success_message = success ? "true" : "false";
	UE_LOG(LogTemp, Display, TEXT("ERC20 name: %s"), *name);
	UE_LOG(LogTemp, Display, TEXT("ERC20 success: %s"), *success_message);
	UE_LOG(LogTemp, Display, TEXT("ERC20 output_message: %s"), *output_message);
}


// Called every frame
void AMyDefiWalletCoreActor::Tick(float DeltaTime) {
	Super::Tick(DeltaTime);
}
```

### Building

Select Development Editor Profile in tool bar > Build > Build Solution (Disable Live Coding on Unreal Editor before building)
