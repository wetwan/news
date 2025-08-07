import type { Models } from "appwrite";

export interface NewsType {
  story: string;
  title: string;
  by: string;
  time: {
    seconds: number;
    nanoseconds: number;
  };
  category: string;
  id: string;
  tag: string[];
  image: string;
}

export interface CommentType {
  name: string;
  email: string;
  time: {
    seconds: number;
    nanoseconds: number;
  };
  image: string;
  Comment: string;
  postId: string;
  id: string;
}

export interface NewsDocument  extends Models.Document {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $sequence: number;
  $updatedAt: string;
  aurthor_image: string;
  by: string;
  category: string;
  image: string;
  story: string;
  tag: string[];
  time: string;
  title: string;
}
