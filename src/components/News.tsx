import { useNewsCreation } from "@/context/newsContext";
import type { NewsType } from "@/types/types";
import { Loader2Icon } from "lucide-react";

import Item from "./OnNews";

const News = () => {
  const { news, loading } = useNewsCreation();

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
    <div className="mt-20 p-5">
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-4 items-center justify-between">
        {news.map((item: NewsType) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default News;
