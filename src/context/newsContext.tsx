/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { Category, News } from "@/constant";
import type { NewsType } from "@/types/types";
import React, { createContext, useContext, useEffect, useState } from "react";

type NewsContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  news: NewsType[];
  setNews: React.Dispatch<React.SetStateAction<NewsType[]>>;
  category: any[];
  setCategory: React.Dispatch<React.SetStateAction<any[]>>;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsType[]>([]);
  const [category, setCategory] = useState<any[]>([]);

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
    getNews();
    getCategory();
  }, []);

  return (
    <NewsContext.Provider
      value={{
        loading,
        setLoading,
        news,
        setCategory,
        setNews,
        category,
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
