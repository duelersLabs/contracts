const hre = require("hardhat");

async function main() {
  const TJoyArcade = await hre.ethers.getContractFactory("TJoyArcade");

  const tJoyArcade = await TJoyArcade.deploy();

  await tJoyArcade.deployed();

  console.log(`TJoyArcade contract deployed to: ${tJoyArcade.address}`);

  const TJoyGenetics = await hre.ethers.getContractFactory("TJoyGenetics");

  const tJoyGenetics = await TJoyGenetics.deploy();

  await tJoyGenetics.deployed();

  console.log(`TJoyGenetics contract deployed to: ${tJoyGenetics.address}`);

  const TJoyMint = await hre.ethers.getContractFactory("TJoyMint");

  const tJoyMint = await TJoyMint.deploy(10000);

  await tJoyMint.deployed();

  console.log(`TJoyMint contract deployed to: ${tJoyMint.address}`);

  await tJoyMint.changeNfts(tJoyArcade.address);

  console.log("Nft contract instance created in TJoyMint");

  await tJoyMint.changeGen(tJoyGenetics.address);

  console.log("Genetics contract instance created in TJoyMint");

  await tJoyArcade.addMinter(tJoyMint.address);

  console.log("Minter role added to TJoyMint in TJoyArcade");

  await tJoyGenetics.addMinter(tJoyMint.address);

  console.log("Minter role added to TJoyMint in TJoyGenetics");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
