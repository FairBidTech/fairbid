const { ethers } = require("hardhat");
const brinkUtils = require("@brinkninja/utils");
const { BN, encodeFunctionCall } = brinkUtils;
const { execMetaTx } = brinkUtils.testHelpers(ethers);
// const {
//   setupProxyAccount,
//   getSigners,
// } = require("@brinkninja/core/test/helpers");
// const snapshotGas = require("./helpers/snapshotGas");
const brink = require("@brinkninja/sdk");

const NFT_TRANSFER_PARAM_TYPES = [
  { name: "amount", type: "uint256", signed: true },
  { name: "tokenid", type: "uint256", signed: true },
];

async function process_workflow() {
  const NFTTransferVerifier = await ethers.getContractFactory(
    "NftTransferVerifier"
  );
  let swarmhash =
    "e7184380fb5dca7be1893522674e15df451d93c482453737c56f8b6ab1c4d3a5";
  const verifier = await NFTTransferVerifier.deploy();

  const TestToken721 = await ethers.getContractFactory("TestToken721");
  const contract1 = await TestToken721.deploy();

  const TokenHolder = await hre.ethers.getContractFactory("TokenHolder");
  const contract2 = await TokenHolder.deploy(contract1.address);

  for (let i = 0; i < 10; i++) {
    contract2.mintToken(swarmhash);
  }

  const [defaultAccount] = await ethers.getSigners();
  this.defaultAccount = defaultAccount;
  const chainId = await defaultAccount.getChainId();
  const accountSinger = brink.accountSigner(defaultAccount, "hardhat");

  console.log(chainId);

  function signedDelegateCall({ signedData, account, owner }) {
    execMetaTx({
      contract: account,
      method: "metaDelegateCall",
      signer: defaultAccount,
      chainId,
      params: [verifier.address, signedData],
      unsignedData: "0x",
    });
  }

  const call = {
    functionName: "nftTransfer",
    paramTypes: NFT_TRANSFER_PARAM_TYPES,
    params: ["1", "1"],
  };

  const signedMessage = await accountSinger.signMetaDelegateCall(
    verifier.address,
    call
  );

  console.log(signedMessage);

  const account = brink.account(defaultAccount.address, {
    provider: ethers.provider,
    signer: defaultAccount,
  });

  const tx2 = await account.metaDelegateCall(signedMessage);
  console.log(tx2);

  console.log(await ethers.provider.getNetwork());
}

process_workflow();
