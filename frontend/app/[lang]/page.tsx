import { redirect } from "next/navigation";

import { InternationalizedPageProps } from "@/infrastructure/internationalization/types";

const MainPage = async (props: InternationalizedPageProps) => {
  const {
    params: { lang },
  } = props;

  redirect(`/${lang}/panel`);
};

export default MainPage;
