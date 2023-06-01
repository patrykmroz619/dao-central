"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";

type FadeAnimationContainerProps = {
  children: ReactNode;
};

export const FadeAnimationContainer = (props: FadeAnimationContainerProps) => {
  const { children } = props;

  return <motion.div {...animationProps}>{children}</motion.div>;
};

const animationProps: MotionProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};
