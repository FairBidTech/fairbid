require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.14",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/` + process.env.GORELI_API_KEY,
      chainId: 5,
    },
    hardhat: {
      forking: {
        url: `https://goerli.infura.io/v3/` + process.env.GORELI_API_KEY,
      },
    },
  },
};
