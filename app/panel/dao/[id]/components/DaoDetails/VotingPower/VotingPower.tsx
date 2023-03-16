"use client";

import { useDaoPageContext } from "../../../context";

export const VotingPower = () => {
  const { userNFTs } = useDaoPageContext();

  const numberOfNFTs = userNFTs.length;

  return <>You have {numberOfNFTs} NFTs</>;
};
