// Deploy with:
// npx hardhat ignition deploy ignition/modules/MyERC20.ts --network cronosTestnet

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyERC20Module", (m) => {
    const name = m.getParameter("name", "My token name");
    const symbol = m.getParameter("symbol", "My token symbol");

    const token = m.contract("MyERC20", [name, symbol]);

    return { token };
});
