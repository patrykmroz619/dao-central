import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  DAOCentralNFTVotingFactory,
  DAOCentralNFTVotingFactory__factory,
  DAOCentralNFTVoting__factory,
} from "../typechain-types";
import { deployContract } from "./utils";

describe("DAOCentralNFTVotingFactory", () => {
  const fixtures = async () => {
    const [deployer, user1] = await ethers.getSigners();

    const Factory = await deployContract<DAOCentralNFTVotingFactory>(
      "DAOCentralNFTVotingFactory",
      [],
      deployer
    );

    return { Factory, user1 };
  };

  it("should allow deploying new DAOCentralNFTVotingFactory", async () => {
    const { Factory, user1 } = await loadFixture(fixtures);

    const organizationName = "ORGANIZATION";
    const nftContractAddress = ethers.Wallet.createRandom().address;

    const constructorParams = ethers.utils.defaultAbiCoder.encode(
      ["string", "address"],
      [organizationName, nftContractAddress]
    );

    const deployTx = await Factory.connect(user1).deployContract(
      constructorParams
    );

    const receipt = await deployTx.wait();

    const contractCreatedEvent = receipt.events?.find(
      (event) => event.event === "ContractCreated"
    );

    const creator = contractCreatedEvent?.args?.creator;
    const deployedContractAddress = contractCreatedEvent?.args?.contractAddress;

    expect(creator).to.be.equal(user1.address);
    expect(deployedContractAddress).to.be.exist;

    const contractsCount = Number(await Factory.deployedContractsCount());
    expect(contractsCount).to.be.equal(1);

    const DAOCentralNFTVotingFactory = DAOCentralNFTVoting__factory.connect(
      deployedContractAddress,
      user1
    );

    const ownerOfDeployedContract = await DAOCentralNFTVotingFactory.owner();

    expect(ownerOfDeployedContract).to.be.equal(user1.address);
  });
});
