import type { NewsDocument } from "@/types/types";

import { Link } from "react-router";

interface ItemProp {
  item: NewsDocument;
}
const Item = ({ item }: ItemProp) => {
  return (
    <div
      key={item.$id}
      className="p-3 border overflow-hidden hover:scale-105 ease-in duration-500 hover:mx-1 rounded-xl hover:border-blue-300 "
    >
      <Link
        to={`/news/${item.$id}`}
        className="w-[300px] lg:w-[400px] h-[300px] overflow-hidden object-center items-center"
      >
        <img src={item.image} className=" object-cover w-full h-[300px]" />
      </Link>
      <div className="flex justify-between capitalize mt-3 items-start">
        <div className=" flex flex-col">
          <h2 className="text-2xl"> {item.title.slice(0, 10)}</h2>
          <p className="font-medium">by: {item.by}</p>
        </div>
        <p className="px-2 py-1 rounded-md bg-blue-600 text-white border ">
          {item.category}
        </p>
      </div>
      <p className="mb-4">
        Date: {item.time && new Date(item.time).toLocaleDateString()}
      </p>
      <h3 className="">{item.story.slice(0, 70)}....</h3>
    </div>
  );
};

export default Item;
