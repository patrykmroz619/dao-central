"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LogIn } from "react-feather";
import { IconButton, Text } from "components";
import styles from "./WalletLogin.module.scss";
import { useIsBrowser } from "hooks";

export function WalletLogin() {
  const { address } = useAccount();
  const isBrowser = useIsBrowser();

  return (
    <div className={styles.wrapper}>
      {isBrowser && (
        <>
          <div className={styles.walletWrapper}>
            {address && <Text>Connected wallet:</Text>}
            <ConnectButton
              label="Connect your crypto wallet"
              accountStatus="address"
              chainStatus="none"
              showBalance={false}
            />
          </div>
          {address && (
            <IconButton Icon={LogIn}>Sign message to log in</IconButton>
          )}
        </>
      )}
    </div>
  );
}
