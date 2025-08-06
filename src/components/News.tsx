import { useNewsCreation } from "@/context/newsContext";
import type { NewsType } from "@/types/types";
import { Loader2Icon, LucideFileWarning } from "lucide-react";

import Item from "./OnNews";

const News = () => {
  const { filteredAndSortedNews, loading } = useNewsCreation();

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
  if (filteredAndSortedNews.length === 0) {
    return (
      <div className="h-screen flex items-center   flex-col  mt-[200px]">
        <LucideFileWarning
          size={"100"}
          color="oklch(68.1% 0.162 75.834)"
          className="text-yellow-600"
        />
        <h2 className="text-6xl font-bold mt-10 "> No new yet</h2>
      </div>
    );
  }
  return (
    <div className="mt-20 p-5">
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-4 items-center justify-between">
        {filteredAndSortedNews.map((item: NewsType) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default News;
