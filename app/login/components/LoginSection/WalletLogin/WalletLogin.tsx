"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAccount, useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LogIn } from "react-feather";

import { IconButton, Text } from "shared/components";
import { useAsyncState, useIsBrowser } from "shared/hooks";
import { restAPI } from "shared/api";
import { getErrorMessage } from "shared/utils/getErrorMessage";
import styles from "./WalletLogin.module.scss";

export const WalletLogin = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const isBrowser = useIsBrowser();

  const router = useRouter();

  const { state: loginState, setLoading, setError } = useAsyncState();

  const handleLogin = async () => {
    setLoading();

    try {
      if (!address) {
        throw new Error("Wallet is not connected");
      }

      const {
        data: { message },
      } = await restAPI.auth.login.getMessageToSign(address);

      const signature = await signMessageAsync({
        message,
      });

      const sigInResponse = await signIn("credentials", {
        redirect: false,
        walletAddress: address,
        signature,
      });

      if (sigInResponse?.ok) {
        router.push("/panel");
      }
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e);
      setError(errorMessage);
    }
  };

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
              onClick={handleLogin}
              isLoading={loginState.state === "LOADING"}
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
