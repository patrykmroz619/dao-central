import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-abi-exporter";
import * as dotenv from "dotenv";
dotenv.config();

const fallbackKey =
  "0000000000000000000000000000000000000000000000000000000000000000";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: `https://rpc.ankr.com/polygon_mumbai`,
      accounts: [process.env.PRIVATE_KEY || fallbackKey],
    },
  },
  abiExporter: {
    runOnCompile: true,
  },
};

export default config;
