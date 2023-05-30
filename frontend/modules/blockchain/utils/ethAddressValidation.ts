import { ethers } from "ethers";
import { TestConfig, AnyObject } from "yup";

export const ethAddressValidation: TestConfig<string | undefined, AnyObject> = {
  name: "is-eth-address",
  test: (value, ctx) => {
    const isValidEthereumAddress = Boolean(
      value && ethers.utils.isAddress(value)
    );

    return isValidEthereumAddress
      ? true
      : ctx.createError({
          message: "invalid-address",
        });
  },
};
