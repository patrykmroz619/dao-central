"use client";

import { Plus } from "react-feather";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { IconButton } from "modules/common/components/IconButton";
import { TextInput } from "modules/common/components/Input/TextInput";
import { ASYNC_STATE } from "modules/common/hooks/useAsyncState";
import { useCreateDao } from "./useCreateDao";
import { CreatingDaoState } from "./CreatingDaoState";

import styles from "./NewDaoForm.module.scss";
import { Text } from "modules/common/components/Typography";
import { InlineLink } from "modules/common/components/InlineLink";

export const NewDaoForm = () => {
  const {
    register,
    formErrors,
    handleCreateDaoSubmit,
    creatingDaoState,
    txHash,
  } = useCreateDao();

  const { isConnected } = useAccount();

  return (
    <form className={styles.form} onSubmit={handleCreateDaoSubmit}>
      <TextInput
        {...register("organizationName")}
        label="Organization Name"
        placeholder="My organization"
        isError={Boolean(formErrors.organizationName)}
        helperText={formErrors.organizationName?.message}
      />
      <TextInput
        {...register("nftAddress")}
        label="NFT address"
        placeholder="0x..."
        isError={Boolean(formErrors.nftAddress)}
        helperText={formErrors.nftAddress?.message}
      />
      <Text>
        If you do not have an NFT contract, you can create one using the{" "}
        <InlineLink external href="https://www.zerocodenft.com/">
          Zero Code NFT Platform
        </InlineLink>
      </Text>
      <CreatingDaoState state={creatingDaoState} txHash={txHash} />
      <div className={styles.form__buttonContainer}>
        {isConnected ? (
          <IconButton
            Icon={Plus}
            isLoading={creatingDaoState.state === ASYNC_STATE.LOADING}
            type="submit"
          >
            Create contract
          </IconButton>
        ) : (
          <ConnectButton />
        )}
      </div>
    </form>
  );
};
