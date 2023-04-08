import { ComponentPropsWithoutRef } from "react";

import { Spinner } from "../Spinner";
import { Text } from "../Typography";
import { FadeAnimationContainer } from "../FadeAnimationContainer";

import styles from "./LoadingView.module.scss";

type LoadingViewProps = ComponentPropsWithoutRef<"div">;

export const LoadingView = (props: LoadingViewProps) => {
  const { className, ...restProps } = props;

  return (
    <FadeAnimationContainer>
      <div className={`${styles.wrapper} ${className || ""}`} {...restProps}>
        <Spinner size={60} />
        <Text className={styles.text}>
          Loading<span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
        </Text>
      </div>
    </FadeAnimationContainer>
  );
};
