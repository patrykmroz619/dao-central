import { InfoBox, INFO_BOX_VARIANT } from "modules/common/components/InfoBox";

import styles from "./SuccessState.module.scss";

export const SuccessState = () => {
  return (
    <InfoBox variant={INFO_BOX_VARIANT.SUCCESS} className={styles.box}>
      Your DAO contract has been deployed successfully!
    </InfoBox>
  );
};
