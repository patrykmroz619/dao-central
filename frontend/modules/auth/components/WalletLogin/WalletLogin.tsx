"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAccount, useSignMessage } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LogIn } from "react-feather";

import { getErrorMessage } from "modules/common/utils/getErrorMessage";
import { useIsBrowser } from "modules/common/hooks/useIsBrowser";
import { useAsyncState } from "modules/common/hooks/useAsyncState";
import { Text } from "modules/common/components/Typography";
import { IconButton } from "modules/common/components/IconButton";
import { useAuthService } from "modules/auth/hooks/useAuthService";

import styles from "./WalletLogin.module.scss";

export const WalletLogin = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const isBrowser = useIsBrowser();

  const router = useRouter();
  const authService = useAuthService();

  const { state: loginState, setLoading, setError } = useAsyncState();

  const handleLogin = async () => {
    setLoading();

    try {
      if (!address) {
        throw new Error("Wallet is not connected");
      }

      const message = await authService.getMessageToSignToLoginByWallet(
        address
      );

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
