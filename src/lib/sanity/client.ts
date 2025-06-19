import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "ddqbxgsr",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false, // 읽기 전용, 빠른 응답, 캐시 사용 (false 설정 시 캐시없이 최신 데이터 요청)
});
