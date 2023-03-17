// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./AbstractDAOCentralFactory.sol";
import "./DAOCentralNFTVoting.sol";

contract DAOCentralNFTVotingFactory is AbstractDAOCentralFactory {
    function _deploy(bytes memory constructorParams)
        internal
        override
        returns (address)
    {
        (string memory organizationName, address nftContractAddress) = abi
            .decode(constructorParams, (string, address));

        DAOCentralNFTVoting newContract = new DAOCentralNFTVoting(
            organizationName,
            IERC721(nftContractAddress)
        );

        newContract.transferOwnership(msg.sender);

        return address(newContract);
    }
}
