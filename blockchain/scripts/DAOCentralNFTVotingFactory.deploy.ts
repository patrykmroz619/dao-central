import { ethers, network } from "hardhat";
import { deployLogger } from "./logger";

async function main() {
  if (network.name === "hardhat") {
    return;
  }

  const [signer] = await ethers.getSigners();

  const Factory = await ethers.getContractFactory(
    "DAOCentralNFTVotingFactory",
    signer
  );

  const DAOCentralNFTVotingFactory = await Factory.deploy();

  await DAOCentralNFTVotingFactory.deployed();

  deployLogger.info(
    `[${network.name}] DAOCentralNFTVotingFactory: deployed contract address - ${DAOCentralNFTVotingFactory.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
