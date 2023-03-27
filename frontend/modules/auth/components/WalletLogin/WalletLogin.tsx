"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LogIn } from "react-feather";

import { useIsBrowser } from "modules/common/hooks/useIsBrowser";
import { Text } from "modules/common/components/Typography";
import { IconButton } from "modules/common/components/IconButton";

import styles from "./WalletLogin.module.scss";
import { useLoginByWallet } from "modules/auth/hooks/useLoginByWallet";

export const WalletLogin = () => {
  const { address } = useAccount();
  const isBrowser = useIsBrowser();

  const { loginState, handleLoginByWallet } = useLoginByWallet();

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
            <IconButton
              Icon={LogIn}
              onClick={handleLoginByWallet}
              isLoading={loginState.state === "LOADING"}
              data-cy="sign-message"
            >
              Sign message to log in
            </IconButton>
          )}
          {loginState.state == "ERROR" && (
            <Text danger>{loginState.error}</Text>
          )}
        </>
      )}
    </div>
  );
};
