const ethers = require("ethers");
const brink = require("@brinkninja/sdk");
const BN = ethers.BigNumber.from;
require("dotenv").config();
const axios = require("axios");

async function pull_api() {
  axios.get("https://app-api.brink.trade/orders").then((resp) => {
    orders = resp.data;
    // console.log(order);
    orders["orders"].map((order) => {
      console.log(order);
    });
    return ethers
      .getImpersonatedSigner("0x044e9527429b01211b06b06885e6c5873f82156c")
      .then(signer);
    brink;

    // tx = account.deploy()
    // tx = account.metaDelegateCall(signedMessage, [unsignedTo, unsignedData])

    console.log(orders["orders"][0]);
  });
}

pull_api();
