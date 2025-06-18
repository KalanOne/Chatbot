import axios, {
  AxiosRequestConfig,
  AxiosRequestTransformer,
  AxiosResponse,
  ResponseType,
} from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export { http };

export type { HttpArguments };

const apisUrls = {
  translateApi:
    process.env.EXPO_PUBLIC_API_TRANSLATE_URL ??
    "https://82407.pythonanywhere.com",
};

interface HttpArguments {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?: Record<string, string | undefined>;
  dataWithFiles?: boolean;
  responseType?: ResponseType;
  extraHeaders?: { [key: string]: any };
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
  baseURL?: keyof typeof apisUrls;
}

const http = async <T>({
  path,
  method = "POST",
  data,
  params = {},
  dataWithFiles = false,
  responseType = "json",
  extraHeaders = {},
  transformRequest,
  baseURL = "translateApi",
}: HttpArguments): Promise<T> => {
  let jwt;
  if (Platform.OS === "web") {
    try {
      if (typeof localStorage !== "undefined") {
        jwt = localStorage.getItem(
          process.env.EXPO_PUBLIC_TOKEN_SECRET ?? "TOKEN_SECRET"
        );
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    jwt = await SecureStore.getItemAsync(
      process.env.EXPO_PUBLIC_TOKEN_SECRET ?? "TOKEN_SECRET"
    );
  }

  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== null && v !== undefined)
  );

  const request: AxiosRequestConfig = {
    method,
    params: cleanedParams,
    data,
    url: path,
    baseURL: apisUrls[baseURL],
    headers: {
      Authorization: jwt ? `Bearer ${jwt}` : undefined,
      "Content-Type": dataWithFiles
        ? "multipart/form-data"
        : "application/json",
      ...extraHeaders,
    },
    responseType: responseType,
    transformRequest,
  };

  let response: AxiosResponse<T, T>;
  response = await axios(request);

  return response.data;
};
