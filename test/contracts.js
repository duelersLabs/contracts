const hre = require("hardhat");
const { expect } = require("chai");

let tJoyArcade;
let tJoyGenetics;
let tJoyMint;

describe("Deploy contracts", () => {
  describe("Contracts deployment and permissions set", () => {
    it("Test", async function () {
      const TJoyArcade = await hre.ethers.getContractFactory("TJoyArcade");

      tJoyArcade = await TJoyArcade.deploy();

      await tJoyArcade.deployed();

      const TJoyGenetics = await hre.ethers.getContractFactory("TJoyGenetics");

      tJoyGenetics = await TJoyGenetics.deploy();

      await tJoyGenetics.deployed();

      const TJoyMint = await hre.ethers.getContractFactory("TJoyMint");

      tJoyMint = await TJoyMint.deploy(10000);

      await tJoyMint.deployed();

      await tJoyMint.changeNfts(tJoyArcade.address);

      await tJoyMint.changeGen(tJoyGenetics.address);

      await tJoyArcade.addMinter(tJoyMint.address);

      await tJoyGenetics.addMinter(tJoyMint.address);

      expect(tJoyArcade.address).to.equal(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3"
      );
      expect(tJoyGenetics.address).to.equal(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
      );
      expect(tJoyMint.address).to.equal(
        "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
      );
    });
  });
});

describe("Methods callings", () => {
  describe("Add first genetics", () => {
    it("Available genetics has to be equal to 10 and used genetics has to be equal to 0", async () => {
      let genetics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      await tJoyGenetics.addGenetics(genetics);

      const available = await tJoyGenetics.getAvailable();

      const used = await tJoyGenetics.getUsed();

      expect(available.length).to.equal(10);
      expect(used.length).to.equal(0);
    });
  });

  describe("Mint nfts", () => {
    it("I this first mint trying available genetics has to be equal to 9 and used genetics has to be equal to 1", async () => {
      await tJoyMint.mint();

      const available = await tJoyGenetics.getAvailable();

      const used = await tJoyGenetics.getUsed();

      const totalMinted = (await tJoyMint.getTotalOwners()).toNumber();

      expect(available.length).to.equal(9);
      expect(used.length).to.equal(1);
      expect(totalMinted).to.equal(1);
    });
  });
});
