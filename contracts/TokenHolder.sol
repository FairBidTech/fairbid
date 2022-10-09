// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./TestToken721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "hardhat/console.sol";

contract TokenHolder is IERC721Receiver {
    TestToken721 tt;

    constructor(address testtoken721) {
        tt = TestToken721(testtoken721);
    }

    //event randomText(string text);

    function mintToken() public {
        tt.safeMint();
        //emit randomText("hello");
    }

    // bidder isx EOA to this contract
    function transferTokenNFT(uint256 bid_amount, uint256 tokenId)
        public
        payable
    {
        payable(msg.sender).transfer(bid_amount);
        tt.transferFrom(address(this), msg.sender, tokenId);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
