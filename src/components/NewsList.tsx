import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/sanityImageUrl";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useTranslation } from "react-i18next";

export default function NewsList() {
  const [news, setNews] = useState<any[]>([]);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    client
      .fetch(
        `*[_type == "news" && language == $lang] | order(createdAt desc) {
          _id,
          title,
          createdAt,
          thumbnail,
          content
        }`,
        { lang },
      )
      .then((data) => setNews(data || []));
  }, [lang]);

  // 본문 일부 추출 함수 (Portable Text 블록에서 텍스트만 추출)
  function getPreviewText(content: any, maxLength = 100) {
    if (!Array.isArray(content)) return "";
    let text = "";
    for (const block of content) {
      if (block._type === "block" && Array.isArray(block.children)) {
        text += block.children.map((child: any) => child.text).join("");
      }
      if (text.length >= maxLength) break;
    }
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[90vw] max-w-6xl m-auto">
      {news.map((item) => (
        <Card
          key={item._id}
          className="cursor-pointer hover:shadow-lg transition-shadow pt-0"
          onClick={() => navigate(`/${lang}/news/${item._id}`)}
        >
          {item.thumbnail && (
            <img
              src={urlFor(item.thumbnail).width(400).height(220).fit("crop").url()}
              alt={item.title}
              className="w-full h-[180px] object-cover rounded-t-xl"
            />
          )}
          <CardHeader>
            <CardTitle className="truncate">{item.title}</CardTitle>
            <div className="text-sm text-gray-500 mt-1">
              {item.createdAt ? item.createdAt.split("T")[0] : ""}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-gray-700 text-sm line-clamp-3">{getPreviewText(item.content)}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
