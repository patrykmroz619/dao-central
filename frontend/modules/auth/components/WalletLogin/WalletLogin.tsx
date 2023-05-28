"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LogIn } from "react-feather";

import { useIsBrowser } from "modules/common/hooks/useIsBrowser";
import { Text } from "modules/common/components/Typography";
import { IconButton } from "modules/common/components/IconButton";

import styles from "./WalletLogin.module.scss";
import { useLoginByWallet } from "modules/auth/hooks/useLoginByWallet";
import { InternationalizedProps } from "modules/internationalization/types";
import { useClientTranslation } from "modules/internationalization/useTranslation/client";

export const WalletLogin = (props: InternationalizedProps) => {
  const { t } = useClientTranslation(props.lang, "login-page");

  const { address } = useAccount();
  const isBrowser = useIsBrowser();

  const { loginState, handleLoginByWallet } = useLoginByWallet();

  return (
    <div className={styles.wrapper}>
      {isBrowser && (
        <>
          <div className={styles.walletWrapper}>
            {address && <Text>{t("connected-wallet")}:</Text>}
            <ConnectButton
              label={t("connect-crypto-wallet") ?? undefined}
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
              {t("sign-message-to-log-in")}
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
