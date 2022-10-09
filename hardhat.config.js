require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.14",
  networks: {
    goerli: {
      url: `https://mainnet.infura.io/v3/` + process.env.GORELI_API_KEY,
      chainId: 5,
    },
    hardhat: {
      forking: {
        url: `https://mainnet.infura.io/v3/` + process.env.GORELI_API_KEY,
      },
    },
  },
};
