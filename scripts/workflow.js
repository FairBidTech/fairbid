const { ethers } = require("hardhat");
const brinkUtils = require("@brinkninja/utils");
const { BN, encodeFunctionCall } = brinkUtils;
const { execMetaTx } = brinkUtils.testHelpers(ethers);

const NFT_TRANSFER_PARAM_TYPES = [
  { name: "bitmapIndex", type: "uint256" },
  { name: "bit", type: "uint256" },
  { name: "token", type: "address" },
  { name: "from", type: "address" },
  { name: "to", type: "address" },
];

async function process_workflow() {
  const TestToken721 = await ethers.getContractFactory("TestToken721");
  const contract1 = await TestToken721.deploy();

  const TokenHolder = await hre.ethers.getContractFactory("TokenHolder");
  const contract2 = await TokenHolder.deploy(contract1.address);

  for (let i = 0; i < 10; i++) {
    contract2.mintToken();
  }

  const [defaultAccount] = await ethers.getSigners();
  this.defaultAccount = defaultAccount;
  const chainId = await defaultAccount.getChainId();

  function signedDelegateCall({ signedData, account, owner }) {
    execMetaTx({
      contract: account,
      method: "metaDelegateCall",
      signer: defaultAccount,
      chainId,
      params: [signedData],
      unsignedData: "0x",
    });
  }

  call_data = encodeFunctionCall(
    "nftTransfer",
    NFT_TRANSFER_PARAM_TYPES.map((t) => t.type),
    [BN(0), BN(1), contract1.address, contract2.address, defaultAccount.address]
  );

  message = signedDelegateCall({
    signedData: call_data,
    account: contract2,
    owner: this.defaultAccount,
  });
  console.log(message);
}

process_workflow();
