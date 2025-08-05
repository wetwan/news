import { images } from "@/assets";
import { Link } from "react-router";

const Nav = () => {
  return (
    <div className="bg-green-200 py-3 w-full p-1">
      <Link to="/" className="block w-20, h-20">
        <img
          src={images.imgae5}
          height={70}
          width={70}
          className="rounded-full"
        />
      </Link>
    </div>
  );
};

export default Nav;
