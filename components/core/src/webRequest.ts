import axios, { AxiosError, AxiosRequestConfig, Method ,AxiosRequestHeaders} from "axios";
import { IResult } from "./IResult";
const sleep = (ms: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), ms);
    });
  };
export const webRequest = <T>(
    token: string | null,
    method: Method,
    url: string,
    data?: any,
    contentType?: string,
    additionalAxiosConfig?: AxiosRequestConfig
  ): Promise<IResult<T>> => {
    return new Promise((resolve, reject) => {
      var headers : AxiosRequestHeaders = {
        "Content-Type": contentType ? contentType : "application/json",
        Prefer: "HonorNonIndexedQueriesWarningMayFailRandomly",
      };
      if (token) { 
        headers.Authorization = `Bearer ${token}`;
      }
  
      var config: AxiosRequestConfig = {
        method,
        data,
        url,
        headers,
        ...additionalAxiosConfig,
      };
      //logVerbose("https",method,url)
      const send = (retryNumber: number) => {
        axios(config)
          .then(function (response) {
            
            var data = response.data;
  
            resolve({ hasError: false, data });
          })
          .catch(async (error: AxiosError) => {
            if (
              error?.response?.status === 404 ||
              error?.response?.status === 401
            ) {
              resolve({
                hasError: true,
                errorMessage:
                  error.message + "|" + error?.response?.data?.error?.message,
              });
              return;
            }
            if (retryNumber < 3) {
              await sleep(1000 * (retryNumber + 1));
              send(retryNumber + 1);
            } else {
              resolve({
                hasError: true,
                errorMessage:
                  error.message + "|" + error?.response?.data?.error?.message,
              });
            }
          });
      };
      send(0);
    });
  };