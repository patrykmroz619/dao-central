import { ComponentPropsWithoutRef } from "react";

import { Spinner } from "../../core";
import { FadeAnimationContainer } from "../../core/client";

import styles from "./LoadingView.module.scss";

type LoadingViewProps = ComponentPropsWithoutRef<"div">;

export const LoadingView = (props: LoadingViewProps) => {
  const { className, ...restProps } = props;

  return (
    <FadeAnimationContainer>
      <div className={`${styles.wrapper} ${className || ""}`} {...restProps}>
        <Spinner size={60} />
      </div>
    </FadeAnimationContainer>
  );
};
