import { useRef } from "react";
import { NFTService } from "../services/nftService";

export const useNFTService = () => {
  const nftServiceRef = useRef(new NFTService());

  return nftServiceRef.current;
};
