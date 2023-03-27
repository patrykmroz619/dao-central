import { useState } from "react";
import { toast } from "react-toastify";
import { signOut, useSession } from "next-auth/react";

import { getErrorMessage } from "modules/common/utils/getErrorMessage";
import { useAuthService } from "./useAuthService";

export const useLogout = () => {
  const { data: session } = useSession();
  const authService = useAuthService();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (session) {
      try {
        setLoading(true);
        await authService.logout(session.accessToken);
        await signOut({
          callbackUrl: "/login",
        });
      } catch (error: unknown) {
        setLoading(false);
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
    }
  };

  return { handleLogout, loading };
};
