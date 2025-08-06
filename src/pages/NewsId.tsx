/* eslint-disable react-hooks/exhaustive-deps */
import { images } from "@/assets";
import Comments from "@/components/Coments";
import Comment from "@/components/comment";

import { useNewsCreation } from "@/context/newsContext";
import type { CommentType, NewsType } from "@/types/types";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const NewsId = () => {
  const { id } = useParams();
  const { news, loading, setLoading, comment } = useNewsCreation();
  const [newData, setNewsdata] = useState<NewsType>();
  const [comm, setComm] = useState<CommentType[]>([]);

  const getNewdata = async () => {
    setLoading(true);
    try {
      const find = news.find((t) => t.id === id);
      setNewsdata(find);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
  const getComment = async () => {
    setLoading(true);
    try {
      const find = comment.filter((t) => t.postId === id);
      setComm(find);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewdata();
    getComment();
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
    <div className="mt-20 w-5/6 mx-auto ">
      <h1 className="font-extrabold text-5xl capitalize my-4">
        {newData?.title}
      </h1>
      <div className="flex items-center gap-5">
        <img
          src={images.imgae6}
          height={60}
          width={60}
          className="rounded-full"
          alt="author pic"
        />
        <div className="">
          <Link
            to={`/author/${newData?.by}`}
            className=" capitalize text-md font-bold"
          >
            by: {newData?.by}
          </Link>
          <p className=" capitalize text-md font-bold">
            date:{" "}
            {newData?.time &&
              new Date(newData.time.seconds * 1000).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-20">
        <div className="h-[400px] sm:w-[600px] w-[300px] overflow-hidden mb-10">
          <img src={newData?.image} className="h-[400px] w-full" />
        </div>

        <p
          dangerouslySetInnerHTML={{ __html: newData?.story ?? "" }}
          className="text-lg"
        />
        <div className="flex gap-4 mt-10">
          {newData?.tag.map((item) => (
            <Link
              to={`/tag/${item}`}
              key={item}
              className="border px-4 py-2 rounded-sm border-blue-400 capitalize"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
      <hr className="mt-10 bg-black" />
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-3">Comment</h2>
        <Comments />
        <Comment item={comm} />
      </div>
    </div>
  );
};

export default NewsId;
