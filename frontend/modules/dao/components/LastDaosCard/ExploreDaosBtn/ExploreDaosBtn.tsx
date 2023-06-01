"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Archive } from "react-feather";

import { IconButton } from "@/infrastructure/ui/IconButton";

type ExploreDaosBtnProps = {
  children: ReactNode;
};

export const ExploreDaosBtn = (props: ExploreDaosBtnProps) => {
  const { children } = props;

  const router = useRouter();

  const handleClick = () => {
    router.push("/panel/daos");
  };

  return (
    <IconButton Icon={Archive} role="link" onClick={handleClick}>
      {children}
    </IconButton>
  );
};
