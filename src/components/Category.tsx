import { useNewsCreation } from "@/context/newsContext";

const Category = () => {
  const { category, cat, setCat } = useNewsCreation();
  // const [cat, setCat] = useState("all");
  return (
    <div>
      <div className="flex gap-3 w-5/6 mx-auto overflow-x-scroll mt-10">
        <p
          onClick={() => setCat("all")}
          className={`border whitespace-nowrap px-5 py-2 capitalize rounded-xl cursor-pointer ${
            cat === "all"
              ? "text-blue-400 font-bold border-blue-400"
              : "font-semibold"
          }`}
        >
          all
        </p>
        {category.map((item, i) => (
          <p
            key={i}
            onClick={() => setCat(item.name)}
            className={`border whitespace-nowrap px-5 py-2 capitalize rounded-xl cursor-pointer ${
              item.name === cat
                ? "text-blue-400 font-bold border-blue-400"
                : "font-semibold"
            }`}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Category;
