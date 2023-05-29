import { SessionUser } from "modules/auth/types/next-auth";
import { BlockchainExplorerLink } from "modules/blockchain/components/BlockchainExplorerLink";
import { Text } from "modules/common/components/Typography";
import { InternationalizedProps } from "modules/internationalization/types";
import { useServerTranslation } from "modules/internationalization/useTranslation/server";

import styles from "./ProfileData.module.scss";

type ProfileDataProps = {
  user: SessionUser;
} & InternationalizedProps;

export const ProfileData = async (props: ProfileDataProps) => {
  const { user, lang } = props;

  const { t } = await useServerTranslation(lang, "profile");

  return (
    <div className={styles.wrapper}>
      <Text>
        <strong className={styles.label}>{t("wallet-address")}: </strong>
        <BlockchainExplorerLink chainId={1} address={user.wallet} />
      </Text>
      <Text>
        <strong className={styles.label}>{t("account-id")}: </strong>
        {user.id}
      </Text>
    </div>
  );
};
