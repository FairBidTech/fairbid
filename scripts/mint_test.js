const { ethers } = require("hardhat");

const TokenHolder_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const target_address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

async function interate_mint() {
  const [owner, addr1] = await ethers.getSigners();
  //   console.log(owner, addr1);
  const TokenHolder = await hre.ethers.getContractFactory("TokenHolder");
  const contract = TokenHolder.attach(TokenHolder_address);
  contract.mintToken();
}

interate_mint()