"use client";

import { useRouter } from "next/navigation";
import { Archive } from "react-feather";

import { IconButton } from "shared/components/IconButton";

export const ExploreDaosBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/daos");
  };

  return (
    <IconButton Icon={Archive} role="link" onClick={handleClick}>
      Explore DAOs
    </IconButton>
  );
};
