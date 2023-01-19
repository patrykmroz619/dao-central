import { Icon, Loader } from "react-feather";
import classNames from "classnames";

import { Button, ButtonProps } from "../Button";
import styles from "./IconButton.module.scss";

type IconButtonProps = {
  Icon: Icon;
} & ButtonProps;

export function IconButton(props: IconButtonProps) {
  const { Icon, isLoading, className, disabled, children, ...rest } = props;

  const isDisabled = isLoading || disabled;

  const classes = classNames(className, styles.button, {
    [styles.button_loading]: isLoading,
  });

  return (
    <Button disabled={isDisabled} className={classes} {...rest}>
      {children ? (
        <span className={styles.contentWrapper}>{children}</span>
      ) : undefined}

      <span className={styles.iconWrapper}>
        {isLoading ? <Loader /> : <Icon />}
      </span>
    </Button>
  );
}
