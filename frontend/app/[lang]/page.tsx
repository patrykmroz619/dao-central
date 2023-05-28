import { getSession } from "modules/auth/utils/getSession";
import { InternationalizedPageProps } from "modules/internationalization/types";
import { redirect } from "next/navigation";

const MainPage = async (props: InternationalizedPageProps) => {
  const {
    params: { lang },
  } = props;

  const session = await getSession();

  if (session.user) {
    redirect(`/${lang}/panel`);
  } else {
    redirect(`/${lang}/login`);
  }
};

export default MainPage;
