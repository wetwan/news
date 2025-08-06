/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { Category, Comment, News } from "@/constant";
import type { CommentType, NewsType } from "@/types/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type NewsContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  news: NewsType[];
  setNews: React.Dispatch<React.SetStateAction<NewsType[]>>;
  category: any[];
  setCategory: React.Dispatch<React.SetStateAction<any[]>>;
  setCat: React.Dispatch<React.SetStateAction<string>>;
  cat: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filteredAndSortedNews: NewsType[];
  filteredByCategory: NewsType[];
  sortedNews: NewsType[];
  comment: CommentType[];
  setComment: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsType[]>([]);
  const [comment, setComment] = useState<CommentType[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");

  const getNews = async () => {
    setLoading(true);
    try {
      setNews(News);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getComment = async () => {
    setLoading(true);
    try {
      setComment(Comment);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredByCategory = useMemo(() => {
    if (cat === "all") {
      return news;
    }
    return news.filter(
      (item) => item.category.toLocaleLowerCase() === cat.toLocaleLowerCase()
    );
  }, [news, cat]);
  const sortedNews = useMemo(() => {
    return [...filteredByCategory].sort((a, b) => {
      const timeA = a.time?.seconds ?? 0;
      const timeB = b.time?.seconds ?? 0;
      return timeB - timeA;
    });
  }, [filteredByCategory]);

  const filteredAndSortedNews = useMemo(() => {
    if (!search) {
      return sortedNews;
    }
    const lowercasedSearch = search.toLowerCase();
    return sortedNews.filter((item) => {
      const titleMatches = item.title.toLowerCase().includes(lowercasedSearch);
      const categoryMatches = item.category
        .toLowerCase()
        .includes(lowercasedSearch);
      return titleMatches || categoryMatches;
    });
  }, [sortedNews, search]);

  const getCategory = async () => {
    setLoading(true);
    try {
      setCategory(Category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComment();
    getNews();
    getCategory();
  }, []);

  return (
    <NewsContext.Provider
      value={{
        filteredAndSortedNews,
        filteredByCategory,
        sortedNews,
        setSearch,
        search,
        setCat,
        cat,
        loading,
        setLoading,
        news,
        setCategory,
        setNews,
        category,
        comment, setComment
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export function useNewsCreation() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error("useNewsCreation must be used within a NewsProvider");
  }
  return context;
}
