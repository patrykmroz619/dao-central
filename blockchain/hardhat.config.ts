import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-abi-exporter";
import * as dotenv from "dotenv";
dotenv.config();

const fallbackKey =
  "0000000000000000000000000000000000000000000000000000000000000000";

const accounts = [process.env.PRIVATE_KEY || fallbackKey];

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: `https://rpc.ankr.com/polygon_mumbai`,
      accounts,
    },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      accounts,
    },
    bsc_test: {
      url: `https://rpc.ankr.com/bsc_testnet_chapel`,
      accounts,
    },
  },
  abiExporter: {
    runOnCompile: true,
  },
};

export default config;
