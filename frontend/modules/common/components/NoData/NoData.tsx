import { ComponentPropsWithoutRef, ReactNode } from "react";
import Image from "next/image";
import classNames from "classnames";

import noDataIllustration from "public/images/illustrations/no-data.svg";
import { Text } from "../Typography";

import styles from "./NoData.module.scss";

type NoDataProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export const NoData = (props: NoDataProps) => {
  const { className, children, ...restProps } = props;

  const finalClass = classNames(styles.noDataWrapper, className);

  return (
    <div className={finalClass} {...restProps}>
      <Image src={noDataIllustration} alt="" width={220} />
      <Text>{children}</Text>
    </div>
  );
};
