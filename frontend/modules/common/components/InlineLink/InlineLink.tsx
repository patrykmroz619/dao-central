import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { Link2 } from "react-feather";

import styles from "./InlineLink.module.scss";

type InlineLinkProps = ComponentPropsWithoutRef<"a"> & {
  external?: boolean;
  href: string;
};

export const InlineLink = (props: InlineLinkProps) => {
  const { children, href, external, className, ...rest } = props;

  const finalClass = `${styles.link} ${className || ""}`;

  const content = (
    <>
      <span>{children}</span>
      <span>
        <Link2 />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        {...rest}
        href={href}
        className={finalClass}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    );
  }

  return (
    <Link {...rest} href={href} className={finalClass}>
      {content}
    </Link>
  );
};
