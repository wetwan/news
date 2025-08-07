/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Button } from "./ui/button";
import { config, db } from "@/lib/apprwrite";
import { toast } from "react-toastify";
import { useState } from "react";
import { Trash } from "lucide-react";

const AdminCategory = () => {
  const { category, cat, setCat, getCategory } = useNewsCreation();

  const [open, setOpen] = useState(false);
  const handleDelete = async (item: any) => {
    try {
      // Assuming you have a function to delete news by ID
      await db.deleteDocument(config.database, config.category, item.$id);
      await getCategory();
      toast.success("News deleted successfully");
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news");
    }
  };
  // const [cat, setCat] = useState("all");
  return (
    <div>
      <div className="flex gap-3 w-5/6 mx-auto overflow-x-scroll my-10">
        {category.map((item, i) => (
          <p
            key={i}
            onClick={() => setCat(item.name)}
            className={`border whitespace-nowrap px-5 py-2 capitalize rounded-xl cursor-pointer  ${
              item.name === cat
                ? "text-blue-400 font-bold border-blue-400"
                : "font-semibold"
            }`}
          >
            {item.name}
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  className=" bg-red-500 hover:bg-red-600 text-white mx-3"
                  onClick={() => setOpen(true)}
                >
                  <Trash size={4} />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this news item. This action
                    cannot be undone.
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
          </p>
        ))}
      </div>
    </div>
  );
};

export default AdminCategory;
