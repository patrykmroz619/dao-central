import { ethers } from "ethers";
import { TestConfig } from "yup";
import { AnyObject } from "yup/lib/types";

export const walletAddressValidation: TestConfig<
  string | undefined,
  AnyObject
> = {
  name: "is-wallet-address",
  test: (value, ctx) => {
    const isValidEthereumAddress = Boolean(
      value && ethers.utils.isAddress(value)
    );

    return isValidEthereumAddress
      ? true
      : ctx.createError({
          message: "Invalid wallet address",
        });
  },
};
