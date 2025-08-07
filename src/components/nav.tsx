import { images } from "@/assets"; // Assuming this path is correct for your image assets
import { useNewsCreation } from "@/context/newsContext";
import { signOut } from "@/lib/apprwrite";
import { NavLink, useNavigate } from "react-router";
import { Link } from "react-router";

const Nav = () => {
  const { setCat, user, setUser } = useNewsCreation();

  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="py-3 w-full p-1 flex items-center justify-between">
        <Link to="/" className="" onClick={() => setCat("all")}>
          <img
            src={images.imgae5}
            alt="Logo"
            height={70}
            width={70}
            className="rounded-full"
          />
        </Link>

        <ul className="flex items-center gap-5 capitalize mr-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` cursor-pointer py-2  capitalize font-bold transition-colors ease-in duration-300 ${
                isActive
                  ? "text-blue-400 border-b-4 border-blue-400 "
                  : " text-yellow-500"
              }`
            }
          >
            home
          </NavLink>
          {user && (
            <button
              onClick={logOut}
              className="text-yellow-500 hover:text-blue-400 font-bold transition-colors duration-300 capitalize"
            >
              logout
            </button>
          )}

          {!user && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                ` cursor-pointer py-2  capitalize font-bold transition-colors ease-in duration-300 ${
                  isActive
                    ? "text-blue-400 border-b-4 border-blue-400 "
                    : " text-yellow-500"
                }`
              }
            >
              login
            </NavLink>
          )}
        </ul>
      </div>
      <hr className="w-5/6 mx-auto" />
    </>
  );
};

export default Nav;
