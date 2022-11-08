const { expect } = require("chai"); 

const { ethers } = require("hardhat");
const brinkUtils = require("@brinkninja/utils");
const { BN, encodeFunctionCall } = brinkUtils;
const { execMetaTx } = brinkUtils.testHelpers(ethers);

const brink = require("@brinkninja/sdk");

const NFT_TRANSFER_PARAM_TYPES = [
  { name: "amount", type: "uint256", signed: true },
  { name: "tokenid", type: "uint256", signed: true },
];


describe("Fairbid", function () {
    let contracts;

    async function deploy_contracts_mint_tokens() {
        const NFTTransferVerifier = await ethers.getContractFactory(
            "NftTransferVerifier"
        );

        let swarmhash =
            "e7184380fb5dca7be1893522674e15df451d93c482453737c56f8b6ab1c4d3a5";
        const verifier = await NFTTransferVerifier.deploy();

        const TestToken721 = await ethers.getContractFactory("TestToken721");
        const contract1 = await TestToken721.deploy(swarmhash);

        const TokenHolder = await hre.ethers.getContractFactory("TokenHolder");
        const contract2 = await TokenHolder.deploy(contract1.address);

        for (let i = 0; i < 10; i++) {
            id = contract2.mintToken(swarmhash);
        }

        contracts = await [verifier, contract1, contract2]
        return contracts
    }

    before(function() {
        return deploy_contracts_mint_tokens().then(function(result) {
            describe('my dynamic tests', function () {})

        })
    })

    describe("Deployment", function () {
        it('Should deploy NFT verifier contract', async function() {
            address = contracts[0].address
            expect(address).to.be.string
        })

        it('Should deploy NFT contract', async function() {
            address = contracts[1].address
            expect(address).to.be.string
        })

        it('Should deploy NFT holder contract', async function() {
            address = contracts[2].address
            expect(address).to.be.string
        })
    })

    describe("Pre-minting process", function() {
        it('Should mint NFTs', async function() {
            const [owner, otherAccount] = await ethers.getSigners();
            id = contract2.connect(otherAccount).mintToken(swarmhash);
            expect(1).to.not.be.null
        })

        it('Should not allow non-owner to mint NFTs', async function() {
            expect(1).to.not.be.null
        })

        it('Should upload images to Swarm Network', async function() {
            expect(1).to.not.be.null
        })

        it('Should upload json data to Swarm Network', async function() {
            expect(1).to.not.be.null
        })

        it('Should transfer NFTs to holder contract', async function() {
            expect(1).to.not.be.null
        })
    })

    describe("Front-end", function () {
        it('Should identify invalid messages', async function() {
            expect(1).to.not.be.null
        })

        it('Should generate valid messages', async function() {
            expect(1).to.not.be.null
        })

        it('Should upload valid message to Brink API', async function() {
            expect(1).to.not.be.null
        })
    })

    describe("Back-end", function () {
        it('Should download messages from Brink API', async function() {
            expect(1).to.not.be.null
        })

        it('Should process valid messages', async function() {
            expect(1).to.not.be.null
        })

        it('Should identify an invalid message and emit error', async function () {
            expect(1).to.not.be.null
        })
    })

    describe("Auction", function() {
        it('Should invalidate bids after bid end', async function() {
            expect(1).to.not.be.null
        })

        it('Should invalidate bids under reserve price', async function() {
            expect(1).to.not.be.null
        })

        it('Should invalidate bids if bidder has insufficient funds', async function () {
            expect(1).to.not.be.null
        })

        it('Should invalidate bids no NFTs are left', async function () {
            expect(1).to.not.be.null
        })
    })
})