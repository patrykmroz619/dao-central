import { Loader, LogOut } from "react-feather";

import { useLogout } from "modules/auth/hooks/useLogout";

import styles from "./LogoutButton.module.scss";

export const LogoutButton = () => {
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
      <span className={styles.button__label}>Logout</span>
    </button>
  );
};
