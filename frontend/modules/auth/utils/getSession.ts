import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "pages/api/auth/[...nextauth]";

export const getSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return session;
};
