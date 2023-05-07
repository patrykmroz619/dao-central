"use client";

import { Plus } from "react-feather";
import { Controller } from "react-hook-form";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { IconButton } from "modules/common/components/IconButton";
import { TextInput } from "modules/common/components/Input/TextInput";
import { Text } from "modules/common/components/Typography";
import { InlineLink } from "modules/common/components/InlineLink";
import { TextEditor } from "modules/common/components/TextEditor";
import { Separator } from "modules/common/components/Separator";

import { ASYNC_STATE } from "modules/common/hooks/useAsyncState";
import { useCreateDao } from "./useCreateDao";
import { CreatingDaoState } from "./CreatingDaoState";

import styles from "./NewDaoForm.module.scss";

export const NewDaoForm = () => {
  const {
    register,
    control,
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
      <Separator />
      <Controller
        name="description"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextEditor
            label="Organization description"
            value={value}
            onChange={onChange}
            height={200}
          />
        )}
      />
      <TextInput
        {...register("websiteLink")}
        label="Website URL"
        isError={Boolean(formErrors.nftAddress)}
        helperText={formErrors.nftAddress?.message}
      />
      <TextInput
        {...register("facebookLink")}
        label="Facebook"
        isError={Boolean(formErrors.nftAddress)}
        helperText={formErrors.nftAddress?.message}
      />
      <TextInput
        {...register("twitterLink")}
        label="Twitter"
        isError={Boolean(formErrors.nftAddress)}
        helperText={formErrors.nftAddress?.message}
      />
      <TextInput
        {...register("discordLink")}
        label="Discord"
        isError={Boolean(formErrors.nftAddress)}
        helperText={formErrors.nftAddress?.message}
      />
      <Separator />
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
