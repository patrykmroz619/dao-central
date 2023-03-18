"use client";

import { useDaoDetails } from "modules/dao/providers/DaoDetailsProvider";

export const VotingPower = () => {
  const { userNFTs } = useDaoDetails();

  const numberOfNFTs = userNFTs.length;

  return <>You have {numberOfNFTs} NFTs of the organization</>;
};
