import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNewsCreation } from "@/context/newsContext";
import { account, avatar, config, db, storage } from "@/lib/apprwrite";
import { ID } from "appwrite";
import { Loader } from "lucide-react";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddNews = () => {
  const { category, loading, setLoading, getMessage, getCategory } =
    useNewsCreation();
  const naviagte = useNavigate();
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [currentTagInput, setCurrentTagInput] = useState<string>("");

  const [tagsList, setTagsList] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newsDescription, setNewsDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const addTag = () => {
    if (
      currentTagInput.trim() !== "" &&
      !tagsList.includes(currentTagInput.trim())
    ) {
      setTagsList((prevTags) => [...prevTags, currentTagInput.trim()]);
      setCurrentTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTagsList((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // Get the FileList from the input

    if (files && files.length > 0) {
      const selectedFile = files[0];
      setImage(selectedFile);
    } else {
      // If no file is selected (e.g., user cancels selection)
      setImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !newsDescription || !selectedCategory || !image) {
      toast("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const currentUser = await account.get();

      const userAvatar = avatar.getInitials(currentUser.name);

      const file = await storage.createFile(config.bucket, ID.unique(), image);
      if (!file) {
        toast("Failed to upload image");
        return;
      }
      const imageUrl = storage.getFileView(config.bucket, file.$id);

      const formdata = {
        title: title,
        story: newsDescription,
        category: selectedCategory,
        tag: tagsList,
        image: imageUrl,
        by: currentUser.name,
        time: new Date().toISOString(),
        aurthor_image: userAvatar,
        UserId: currentUser.$id,
      };

      await db.createDocument(
        config.database,
        config.news,
        ID.unique(),
        formdata
      );

      toast("News added successfully");

      await getMessage();
      naviagte("/admin");

      setTitle("");
      setNewsDescription("");
      setSelectedCategory("");
      setImage(null);
      setTagsList([]);
    } catch (error) {
      console.error("Error adding news:", error);
      toast("Failed to add news");
    } finally {
      setLoading(false);
    }
  };

  // Handle category submission
  const handleCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      toast("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const formdata = {
        name: title,
      };

      await db.createDocument(
        config.database,
        config.category,
        ID.unique(),
        formdata
      );

      toast("category added successfully");

      await getCategory();
      naviagte("/admin");

      setTitle("");
    } catch (error) {
      console.error("Error adding category:", error);
      toast("Failed to category news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let quill: Quill;

    if (editorRef.current && !quillRef.current) {
      quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your news content here...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
          ],
        },
      });
      quillRef.current = quill;
    } else if (quillRef.current) {
      quill = quillRef.current;
    } else {
      return;
    }

    if (!quillRef.current) return;
    const handler = () => {
      const plainText = quillRef.current?.getText().trim() || "";
      setNewsDescription(plainText);
    };
    quillRef.current.on("text-change", handler);
  }, []);

  return (
    <div className="">
      <form onSubmit={handleCategorySubmit}>
        <h1 className="font-semibold">Add category</h1>
        <div className="grid gap-2 my-5">
          <Label htmlFor="title">Title</Label>
          <Input
            value={title}
            onChange={(t) => setTitle(t.target.value)}
            id="title"
            type="text"
            placeholder="local news"
            required
            className="focus-within:ring-0 border-blue-400 focus-within:border-blue-500 max-w-[250px] py-5"
          />
        </div>

        {loading && (
          <Button type="submit" className="w-[200px] py-6 ">
            <Loader className=" animate-spin" />
          </Button>
        )}
        {!loading && (
          <Button type="submit" className="w-[200px] py-6">
            Add News
          </Button>
        )}
      </form>
      <form onSubmit={handleSubmit}>
        <h1 className="font-semibold mt-10">Add news</h1>
        <div className="grid gap-2 my-5">
          <Label htmlFor="title">Title</Label>
          <Input
            value={title}
            onChange={(t) => setTitle(t.target.value)}
            id="title"
            type="text"
            placeholder="One Piece"
            required
            className="focus-within:ring-0 border-blue-400 focus-within:border-blue-500 max-w-[250px] py-5"
          />
        </div>
        <div className="grid gap-2 my-5 max-w-md max-h-40">
          <p>News Description</p>
          <div
            ref={editorRef}
            style={{
              height: 100,
              maxHeight: 100,
              border: "1px solid oklch(62.3% 0.214 259.815) ",
              marginBottom: 10,
            }}
            className="rounded-md"
          ></div>
        </div>

        <div className="grid gap-2 my-5 mt-20">
          <Label htmlFor="category">Category</Label>
          <Select
            value={selectedCategory}
            onValueChange={(t) => setSelectedCategory(t)}
          >
            <SelectTrigger className="focus-within:ring-0 border-blue-400 focus-within:border-blue-500 max-w-[250px] py-5">
              <SelectValue placeholder="Select a category" />
              {/* Placeholder is sufficient here */}
            </SelectTrigger>
            <SelectContent className="focus-within:ring-0 border-blue-400 focus-within:border-blue-500 max-w-[250px] py-5">
              {category.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="picture">News Image</Label>
          <Input
            id="picture"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="focus-within:ring-0 border-blue-400 focus-within:border-blue-500 max-w-[250px] "
          />
        </div>

        <div className="grid gap-2 my-5">
          <Label htmlFor="tag-input">Enter tags (press Enter to add)</Label>
          <Input
            id="tag-input"
            type="text"
            placeholder="Add a tag..."
            className="focus-within:ring-0 border-blue-400 focus-within:border-blue-500 max-w-[250px] py-5"
            value={currentTagInput}
            onChange={(e) => setCurrentTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <button
            type="button"
            onClick={addTag}
            className="bg-blue-500 text-white px-4 py-2 rounded-md max-w-[100px] mt-2"
          >
            Add Tag
          </button>

          <div className="flex flex-wrap gap-2 mt-4">
            {tagsList.map((tagItem, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded flex items-center gap-1"
              >
                <p className="text-sm">{tagItem}</p>
                <button
                  type="button"
                  onClick={() => removeTag(tagItem)}
                  className="text-gray-600 hover:text-red-500 text-xs font-bold"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        {loading && (
          <Button type="submit" className="w-[200px] py-6">
            <Loader className=" animate-spin" />
          </Button>
        )}
        {!loading && (
          <Button type="submit" className="w-[200px] py-6">
            Add News
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddNews;
