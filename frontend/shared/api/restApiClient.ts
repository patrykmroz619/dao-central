type ResponseWithData<DataType> = Response & { data: DataType };

export const restApiClient = async <DataType extends object>(
  endpoint: string,
  config: RequestInit
): Promise<ResponseWithData<DataType>> => {
  const fetchConfig: RequestInit = {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
    fetchConfig
  );

  const data = await response.json();

  if (response.ok) {
    return { ...response, data };
  } else throw data;
};
