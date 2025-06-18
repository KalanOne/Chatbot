import { http } from "./api";

export { getTextFromSpeech };

async function getTextFromSpeech({ data }: { data: FormData }) {
  return http<{ transcription: string }>({
    path: "transcribe/",
    data: data,
    method: "POST",
    dataWithFiles: true,
    baseURL: "translateApi",
  });
}
