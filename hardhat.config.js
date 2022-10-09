require("dotenv").config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
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
