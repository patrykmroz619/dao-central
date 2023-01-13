import { Plus } from "react-feather";

import { IconButton } from "shared/components/IconButton";
import { TextInput } from "shared/components/Input/TextInput";
import styles from "./NewDaoForm.module.scss";

export const NewDaoForm = () => {
  return (
    <form className={styles.form}>
      <TextInput label="Organization Name" placeholder="My organization" />
      <TextInput label="NFT address" placeholder="0x..." />
      <IconButton className={styles.form__button} Icon={Plus}>
        Create contract
      </IconButton>
    </form>
  );
};
