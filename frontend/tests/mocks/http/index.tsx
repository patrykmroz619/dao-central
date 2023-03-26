import { RegisterHttpClientMocks } from "./components/RegisterHttpClientMock";
import { RegisterHttpServerMocks } from "./components/RegisterHttpServerMocks";

export const RegisterHttpMocks = () => {
  return (
    <>
      <RegisterHttpServerMocks />
      <RegisterHttpClientMocks />
    </>
  );
};
