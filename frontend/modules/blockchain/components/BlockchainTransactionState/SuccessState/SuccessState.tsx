import { ReactNode } from "react";

import { InfoBox, INFO_BOX_VARIANT } from "@/infrastructure/ui/InfoBox";
import styles from "./SuccessState.module.scss";

type SuccessStateProps = {
  successHeading: ReactNode;
};

export const SuccessState = ({ successHeading }: SuccessStateProps) => {
  return (
    <InfoBox variant={INFO_BOX_VARIANT.SUCCESS} className={styles.box}>
      {successHeading}
    </InfoBox>
  );
};
