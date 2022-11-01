const ethers = require("ethers");
const brink = require("@brinkninja/sdk");
const BN = ethers.BigNumber.from;
require("dotenv").config();
const axios = require("axios");

async function pull_api() {
  axios.get("https://app-api.brink.trade/orders").then((resp) => {
    orders = resp.data;
    console.log(orders["orders"][1]);
  });
}

pull_api();
