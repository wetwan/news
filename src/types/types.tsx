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
