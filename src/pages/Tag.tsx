/* eslint-disable react-hooks/exhaustive-deps */

import Item from "@/components/OnNews";
import { useNewsCreation } from "@/context/newsContext";
import type { NewsType } from "@/types/types";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Tag = () => {
  const { id } = useParams();
  const { news, loading, setLoading } = useNewsCreation();
  const [tags, setNewsdata] = useState<NewsType[]>([]);

  const getTags = async () => {
    setLoading(true);
    try {
      const filter = news.filter(
        (newsItem) => newsItem.tag.includes(id as string) // Type assertion here
      );
      setNewsdata(filter);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTags();
  }, [news]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2Icon
          size="50"
          className=" animate-spin duration-100 ease-in-out text-blue-600"
        />
      </div>
    );
  }
  return (
    <div className="w-5/6 mx-auto">
      <h1 className="my-16 text-3xl ">
        Tag: <span className="uppercase  font-bold text-blue-400">{id}</span>
      </h1>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-4 items-center justify-between">
        {tags.map((item: NewsType) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Tag;
