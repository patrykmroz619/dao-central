import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

export const getSession = () => unstable_getServerSession(authOptions);
