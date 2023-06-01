"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps, MotionProps } from "framer-motion";
import { Loader } from "react-feather";
import classNames from "classnames";

import styles from "./Button.module.scss";

const animationProps: MotionProps = {
  whileTap: {
    scale: 0.95,
  },
};

export type ButtonProps = HTMLMotionProps<"button"> & {
  isLoading?: boolean;
  children: ReactNode;
};

export function Button(props: ButtonProps) {
  const { className, isLoading, disabled, children, ...rest } = props;

  const isDisabled = isLoading || disabled;

  const classes = classNames(className, styles.button, {
    [styles.button_loading]: isLoading,
  });

  return (
    <motion.button
      className={classes}
      disabled={isDisabled}
      {...animationProps}
      {...rest}
    >
      {!isLoading ? children : <Loader className={styles.spinner} />}
    </motion.button>
  );
}
