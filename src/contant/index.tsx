import { images } from "@/assets";
import type { NewsType } from "@/types/types";

export const News: NewsType[] = [
  {
    story:
      "Cloudinary is a SaaS company providing cloud media management services for websites and apps. The company is headquartered in San Jose, California with offices in Israel, England, Poland, and Singapore.",
    title: "Cloudinary",
    by: "wetwan",
    time: { seconds: 5678909876, nanoseconds: 45678987654 },
    category: "technology",
    id: "1",
    tag: ["technology", "Cloudinary"],
    image: images.imgae1,
  },
  {
    story:
      "Cloudinary is a SaaS company providing cloud media management services for websites and apps. The company is headquartered in San Jose, California with offices in Israel, England, Poland, and Singapore.",
    title: "Cloudinary",
    by: "wetwan",
    time: { seconds: 5678909876, nanoseconds: 45678987654 },
    category: "sport",
    id: "2",
    tag: ["ronaldo", "nigeria", "club"],
    image: images.imgae2,
  },
  {
    story:
      "Cloudinary is a SaaS company providing cloud media management services for websites and apps. The company is headquartered in San Jose, California with offices in Israel, England, Poland, and Singapore.",
    title: "Cloudinary",
    by: "wetwan",
    time: { seconds: 5678909876, nanoseconds: 45678987654 },
    category: "Entertainment",
    id: "2",
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
  "Science and Technology",
];
