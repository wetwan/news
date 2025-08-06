import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNewsCreation } from "@/context/newsContext";

const SearchBox = () => {
  const { search, setSearch } = useNewsCreation();
  return (
    <div className="mt-10 mx-auto max-w-4/6 border py-3 p-2 rounded-4xl  flex items-center justify-between ">
      <input
        type="text"
        value={search}
        onChange={d => setSearch(d.target.value)}
        placeholder="search here"
        aria-placeholder="seach here"
        className="w-5/6 p-2 outline-0 capitalize"
      />
      <Button variant={"outline"} className="mr-4" type="button">
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchBox;
