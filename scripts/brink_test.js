const ethers = require("ethers");
const brink = require("@brinkninja/sdk");
const BN = ethers.BigNumber.from;
require("dotenv").config();

async function main() {
  console.log(process.env.rpc_url);
  // Obtain a signer and a provider from the Ethers Library [link above]
  const provider = await new ethers.providers.getDefaultProvider(5);
  const signer = await ethers.Wallet.createRandom().connect(provider);

  console.log(signer);
  console.log(await provider.getBlockNumber());
  account = await brink.account(signer.address, {
    provider,
    signer,
  });

  console.log(account);
  console.log(await account.isDeployed());
  const tx = await account.deploy();
  console.log(await account.isDeployed());

  // Get an AccountSigner instance to sign messages as the owner of an account. Takes an ethers.js Signer [link above]
  //   const accountSigner = await brink.accountSigner(signer);
}

main();
