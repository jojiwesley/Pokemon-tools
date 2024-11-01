import axios, { AxiosResponse, type AxiosRequestConfig } from "axios";

// Define a type for the configuration
interface RequesterConfig extends AxiosRequestConfig {
  baseURL: string;
  options?: AxiosRequestConfig;
}

// Define a type for the response data if you have a common structure
type ResponseData = {
  // Define the structure of your response data here
  // For example:
  // id: number;
   url: string;
   data: string | null;
  // [key: string]: any; // For dynamic keys, you can use this
};
export const requester = (config: RequesterConfig, contentType?: string) => {
  const service = axios.create({
    baseURL: config.baseURL,
    ...config.options,
  });

  service.interceptors.request.use(
    (req) => {
      req.headers = {
        "Content-Type": contentType || "application/json",
        "Access-Control-Allow-Origin": "*",
        ...config,
      };

      return req;
    },
    (error) => Promise.reject(error)
  );

  return {
    async get<T = ResponseData>(uri: string): Promise<AxiosResponse<T>> {
      const response = await service.get<T>(uri);
      return response;
    },
    async post<T = ResponseData>(uri: string, data: T): Promise<AxiosResponse<T>> {
      const response = await service.post<T>(uri, data);
      return response;
    },
    async put<T = ResponseData>(uri: string, data: T): Promise<AxiosResponse<T>> {
      const response = await service.put<T>(uri, data);
      return response;
    },
    async patch<T = ResponseData>(uri: string, data: T): Promise<AxiosResponse<T>> {
      const response = await service.patch<T>(uri, data);
      return response;
    },
    async delete<T = ResponseData>(uri: string, data: T): Promise<AxiosResponse<T>> {
      const response = await service.delete<T>(uri, {data});
      return response;
    },
  };
};