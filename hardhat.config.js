require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
};

/* module.exports = {
  solidity: "0.8.9",
  networks: {
    testnet_aurora: {
      url: process.env.INFURA_AURORA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
}; */
