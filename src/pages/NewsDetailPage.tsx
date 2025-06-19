import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "@/lib/sanity/client";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/sanityImageUrl";

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    client
      .fetch(`*[_type == "news" && _id == $id][0]{ title, createdAt, content }`, { id })
      .then((data) => setNews(data));
  }, [id]);

  if (!news) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl m-auto py-8">
      <h1 className="text-2xl font-bold mb-2">{news.title}</h1>
      <div className="text-gray-500 mb-4">{news.createdAt ? news.createdAt.split("T")[0] : ""}</div>
      <div className="prose">
        <PortableText
          value={news.content}
          components={{
            types: {
              image: ({ value }) => <img src={urlFor(value).url()} alt={value.alt} />,
            },
          }}
        />
      </div>
    </div>
  );
}
