"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogIn, User } from "react-feather";

import profileImage from "public/images/illustrations/profile.svg";
import { Box } from "modules/common/components/Box";
import { IconButton } from "modules/common/components/IconButton";
import { H2, Text } from "modules/common/components/Typography";
import { BlockchainExplorerLink } from "modules/blockchain/components/BlockchainExplorerLink";

import styles from "./ProfileCard.module.scss";

export const ProfileCard = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleProfileClick = () => {
    router.push("/panel/profile");
  };

  return (
    <Box className={styles.box}>
      <H2>Profile</H2>
      <Image
        src={profileImage}
        alt=""
        width="260"
        className={styles.box__image}
      />
      {status === "authenticated" ? (
        <Text className={styles.box__text}>
          <strong>Logged by wallet: </strong>
          <BlockchainExplorerLink chainId={1} address={session.user.wallet} />
        </Text>
      ) : null}
      <div className={styles.box__footer}>
        {status === "unauthenticated" && (
          <IconButton Icon={LogIn} role="link" onClick={handleLoginClick}>
            Login
          </IconButton>
        )}
        {status === "authenticated" && (
          <IconButton Icon={User} role="link" onClick={handleProfileClick}>
            Profile
          </IconButton>
        )}
      </div>
    </Box>
  );
};
