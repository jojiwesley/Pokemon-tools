import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
interface BaseConfig {
   baseURL: string;
   options?: AxiosRequestConfig;
}

type ContentType = 'application/json' | 'multipart/form-data' | string;
type Data = Record<string, unknown>;

export const requester = (config: BaseConfig, contentType?: ContentType) => {
   // Criação da instância do Axios
   const service = axios.create({
      baseURL: config.baseURL,
      ...config.options,
   });

   // Interceptador de Requisição
   service.interceptors.request.use(
      (req) => {
         req.headers = new AxiosHeaders({
            'Content-Type': contentType || 'application/json',
            'Access-Control-Allow-Origin': '*',
         });

         return req;
      },
      (error) => Promise.reject(error)
   );

   // Métodos de Requisição
   return {
      // Método GET
      async get<T = unknown>(uri: string): Promise<AxiosResponse<T>> {
         try {
            const response = await service.get<T>(uri);
            return response;
         } catch (error) {
            console.error('Erro na requisição GET:', error);
            throw error;
         }
      },

      // Método POST
      async post<T = unknown>(
         uri: string,
         data: Data
      ): Promise<AxiosResponse<T>> {
         try {
            const response = await service.post<T>(uri, data);
            return response;
         } catch (error) {
            console.error('Erro na requisição POST:', error);
            throw error;
         }
      },

      // Método PUT
      async put<T = unknown>(
         uri: string,
         data: Data
      ): Promise<AxiosResponse<T>> {
         try {
            const response = await service.put<T>(uri, data);
            return response;
         } catch (error) {
            console.error('Erro na requisição PUT:', error);
            throw error;
         }
      },

      // Método PATCH
      async patch<T = unknown>(
         uri: string,
         data: Data
      ): Promise<AxiosResponse<T>> {
         try {
            const response = await service.patch<T>(uri, data);
            return response;
         } catch (error) {
            console.error('Erro na requisição PATCH:', error);
            throw error;
         }
      },

      // Método DELETE
      async delete<T = unknown>(
         uri: string,
         data?: Data
      ): Promise<AxiosResponse<T>> {
         try {
            const response = await service.delete<T>(uri, { data });
            return response;
         } catch (error) {
            console.error('Erro na requisição DELETE:', error);
            throw error;
         }
      },
   };
};
