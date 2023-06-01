import { InternationalizedPageProps } from "@/infrastructure/internationalization/types";
import { redirect } from "next/navigation";

const MainPage = async (props: InternationalizedPageProps) => {
  const {
    params: { lang },
  } = props;

  redirect(`/${lang}/panel`);
};

export default MainPage;
