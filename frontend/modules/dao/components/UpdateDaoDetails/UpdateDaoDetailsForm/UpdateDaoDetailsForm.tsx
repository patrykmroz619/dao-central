import { Controller } from "react-hook-form";

import { InternationalizedProps } from "@/infrastructure/internationalization/types";
import { useClientTranslation } from "@/infrastructure/internationalization/client";
import { Button } from "@/infrastructure/ui/core/buttons/Button";
import { TextInput } from "@/infrastructure/ui/core/inputs/TextInput";
import { TextEditor } from "@/infrastructure/ui/core/inputs/TextEditor";
import { InfoBox, INFO_BOX_VARIANT } from "@/infrastructure/ui/core/InfoBox";
import { ASYNC_STATE } from "@/infrastructure/helpers/hooks/useAsyncState";

import { useUpdateDaoDetailsHandler } from "./useUpdateDaoDetailsHandler";

import styles from "./UpdateDaoDetailsForm.module.scss";

export const UpdateDaoDetailsForm = (props: InternationalizedProps) => {
  const { lang } = props;

  const { t } = useClientTranslation(lang, "dao", "dao-details");

  const { register, control, handleSubmit, updatingState, formErrors } =
    useUpdateDaoDetailsHandler();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
      {updatingState.state === ASYNC_STATE.SUCCESS ? (
        <InfoBox variant={INFO_BOX_VARIANT.SUCCESS}>
          {t("details-updated")}
        </InfoBox>
      ) : null}
      {updatingState.state === ASYNC_STATE.ERROR ? (
        <InfoBox variant={INFO_BOX_VARIANT.DANGER}>
          {updatingState.error}
        </InfoBox>
      ) : null}
      <Button
        isLoading={updatingState.state === ASYNC_STATE.LOADING}
        type="submit"
      >
        {t("update-details")}
      </Button>
    </form>
  );
};
