import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { config, db } from "@/lib/apprwrite";
import { ID } from "appwrite";
import { Loader } from "lucide-react";
import type { NewsDocument } from "@/types/types";

interface Comment {
  item: NewsDocument;
  getComment: () => Promise<void>;
}

const Comments = ({ item, getComment }: Comment) => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !comment) {
      toast("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      // Get current user

      // Prepare final form data
      const formdata = {
        name: name,
        comment: comment,
        email: email,
        postId: item.$id,
        time: new Date().toISOString(),
      };

      await db.createDocument(
        config.database,
        config.comment,
        ID.unique(),
        formdata
      );

      toast("News added successfully");

      await getComment();

      setComment("");
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Error adding news:", error);
      toast("Failed to add news");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-5">
      <div className="flex flex-col sm:flex-row gap-10  mb-5">
        <div className="grid w-full max-w-sm items-center gap-3 ">
          <Label htmlFor="text">Full Name</Label>
          <Input
            className="py-6 text-md text-black placeholder:text-black focus-visible:ring-0 outline-0"
            type="text"
            id="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            className="py-6 text-md text-black placeholder:text-black focus-visible:ring-0 outline-0"
            type="email"
            id="email"
            placeholder="Email@email.co"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="grid w-full  items-center gap-3 mb-5">
        <Label htmlFor="comment">Enter your comment</Label>
        <textarea
          className="w-full h-32 border text-md px-3 rounded-md py-5 text-black placeholder:text-black p-2"
          id="comment"
          placeholder="Comment"
          value={comment}
          onChange={(t) => setComment(t.target.value)}
        ></textarea>
      </div>
      {loading ? (
        <Button variant={"outline"} className="py-7 px-10">
          <Loader className=" animate-spin" />
        </Button>
      ) : (
        <Button variant={"outline"} className="py-7 px-10">
          Submit
        </Button>
      )}
    </form>
  );
};

export default Comments;
