import { Controller } from "react-hook-form";

import { Button } from "modules/common/components/Button";
import { TextInput } from "modules/common/components/Input/TextInput";
import { TextEditor } from "modules/common/components/TextEditor";
import { InfoBox, INFO_BOX_VARIANT } from "modules/common/components/InfoBox";
import { ASYNC_STATE } from "modules/common/hooks/useAsyncState";

import { useUpdateDaoDetailsHandler } from "./useUpdateDaoDetailsHandler";

import styles from "./UpdateDaoDetailsForm.module.scss";

export const UpdateDaoDetailsForm = () => {
  const { register, control, handleSubmit, updatingState } =
    useUpdateDaoDetailsHandler();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
      <TextInput {...register("websiteLink")} label="Website URL" />
      <TextInput {...register("facebookLink")} label="Facebook" />
      <TextInput {...register("twitterLink")} label="Twitter" />
      <TextInput {...register("discordLink")} label="Discord" />
      {updatingState.state === ASYNC_STATE.SUCCESS ? (
        <InfoBox variant={INFO_BOX_VARIANT.SUCCESS}>
          The details have been updated updated
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
        Update details
      </Button>
    </form>
  );
};
