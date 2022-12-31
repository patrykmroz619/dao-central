import { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";
import styles from "./Typography.module.scss";

type H1Props = ComponentPropsWithoutRef<"h1">;

export function H1(props: H1Props) {
  const { className, ...rest } = props;

  return <h1 className={classNames(styles.h1, className)} {...rest}></h1>;
}

type H2Props = ComponentPropsWithoutRef<"h2">;

export function H2(props: H2Props) {
  const { className, ...rest } = props;

  return <h2 className={classNames(styles.h2, className)} {...rest}></h2>;
}

type TextProps = ComponentPropsWithoutRef<"p">;

export function Text(props: TextProps) {
  const { className, ...rest } = props;

  return <p className={classNames(styles.text, className)} {...rest}></p>;
}
