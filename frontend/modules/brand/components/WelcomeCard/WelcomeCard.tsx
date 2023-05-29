import Image from "next/image";

import welcomeImage from "public/images/illustrations/welcome.svg";
import { Box } from "modules/common/components/Box";
import { H2 } from "modules/common/components/Typography";

import styles from "./WelcomeCard.module.scss";

type WelcomeCardProps = {
  welcomeMsg: string;
};

export const WelcomeCard = (props: WelcomeCardProps) => {
  const { welcomeMsg } = props;

  return (
    <Box className={styles.wrapper}>
      <H2 className={styles.heading}>
        {welcomeMsg}
        <br />
        <strong>DAO Central</strong>
      </H2>
      <Image
        className={styles.illustration}
        src={welcomeImage}
        alt=""
        priority
      />
    </Box>
  );
};
