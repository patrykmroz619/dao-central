import { InfoBox, INFO_BOX_VARIANT } from "@/infrastructure/ui/core/InfoBox";
import { Text } from "@/infrastructure/ui/core/Typography";

import styles from "./ErrorState.module.scss";

type ErrorStateProps = {
  errorHeading: string;
  error: string;
};

export const ErrorState = (props: ErrorStateProps) => {
  const { error, errorHeading } = props;

  return (
    <InfoBox variant={INFO_BOX_VARIANT.DANGER} className={styles.box}>
      <div className={styles.box__content}>
        <Text bold center>
          {errorHeading}
        </Text>
        <Text center>{error}</Text>
      </div>
    </InfoBox>
  );
};
