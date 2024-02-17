import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config/index";

class HttpClient {
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: config.giftLovUrls.BaseUrl,
    });
  }
  public async get(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.axios.get(url, config);
  }

  public async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    // console.log("check bro problem ", url, data, config);

    return this.axios.post(url, data, config);
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
