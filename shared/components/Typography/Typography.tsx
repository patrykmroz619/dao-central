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

type TextProps = ComponentPropsWithoutRef<"p"> & {
  danger?: boolean;
};

export function Text(props: TextProps) {
  const { className, danger, ...rest } = props;

  const finalClass = classNames(styles.text, className, {
    [styles.textDanger]: danger,
  });

  return <p className={finalClass} {...rest}></p>;
}
