import { Controller } from "react-hook-form";

import { Button } from "modules/common/components/Button";
import { TextInput } from "modules/common/components/Input/TextInput";
import { TextEditor } from "modules/common/components/TextEditor";
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
      <Button
        isLoading={updatingState.state === ASYNC_STATE.LOADING}
        type="submit"
      >
        Update details
      </Button>
    </form>
  );
};
