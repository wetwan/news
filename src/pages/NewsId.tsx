/* eslint-disable react-hooks/exhaustive-deps */
import { images } from "@/assets";
import Comments from "@/components/Coments";
import Comment from "@/components/comment";
import { useNewsCreation } from "@/context/newsContext";
import { config, db } from "@/lib/apprwrite";
import type { CommentType, NewsDocument } from "@/types/types";
import { Query } from "appwrite";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";

const NewsId = () => {
  const { id } = useParams();
  const { news, loading, setLoading, getMessage } = useNewsCreation();
  const [newData, setNewsdata] = useState<NewsDocument>();
  const [comm, setComm] = useState<CommentType[]>([]);

  const getComment = async () => {
    setLoading(true);
    try {
      const response = await db.listDocuments(config.database, config.comment, [
        Query.equal("postId", id || ""),
        Query.limit(100),
        Query.orderDesc("time"),
      ]);
      setComm(response.documents as unknown as CommentType[]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getNewdata = async () => {
    setLoading(true);
    try {
      const find = news.find((t) => t.$id === id);
      if (!find) {
        toast.error("News not found");
        return;
      }

      setNewsdata(find);
      await getMessage();
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
    <div className="mt-20 sm:w-5/6 mx-auto ">
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
            date: {newData?.time && new Date(newData.time).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-20">
        <div className="h-[400px] sm:w-[600px] w-[290px] overflow-hidden mb-10">
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
        {newData && <Comments item={newData} getComment={getComment} />}
        <Comment item={comm} />
      </div>
    </div>
  );
};

export default NewsId;
