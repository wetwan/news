import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";

const Comments = () => {
  const [comment, setcomment] = useState("");
  return (
    <div className="p-5">
      <div className="flex flex-col sm:flex-row gap-10  mb-5">
        <div className="grid w-full max-w-sm items-center gap-3 ">
          <Label htmlFor="text">Full Name</Label>
          <Input
            className="py-6 text-md text-black placeholder:text-black focus-visible:ring-0 outline-0"
            type="text"
            id="text"
            placeholder="Full Name"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            className="py-6 text-md text-black placeholder:text-black focus-visible:ring-0 outline-0"
            type="email"
            id="email"
            placeholder="Email"
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
          onChange={(t) => setcomment(t.target.value)}
        ></textarea>
      </div>
      <Button variant={"outline"} className="py-7 px-10">
        Submit
      </Button>
    </div>
  );
};

export default Comments;
