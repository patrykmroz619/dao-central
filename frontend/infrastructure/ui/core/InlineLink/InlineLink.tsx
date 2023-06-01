"use client";

import { ComponentPropsWithoutRef, MouseEventHandler } from "react";
import Link from "next/link";
import { Link2 } from "react-feather";

import styles from "./InlineLink.module.scss";

type InlineLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  external?: boolean;
  stopClickEventPropagation?: boolean;
};

export const InlineLink = (props: InlineLinkProps) => {
  const {
    children,
    href,
    external,
    stopClickEventPropagation,
    className,
    onClick,
    ...rest
  } = props;

  const finalClass = `${styles.link} ${className || ""}`;

  const content = (
    <>
      <span>{children}</span>
      <span>
        <Link2 />
      </span>
    </>
  );

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (stopClickEventPropagation) {
      event.stopPropagation();
    }

    if (onClick) {
      onClick(event);
    }
  };

  if (external) {
    return (
      <a
        {...rest}
        href={href}
        className={finalClass}
        target="_blank"
        rel="noreferrer noopener"
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link {...rest} href={href} className={finalClass} onClick={handleClick}>
      {content}
    </Link>
  );
};
