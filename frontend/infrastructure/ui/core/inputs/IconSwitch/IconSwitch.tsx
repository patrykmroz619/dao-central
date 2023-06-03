"use client";

import classNames from "classnames";
import { ComponentProps, ReactNode } from "react";
import { motion } from "framer-motion";

import styles from "./IconSwitch.module.scss";

type IconSwitchProps = {
  id: string;
  checkedIcon: ReactNode;
  uncheckedIcon?: ReactNode;
} & ComponentProps<"input">;

export const IconSwitch = (props: IconSwitchProps) => {
  const { id, checkedIcon, uncheckedIcon, className, checked, ...restProps } =
    props;

  return (
    <div className={classNames(styles.wrapper, className)} tabIndex={0}>
      <input id={id} type="checkbox" className={styles.input} {...restProps} />
      <label htmlFor={id} className={styles.label}>
        <motion.div
          className={styles.indicator}
          layout
          animate={checked ? { left: 0 } : { right: 0 }}
        />
        <div
          className={classNames(styles.icon, {
            [styles.icon__checked]: checked,
          })}
        >
          {checkedIcon}
        </div>
        <div
          className={classNames(styles.icon, {
            [styles.icon__checked]: !checked,
          })}
        >
          {uncheckedIcon}
        </div>
      </label>
    </div>
  );
};
