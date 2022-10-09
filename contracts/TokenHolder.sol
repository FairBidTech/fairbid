// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./TestToken721.sol";
import "hardhat/console.sol";

contract TokenHolder {
    TestToken721 tt;

    event randomText(string text);

    function mintToken() public {
        tt.safeMint();
        emit randomText("hello");
    }

    // bidder is EOA to this contract
    function transferTokenNFT(uint256 bid_amount, uint256 tokenId)
        public
        payable
    {
        payable(msg.sender).transfer(bid_amount);
        tt.transferFrom(address(this), msg.sender, tokenId);
    }
}
