import { DefaultPageWrapper } from "shared/components/DefaultPageWrapper";
import { WelcomeCard } from "./components/page";

export default async function Panel() {
  return (
    <DefaultPageWrapper>
      <WelcomeCard />
    </DefaultPageWrapper>
  );
}
