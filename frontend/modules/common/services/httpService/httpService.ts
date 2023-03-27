import qs from "qs";

import { HTTP_METHOD } from "../../constants/httpMethod";
import { HttpError } from "./httpError";

type ResponseWithData<DataType> = Response & { data: DataType };

type RequestConfig = {
  bearerToken?: string;
  params?: object;
  headers?: Record<string, string>;
};

export class HttpService {
  constructor(private baseUrl: string) {}

  public get<DataType extends object>(
    endpoint: string,
    config?: RequestConfig
  ) {
    return this.httpCall<DataType>(
      this.combineUrl(this.baseUrl, endpoint, config?.params),
      this.parseRequestConfig(HTTP_METHOD.GET, undefined, config)
    );
  }

  public post<DataType extends object>(
    endpoint: string,
    data: unknown,
    config?: RequestConfig
  ) {
    return this.httpCall<DataType>(
      this.combineUrl(this.baseUrl, endpoint, config?.params),
      this.parseRequestConfig(HTTP_METHOD.POST, data, config)
    );
  }

  public put<DataType extends object>(
    endpoint: string,
    data: unknown,
    config?: RequestConfig
  ) {
    return this.httpCall<DataType>(
      this.combineUrl(this.baseUrl, endpoint, config?.params),
      this.parseRequestConfig(HTTP_METHOD.PUT, data, config)
    );
  }

  public patch<DataType extends object>(
    endpoint: string,
    data: unknown,
    config?: RequestConfig
  ) {
    return this.httpCall<DataType>(
      this.combineUrl(this.baseUrl, endpoint, config?.params),
      this.parseRequestConfig(HTTP_METHOD.PATCH, data, config)
    );
  }

  public delete<DataType extends object>(
    endpoint: string,
    data: unknown,
    config?: RequestConfig
  ) {
    return this.httpCall<DataType>(
      this.combineUrl(this.baseUrl, endpoint, config?.params),
      this.parseRequestConfig(HTTP_METHOD.DELETE, data, config)
    );
  }

  private async httpCall<DataType extends object>(
    url: string,
    config: RequestInit
  ): Promise<ResponseWithData<DataType>> {
    const fetchConfig: RequestInit = {
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    };

    const response = await fetch(url, fetchConfig);

    let data = undefined;

    try {
      data = await response.json();
    } catch {}

    if (response.ok) {
      return { ...response, data };
    } else {
      throw new HttpError(response.statusText, response.status, data);
    }
  }

  private parseRequestConfig(
    method: HTTP_METHOD,
    data: unknown,
    config?: RequestConfig
  ): RequestInit {
    const headers = { ...config?.headers };

    if (config?.bearerToken) {
      headers.Authorization = `Bearer ${config.bearerToken}`;
    }

    return {
      headers,
      method,
      body: data ? JSON.stringify(data) : undefined,
    };
  }

  private combineUrl(baseUrl: string, endpoint: string, params?: object) {
    let url = baseUrl;

    if (endpoint.startsWith("/")) {
      url += endpoint;
    } else {
      url += "/" + endpoint;
    }

    if (params) {
      const queryString = qs.stringify(params);
      url += "?" + queryString;
    }

    return url;
  }
}
