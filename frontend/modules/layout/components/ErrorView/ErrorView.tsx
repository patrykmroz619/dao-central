import Image from "next/image";

import { Text } from "modules/common/components/Typography";
import errorIllustration from "public/images/illustrations/error.svg";

import styles from "./ErrorView.module.scss";

export const ErrorView = () => {
  return (
    <div className={styles.wrapper}>
      <Image src={errorIllustration} alt="" width={280} />
      <Text className={styles.wrapper__text} center>
        Error has occurred while loading page. Please try again later!
      </Text>
    </div>
  );
};
