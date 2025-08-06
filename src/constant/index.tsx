import { images } from "@/assets";
import type { CommentType, NewsType } from "@/types/types";

export const News: NewsType[] = [
  {
    story:
      "Cloudinary is a SaaS company providing cloud media management services for websites and apps. The company is headquartered in San Jose, California with offices in Israel, England, Poland, and Singapore.",
    title: "Cloudinary",
    by: "wetwan",
    time: { seconds: 569096, nanoseconds: 45678987654 },
    category: "technology",
    id: "1",
    tag: ["technology", "Cloudinary"],
    image: images.imgae1,
  },
  {
    story:
      "Cloudinary is a SaaS company providing cloud media management services for websites and apps. The company is headquartered in San Jose, California with offices in Israel, England, Poland, and Singapore.",
    title: "ronaldo",
    by: "wetwan",
    time: { seconds: 5679876, nanoseconds: 45678987654 },
    category: "sports",
    id: "2",
    tag: ["ronaldo", "nigeria", "club"],
    image: images.imgae2,
  },
  {
    story:
      "Cloudinary is a SaaS company providing cloud media management services for websites and apps. The company is headquartered in San Jose, California with offices in Israel, England, Poland, and Singapore.",
    title: "Cloudinary",
    by: "wetwan",
    time: { seconds: 56789876, nanoseconds: 45678987654 },
    category: "Entertainment",
    id: "3",
    tag: ["Entertainment", "Cloudinary"],
    image: images.imgae4,
  },
];
export const Category = [
  "all",
  "Local ",
  "National ",
  "International ",
  "Business",
  "Sports",
  "Weather",
  "Entertainment",
  // Features stories about movies, music, television, celebrities, and other forms of entertainment.

  "Political",
  //  Focuses on government, politicians, elections, and political campaigns.
  "Investigative",
  // Journalism Involves in-depth reporting on issues, often uncovering wrongdoing or hidden information.
  "Crime",
  //  Covers criminal activity, law enforcement, and court proceedings.
  "Lifestyle",

  // Deals with topics like fashion, health, food, travel, and relationships.
  "Science ",
  "Technology",
];

export const Comment: CommentType[] = [
  {
    name: "me",
    email: " wetwan",
    time: { seconds: 569096, nanoseconds: 45678987654 },
    image: images.imgae5,
    Comment:
      "Features stories about movies, music, television, celebrities, and other forms of entertainment.",
    postId: "1",
    id: "1",
  },
  {
    name: "me1",
    email: " wetwan1",
    time: { seconds: 456987654, nanoseconds: 456654 },
    image: images.imgae1,
    Comment:
      "Deals with topics like fashion, health, food, travel, and relationships.",
    postId: "1",
    id: "2",
  },
  {
    name: "me3",
    email: " wetwan",
    time: { seconds: 569096, nanoseconds: 45678987654 },
    image: images.imgae2,
    Comment:
      "Features stories about movies, music, television, celebrities, and other forms of entertainment.",
    postId: "2",
    id: "4",
  },
  {
    name: "me4",
    email: " wetwan13",
    time: { seconds: 45698775294, nanoseconds: 456654 },
    image: images.imgae1,
    Comment:
      "Deals with topics like fashion, health, food, travel, and relationships.",
    postId: "3",
    id: "54",
  },
];
