import { InfoBox, INFO_BOX_VARIANT } from "modules/common/components/InfoBox";
import { Text } from "modules/common/components/Typography";

import styles from "./ErrorState.module.scss";

type ErrorStateProps = {
  error: string;
};

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <InfoBox variant={INFO_BOX_VARIANT.DANGER} className={styles.box}>
      <div className={styles.box__content}>
        <Text bold center>
          Error while deploying.
        </Text>
        <Text center>{error}</Text>
      </div>
    </InfoBox>
  );
};
