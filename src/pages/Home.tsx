import Category from "@/components/Category";
import News from "@/components/News";
import SearchBox from "@/components/searchBox";

const Home = () => {
  return (
    <div>
      <SearchBox />
      <Category />
      <News />
    </div>
  );
};

export default Home;
