// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // deploy 721
  const TestToken721 = await hre.ethers.getContractFactory("TestToken721");
  const contract1 = await TestToken721.deploy();
  console.log(`testtoken721 contract deployed ${contract1.address}`)

  // deploy token holder
  const TokenHolder = await hre.ethers.getContractFactory("TokenHolder");
  const contract2 = await TokenHolder.deploy();
  console.log(`tokenholder contract deployed ${contract2.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
