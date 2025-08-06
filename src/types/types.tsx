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
