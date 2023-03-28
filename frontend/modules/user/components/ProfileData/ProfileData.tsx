import { SessionUser } from "modules/auth/types/next-auth";
import { BlockchainExplorerLink } from "modules/blockchain/components/BlockchainExplorerLink";
import { Text } from "modules/common/components/Typography";

import styles from "./ProfileData.module.scss";

type ProfileDataProps = {
  user: SessionUser;
};

export const ProfileData = (props: ProfileDataProps) => {
  const { user } = props;

  return (
    <div className={styles.wrapper}>
      <Text>
        <strong className={styles.label}>Wallet address: </strong>
        <BlockchainExplorerLink chainId={1} address={user.wallet} />
      </Text>
      <Text>
        <strong className={styles.label}>Account id: </strong>
        {user.id}
      </Text>
    </div>
  );
};
