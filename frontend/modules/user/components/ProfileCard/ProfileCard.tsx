"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogIn, User } from "react-feather";

import {
  useCurrentLanguage,
  useClientTranslation,
} from "@/infrastructure/internationalization/client";

import { IconButton } from "@/infrastructure/ui/core/client";
import { H2, Text, Box } from "@/infrastructure/ui/core";

import { BlockchainExplorerLink } from "@/modules/blockchain/components/BlockchainExplorerLink";

import profileImage from "public/images/illustrations/profile.svg";
import styles from "./ProfileCard.module.scss";

export const ProfileCard = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const lang = useCurrentLanguage();

  const handleLoginClick = () => {
    router.push(`/${lang}/login`);
  };

  const handleProfileClick = () => {
    router.push(`/${lang}/panel/profile`);
  };

  const { t } = useClientTranslation(lang, "profile");

  return (
    <Box className={styles.box}>
      <H2>{t("profile")}</H2>
      <Image
        src={profileImage}
        alt=""
        width="260"
        className={styles.box__image}
      />
      {status === "authenticated" ? (
        <Text className={styles.box__text}>
          <strong>{t("logged-by-wallet")}: </strong>
          <BlockchainExplorerLink chainId={1} address={session.user.wallet} />
        </Text>
      ) : null}
      <div className={styles.box__footer}>
        {status === "unauthenticated" && (
          <IconButton Icon={LogIn} role="link" onClick={handleLoginClick}>
            {t("login")}
          </IconButton>
        )}
        {status === "authenticated" && (
          <IconButton Icon={User} role="link" onClick={handleProfileClick}>
            {t("profile")}
          </IconButton>
        )}
      </div>
    </Box>
  );
};
