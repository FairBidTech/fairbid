// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.14;
pragma abicoder v1;

// import "../Libraries/Bit.sol";
// import "../Libraries/TransferHelper.sol";

/// @title Verifier for ERC721 transfers
/// @notice These functions should be executed by metaDelegateCall() on Brink account proxy contracts
contract NftTransferVerifier {
    /// @dev Revert when transfer is expired
    error Expired();

    /// @dev Executes an ERC721 token transfer with replay protection and expiry
    /// @notice This should be executed by metaDelegateCall() with the following signed params
    /// @param amount The index of the replay bit's bytes32 slot
    /// @param tokenid The value of the replay bit
    function nftTransfer(uint256 amount, uint256 tokenid) external {
        // Bit.useBit(bitmapIndex, bit);
        // TransferHelper.safeTransferFrom(token, from, to);
    }
}
