import { images } from "@/assets";
import type { CommentType } from "@/types/types";

interface CommentProp {
  item: CommentType[];
}

const Comment = ({ item }: CommentProp) => {
  return (
    <div className="p-5">
      {item.map((item) => (
        <div className="p-3 my-5 rounded-md bg-white" key={item.$id}>
          <div className="flex  gap-6 items-center">
            <img
              src={images.imgae3}
              height={60}
              width={60}
              className="rounded-full w-[60px] h-[60px]"
            />
            <div className="">
              <p className="capitalize font-semibold text-lg ">{item.name}</p>
              <p className="capitalize font-semibold text-lg mt-1">
                {item.email}
              </p>
            </div>
          </div>

          <p className="capitalize font-semibold text-lg mt-4 ml-2">
            {item.time && new Date(item.time).toLocaleString()}
          </p>
          <p className="py-7 border rounded-sm px-5 mt-6">{item.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
