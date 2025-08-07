/* eslint-disable react-hooks/exhaustive-deps */
import Item from "@/components/OnNews";
import { useNewsCreation } from "@/context/newsContext";
import type { NewsDocument } from "@/types/types";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Author = () => {
  const { id } = useParams();
  const { filteredAndSortedNews, loading, setLoading } = useNewsCreation();
  const [author, setNewsdata] = useState<NewsDocument[]>([]);

  const getAuthor = async () => {
    setLoading(true);
    try {
      const find = filteredAndSortedNews.filter((t) => t.by === id);
      setNewsdata(find);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthor();
  }, [filteredAndSortedNews]);

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
    <div>
      <div className="w-5/6 mx-auto">
        <h1 className="my-16 text-3xl ">
          Tag: <span className="uppercase  font-bold text-blue-400">{id}</span>
        </h1>
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-4 items-center justify-between">
          {author.map((item: NewsDocument) => (
            <Item item={item} key={item.$id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Author;
