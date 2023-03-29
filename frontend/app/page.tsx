import { getSession } from "modules/auth/utils/getSession";
import { redirect } from "next/navigation";

const MainPage = async () => {
  const session = await getSession();

  if (session.user) {
    redirect("/panel");
  } else {
    redirect("/login");
  }
};

export default MainPage;
