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
  chatApi:
    process.env.EXPO_PUBLIC_API_CHAT_URL ?? "https://cecyapi-2h4u.onrender.com",
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

/**
 * Makes an HTTP request using Axios with JWT authentication and customizable options.
 *
 * @template T The expected response data type.
 * @param {Object} args - The arguments for the HTTP request.
 * @param {string} args.path - The endpoint path for the request.
 * @param {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} [args.method="POST"] - The HTTP method to use.
 * @param {any} [args.data] - The request payload data.
 * @param {Record<string, any>} [args.params={}] - Query parameters to include in the request.
 * @param {boolean} [args.dataWithFiles=false] - Whether the request includes file uploads (sets content type to multipart/form-data).
 * @param {"json" | "blob" | "arraybuffer" | "document" | "text" | "stream"} [args.responseType="json"] - The expected response type.
 * @param {Record<string, string>} [args.extraHeaders={}] - Additional headers to include in the request.
 * @param {(data: any, headers: any) => any} [args.transformRequest] - Optional function to transform the request before sending.
 * @param {string} [args.baseURL="translateApi"] - The base URL key to use from the `apisUrls` object.
 * @returns {Promise<T>} The response data of type `T`.
 *
 * @throws {AxiosError} Will throw an error if the HTTP request fails.
 *
 * @remarks
 * - Retrieves JWT from localStorage (web) or SecureStore (native).
 * - Filters out null or undefined query parameters.
 * - Automatically sets the `Authorization` header if a JWT is available.
 * - Sets the appropriate `Content-Type` header based on `dataWithFiles`.
 */
async function http<T>({
  path,
  method = "POST",
  data,
  params = {},
  dataWithFiles = false,
  baseURL = "translateApi",
}: HttpArguments): Promise<T> {
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
    },
  };

  let response: AxiosResponse<T, T>;
  response = await axios(request);

  return response.data;
}
