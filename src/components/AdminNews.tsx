import type { NewsDocument } from "@/types/types";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import { config, db } from "@/lib/apprwrite";
import { useNewsCreation } from "@/context/newsContext";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface AdminNewsProps {
  item: NewsDocument;
}

const AdminNew = ({ item }: AdminNewsProps) => {
  const { getMessage } = useNewsCreation();

  const [open, setOpen] = useState(false);
  const handleDelete = async (item: NewsDocument) => {
    try {
      // Assuming you have a function to delete news by ID
      await db.deleteDocument(config.database, config.news, item.$id);
      await getMessage();
      toast.success("News deleted successfully");
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news");
    }
  };
  return (
    <div
      key={item.$id}
      className="p-3 border relative overflow-hidden hover:scale-105 ease-in duration-500 hover:mx-1 rounded-xl hover:border-blue-300 "
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

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            className="mt-3 bg-red-500 hover:bg-red-600 text-white absolute bottom-3 right-1"
            onClick={() => setOpen(true)}
          >
            <Trash />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this news item. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(item)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminNew;
