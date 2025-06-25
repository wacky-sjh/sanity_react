# React + Sanity.io (Headless CMS) 가이드

## 1. 프로젝트 생성 및 구조

1. Vite로 React 프로젝트 생성
2. Sanity Studio 생성 (예: `studio-sanity_react` 폴더)

## 2. Sanity Studio 실행 및 프론트엔드 개발 서버 실행

- Sanity Studio 개발 서버 실행

  ```bash
  cd studio-sanity_react
  npm run dev
  ```

- 프론트엔드 개발 서버 실행

  ```bash
  npm run dev
  ```

## 3. CORS 설정

- 클라이언트에서 Sanity API 호출 시 CORS 에러가 발생하면:
  - Sanity Studio > Settings > API Settings > CORS origins에 클라이언트 URL 추가

## 4. 샘플 코드 안내

- `studio-sanity_react/schemaTypes` 폴더에서 스키마 타입 정의
- 새 스키마 파일을 만들면 반드시 `schemaTypes/index.ts`에 import 및 배열에 추가
- Sanity 스키마 예시:

  ```ts
  // studio-sanity_react/schemaTypes/news.ts
  import { defineField, defineType } from "sanity";
  export const news = defineType({
    name: "news",
    title: "뉴스",
    type: "document",
    fields: [
      defineField({ name: "title", title: "제목", type: "string" }),
      defineField({
        name: "thumbnail",
        title: "썸네일",
        type: "image",
        options: { hotspot: true },
      }),
      defineField({
        name: "content",
        title: "내용",
        type: "array",
        of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      }),
      defineField({
        name: "createdAt",
        title: "작성일",
        type: "datetime",
        initialValue: new Date().toISOString(),
      }),
    ],
  });
  ```

- React에서 Sanity Client 설정

  ```js
  // src/lib/sanity/client.ts
  import { createClient } from "@sanity/client";

  export const client = createClient({
    projectId: "ddqbxgsr",
    dataset: "production",
    apiVersion: "2023-05-03",
    useCdn: false, // 읽기 전용, 빠른 응답, 캐시 사용 (false 설정 시 캐시없이 최신 데이터 요청)
  });
  ```

- React에서 Sanity Image 렌더 설정

  ```js
  // src/lib/sanity/sanityImageUrl.ts
  import { client } from "./client";

  import imageUrlBuilder from "@sanity/image-url";
  import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

  // Create an image URL builder using the client
  const builder = imageUrlBuilder(client);

  // Export a function that can be used to get image URLs
  export function urlFor(source: SanityImageSource) {
    return builder.image(source);
  }
  ```

- React에서 Sanity 데이터 fetch 예시

  ```js
  client.fetch(
    `*[_type == "news"] | order(createdAt desc) { _id, title, createdAt, thumbnail, content }`,
  );
  ```

- Sanity 이미지 URL 빌더 사용 예시

  ```js
  import { urlFor } from "@/lib/sanity/sanityImageUrl";
  <img src={urlFor(item.thumbnail).width(400).height(220).fit("crop").url()} alt={item.title} />;
  ```

## 5. 기타

- Sanity Studio에서 스키마 변경 후에는 반드시 재시작 또는 새로고침 필요
- 어드민에서 이미지 등 필드에 값이 실제로 들어가야 클라이언트에서 정상적으로 표시됨
