"use client";

import { Plus } from "react-feather";

import { IconButton } from "shared/components/IconButton";
import { TextInput } from "shared/components/Input/TextInput";
import styles from "./NewDaoForm.module.scss";
import { useCreateDao } from "./useCreateDao";

export const NewDaoForm = () => {
  const { register, formErrors, handleCreateDaoSubmit } = useCreateDao();

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
      <IconButton className={styles.form__button} Icon={Plus} type="submit">
        Create contract
      </IconButton>
    </form>
  );
};
