"use client";

import { HTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

type NavLinkProps = {
  activeClassName: string;
} & LinkProps &
  HTMLAttributes<HTMLAnchorElement>;

export const NavLink = (props: NavLinkProps) => {
  const { activeClassName, className, ...rest } = props;

  const pathname = usePathname();

  const isActive = pathname === rest.href;

  const finalClass = classNames(className, { [activeClassName]: isActive });

  return <Link className={finalClass} {...rest} />;
};
