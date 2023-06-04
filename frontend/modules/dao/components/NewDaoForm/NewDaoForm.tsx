"use client";

import { Plus } from "react-feather";
import { Controller } from "react-hook-form";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { InternationalizedProps } from "@/infrastructure/internationalization/types";
import { useClientTranslation } from "@/infrastructure/internationalization/client";
import { ASYNC_STATE } from "@/infrastructure/helpers/hooks/useAsyncState";
import { Separator, Text, TextInput } from "@/infrastructure/ui/core";
import {
  IconButton,
  InlineLink,
  TextEditor,
} from "@/infrastructure/ui/core/client";

import { useCreateDao } from "./useCreateDao";
import { CreatingDaoState } from "./CreatingDaoState";

import styles from "./NewDaoForm.module.scss";

export const NewDaoForm = (props: InternationalizedProps) => {
  const { lang } = props;

  const { t } = useClientTranslation(lang, "dao", "new-dao-form");

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
        label={t("organization-name")}
        placeholder={t("organization-name-placeholder") ?? ""}
        isError={Boolean(formErrors.organizationName)}
        helperText={
          formErrors.organizationName?.message &&
          t(formErrors.organizationName?.message)
        }
      />
      <TextInput
        {...register("nftAddress")}
        label={t("nft-address")}
        placeholder="0x..."
        isError={Boolean(formErrors.nftAddress)}
        helperText={
          formErrors.nftAddress?.message && t(formErrors.nftAddress?.message)
        }
      />

      <Text>
        {t("external-nft-mint-cta")}{" "}
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
            label={t("organization-description")}
            value={value}
            onChange={onChange}
            height={200}
          />
        )}
      />
      <TextInput
        {...register("websiteLink")}
        label={t("website-url")}
        isError={Boolean(formErrors.websiteLink)}
        placeholder="https://"
        helperText={
          formErrors.websiteLink?.message && t(formErrors.websiteLink.message)
        }
      />
      <TextInput
        {...register("facebookLink")}
        label={t("facebook-url")}
        isError={Boolean(formErrors.facebookLink)}
        placeholder="https://"
        helperText={
          formErrors.facebookLink?.message && t(formErrors.facebookLink.message)
        }
      />
      <TextInput
        {...register("twitterLink")}
        label={t("twitter-url")}
        isError={Boolean(formErrors.twitterLink)}
        placeholder="https://"
        helperText={
          formErrors.twitterLink?.message && t(formErrors.twitterLink.message)
        }
      />
      <TextInput
        {...register("discordLink")}
        label={t("discord-url")}
        isError={Boolean(formErrors.discordLink)}
        placeholder="https://"
        helperText={
          formErrors.discordLink?.message && t(formErrors.discordLink.message)
        }
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
            {t("create-contract")}
          </IconButton>
        ) : (
          <ConnectButton label={t("connect-wallet") ?? ""} />
        )}
      </div>
    </form>
  );
};
