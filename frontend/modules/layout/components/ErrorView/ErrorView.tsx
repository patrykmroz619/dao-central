import { ReactNode } from "react";
import Image from "next/image";

import { Text } from "modules/common/components/Typography";
import errorIllustration from "public/images/illustrations/error.svg";

import styles from "./ErrorView.module.scss";

type ErrorViewProps = {
  children: ReactNode;
};

export const ErrorView = (props: ErrorViewProps) => {
  const { children } = props;

  return (
    <div className={styles.wrapper}>
      <Image src={errorIllustration} alt="" width={280} />
      <Text className={styles.wrapper__text} center>
        {children}
      </Text>
    </div>
  );
};
