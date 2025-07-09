import { http } from "./api";

export { getChatResponse, resetChat };

async function getChatResponse(data: { chat_id: string; mensaje: string }) {
  return http<{ respuesta: string }>({
    path: "app",
    data: data,
    method: "POST",
    baseURL: "chatApi",
  });
}

async function resetChat({ chat_id }: { chat_id: string }) {
  return http<{ mensaje: string }>({
    path: "app",
    data: {
      chat_id,
      reset: true,
    },
    method: "POST",
    baseURL: "chatApi",
  });
}
