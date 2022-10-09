const ethers = require("ethers");
const brink = require("@brinkninja/sdk");
const BN = ethers.BigNumber.from;
require("dotenv").config();

async function main() {
  console.log(process.env.rpc_url);
  // Obtain a signer and a provider from the Ethers Library [link above]
  const provider = await new ethers.providers.getDefaultProvider(5);
  const signer = await ethers.Wallet.createRandom().connect(provider);
  console.log(signer.address);
}

main();
