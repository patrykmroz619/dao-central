export const externalApi = (endpoint: string) => {
  let url = String(process.env.NEXT_PUBLIC_API_URL);

  if (endpoint.startsWith("/")) {
    url += endpoint;
  } else {
    url += "/" + endpoint;
  }

  return url;
};
