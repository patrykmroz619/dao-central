import { Signer, Contract } from "ethers";
import { ethers } from "hardhat";

export const deployContract = async <ContractType extends Contract>(
  contract: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Array<any>,
  deployer: Signer,
): Promise<ContractType> => {
  const ContractFactory = await ethers.getContractFactory(contract, deployer);

  const Contract = (await ContractFactory.deploy(...params)) as unknown as ContractType;

  await Contract.deployed();
  return Contract;
};
