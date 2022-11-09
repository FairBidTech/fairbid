// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract TestToken721 is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    string public swarmEndpoint;
    address public owner;

    mapping(uint256 => string) private swarmHash;

    modifier onlyOwner() {
        require(owner == msg.sender, "ERC721: caller is not the owner");
        _;
    }

    constructor(string memory _swarmEndpoint) ERC721("Fair Bid", "FAIR") {
        owner = msg.sender;
        swarmEndpoint = _swarmEndpoint;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent");

        string memory baseURI = swarmEndpoint;
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, swarmHash[tokenId]))
                : "";
    }

    function currentTokenId() external view returns (uint256) {
        return _tokenIds.current();
    }

    function getTokenSwarmHash(uint256 _tokenId)
        external
        view
        returns (string memory)
    {
        return swarmHash[_tokenId];
    }

    // in case of transference pull the ownership trigger, or something
    function sendOwnership(address _newOwner) external onlyOwner {
        owner = _newOwner;
    }

    function changeSwarmEndpoint(string memory _newEndpoint)
        external
        onlyOwner
    {
        swarmEndpoint = _newEndpoint;
    }

    function safeMint(string memory _swarmRef) external returns (uint256) {
        uint256 tokenId = _tokenIds.current();
        _tokenIds.increment();

        swarmHash[tokenId] = _swarmRef;
        _safeMint(msg.sender, tokenId);

        // console.log("token minted %s", tokenId);
        return tokenId;
    }
}
