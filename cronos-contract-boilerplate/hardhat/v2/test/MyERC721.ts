import { expect } from "chai";
import { ethers } from "hardhat";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import type { MyERC721 } from "../typechain-types";

describe("MyERC721", () => {
    const TOKEN_URI = "ipfs://token/0";

    let token: MyERC721;
    let alice: HardhatEthersSigner;

    beforeEach(async () => {
        [, alice] = await ethers.getSigners();
        token = await ethers.deployContract("MyERC721");
    });

    it("uses the hardcoded collection name and symbol", async () => {
        expect(await token.name()).to.equal("MyToken");
        expect(await token.symbol()).to.equal("MTK");
    });

    it("lets an account with MINTER_ROLE mint with a token URI", async () => {
        await token.safeMint(alice.address, TOKEN_URI);
        expect(await token.ownerOf(0)).to.equal(alice.address);
        expect(await token.tokenURI(0)).to.equal(TOKEN_URI);
    });

    it("increments token ids across mints", async () => {
        await token.safeMint(alice.address, TOKEN_URI);
        await token.safeMint(alice.address, "ipfs://token/1");
        expect(await token.tokenURI(1)).to.equal("ipfs://token/1");
    });

    it("rejects minting from an account without MINTER_ROLE", async () => {
        await expect(
            token.connect(alice).safeMint(alice.address, TOKEN_URI),
        ).to.be.revertedWithCustomError(
            token,
            "AccessControlUnauthorizedAccount",
        );
    });

    it("blocks minting while paused", async () => {
        await token.pause();
        await expect(
            token.safeMint(alice.address, TOKEN_URI),
        ).to.be.revertedWithCustomError(token, "EnforcedPause");
    });
});
