import { ReactNode } from "react";
import { Loader, LogOut } from "react-feather";

import { useLogout } from "modules/auth/hooks/useLogout";

import styles from "./LogoutButton.module.scss";

type LogoutButtonProps = {
  children: ReactNode;
};

export const LogoutButton = (props: LogoutButtonProps) => {
  const { children } = props;

  const { handleLogout, loading: logoutLoading } = useLogout();

  return (
    <button
      className={styles.button}
      onClick={handleLogout}
      disabled={logoutLoading}
    >
      {logoutLoading ? (
        <Loader className={styles.button__loadingIcon} />
      ) : (
        <LogOut />
      )}
      <span className={styles.button__label}>{children}</span>
    </button>
  );
};
