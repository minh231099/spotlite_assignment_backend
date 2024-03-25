import axios, { AxiosResponse } from 'axios';

const baseUrl = process.env.API_URL;

interface apiCallParamsInterface {
  endPoint: string;
  method: string;
  payload?: any;
  params?: any;
  headers: any;
  timeout?: number;
  keepAlive?: boolean;
  callTo?: string;
}

const apiCall = async (apiCallParams: apiCallParamsInterface): Promise<any> => {
  const { method, endPoint, payload, headers, params } = apiCallParams;
  try {
    const axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 60000,
      headers,
      params,
    });

    const response: AxiosResponse<any> = await axiosInstance({
      method,
      url: endPoint,
      data: payload,
    });
    return {
      response: response,
      error: null
    }
  } catch (error) {
    return {
      response: null,
      error: error
    }
  }
};

export default apiCall;
