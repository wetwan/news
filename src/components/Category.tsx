import { useNewsCreation } from "@/context/newsContext";
import { useState } from "react";

const Category = () => {
  const { category } = useNewsCreation();
  const [cat, setCat] = useState("all");
  return (
    <div>
      <div className="flex gap-3 w-5/6 mx-auto overflow-x-scroll mt-10">
        {category.map((item, i) => (
          <p
            key={i}
            onClick={() => setCat(item)}
            className={`border whitespace-nowrap px-5 py-2 capitalize rounded-xl cursor-pointer ${
              item === cat
                ? "text-blue-400 font-bold border-blue-400"
                : "font-semibold"
            }`}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Category;
