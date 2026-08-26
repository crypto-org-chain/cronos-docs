// Deploy with:
// npx hardhat ignition deploy ignition/modules/MyERC721.ts --network cronosTestnet

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyERC721Module", (m) => {
    // MyERC721 constructor takes no arguments
    const token = m.contract("MyERC721", []);

    return { token };
});
