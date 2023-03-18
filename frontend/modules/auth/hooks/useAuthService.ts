import { useRef } from "react";
import { AuthService } from "../services/authService";

export const useAuthService = () => {
  const authServiceRef = useRef(new AuthService());

  return authServiceRef.current;
};
