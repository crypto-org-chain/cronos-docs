// Deploy with:
// npx hardhat ignition deploy ignition/modules/MyERC1155.ts --network cronosTestnet

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyERC1155Module", (m) => {
    const uri = m.getParameter(
        "uri",
        "https://example.com/api/token/{id}.json"
    );

    const token = m.contract("MyERC1155", [uri]);

    return { token };
});
