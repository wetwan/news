/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { Category } from "@/constant";
import { account, config, db } from "@/lib/apprwrite";
import type { CommentType, NewsDocument } from "@/types/types";
import { Query, type Models } from "appwrite";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

type NewsContextType = {
  getMessage: () => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  news: NewsDocument[];
  setNews: React.Dispatch<React.SetStateAction<NewsDocument[]>>;
  category: any[];
  setCategory: React.Dispatch<React.SetStateAction<any[]>>;
  setCat: React.Dispatch<React.SetStateAction<string>>;
  cat: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filteredAndSortedNews: NewsDocument[];
  filteredByCategory: NewsDocument[];
  comment: CommentType[];
  setComment: React.Dispatch<React.SetStateAction<CommentType[]>>;
  user: Models.User<Record<string, any>> | null;
  setUser: React.Dispatch<
    React.SetStateAction<Models.User<Record<string, any>> | null>
  >;
  AdminNews: NewsDocument[];
  setAdminNews: React.Dispatch<React.SetStateAction<NewsDocument[]>>;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: React.ReactNode }) {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsDocument[]>([]);
  const [comment, setComment] = useState<CommentType[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<Models.User<Record<string, any>> | null>(
    null
  );
  const [AdminNews, setAdminNews] = useState<NewsDocument[]>([]);

  const checkUser = async () => {
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
    } catch (error) {
      console.log("Not authenticated", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const getNews = async () => {
    setLoading(true);
    try {
      const response = await db.listDocuments(config.database, config.news, [
        Query.orderDesc("time"),
      ]);
      setNews(response.documents as unknown as NewsDocument[]);
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
  const filteredAndSortedNews = useMemo(() => {
    if (!search) {
      return filteredByCategory;
    }
    const lowercasedSearch = search.toLowerCase();
    return filteredByCategory.filter((item) => {
      const titleMatches = item.title.toLowerCase().includes(lowercasedSearch);
      const categoryMatches = item.category
        .toLowerCase()
        .includes(lowercasedSearch);
      return titleMatches || categoryMatches;
    });
  }, [filteredByCategory, search]);

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

  const getMessage = async () => {
    setLoading(true);
    try {
      const currentUser = await account.get();
      const response = await db.listDocuments(config.database, config.news, [
        Query.equal("by", currentUser.name),
        Query.orderDesc("time"),
      ]);
      setAdminNews(response.documents as unknown as NewsDocument[]);

    } catch (error) {
      console.error("Error fetching message:", error);
      toast.error("Failed to fetch message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  useEffect(() => {
    getNews();
    getCategory();
  }, []);

  return (
    <NewsContext.Provider
      value={{
        getMessage,
        AdminNews,
        setAdminNews,
        filteredAndSortedNews,
        filteredByCategory,
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
        comment,
        setComment,
        user,
        setUser,
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
