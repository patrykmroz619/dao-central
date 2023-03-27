import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAccount, useSignMessage } from "wagmi";

import { useAsyncState } from "modules/common/hooks/useAsyncState";
import { getErrorMessage } from "modules/common/utils/getErrorMessage";
import { useAuthService } from "./useAuthService";

export const useLoginByWallet = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const authService = useAuthService();

  const { state: loginState, setLoading, setError } = useAsyncState();

  const handleLoginByWallet = async () => {
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

  return {
    handleLoginByWallet,
    loginState,
  };
};
