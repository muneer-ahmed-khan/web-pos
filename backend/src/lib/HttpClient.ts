import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config/index";

class HttpClient {
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: config.giftLovUrls.BaseUrl,
    });
  }
  public async get({
    url,
    ...config
  }: AxiosRequestConfig): Promise<AxiosResponse> {
    return (await this.axios.get(url, config)).data;
  }

  public async post({
    url,
    data,
    ...config
  }: AxiosRequestConfig): Promise<AxiosResponse> {
    return (await this.axios.post(url, data, config)).data;
  }

  public async put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.axios.put(url, data, config);
  }

  public async delete(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.axios.delete(url, config);
  }
}

export default new HttpClient();
