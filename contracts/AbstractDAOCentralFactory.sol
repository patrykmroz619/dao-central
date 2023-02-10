// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

abstract contract AbstractDAOCentralFactory {
    event ContractCreated(
        address indexed creator,
        address indexed contractAddress
    );

    mapping(uint256 => address) public deployedContracts;
    uint256 public deployedContractsCount = 0;

    function deployContract(bytes memory constructorParams)
        external
        returns (address)
    {
        address contractAddress = _deploy(constructorParams);

        deployedContracts[deployedContractsCount] = contractAddress;
        deployedContractsCount++;

        emit ContractCreated(msg.sender, contractAddress);
        return contractAddress;
    }

    function _deploy(bytes memory constructorParams)
        internal
        virtual
        returns (address);
}
