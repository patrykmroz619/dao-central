import Image from "next/image";

import logo from "public/images/brand/logo-black.png";
import { Text } from "modules/common/components/Typography";
import { HamburgerButton } from "./HamburgerButton";
import styles from "./MobileHeader.module.scss";

export const MobileHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__brand}>
        <Image src={logo} width="32" height="32" alt="DAO Central logo" />
        <Text>DAO Central</Text>
      </div>
      <HamburgerButton />
    </header>
  );
};
