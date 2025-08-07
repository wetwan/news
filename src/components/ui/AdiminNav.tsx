import { NavLink } from "react-router";

const AdiminNav = () => {
  return (
    <div>
      <ul className="flex items-center gap-5 capitalize justify-center my-10 max-sm:text-sm overflow-scroll w-full">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `cursor-pointer py-2 capitalize font-bold transition-colors ease-in duration-300 ${
              isActive
                ? "text-blue-600 border-b-4 border-blue-600 " // Used a more
                : " text-yellow-500" // Changed inactive color
            }`
          }
          end
        >
          my news
        </NavLink>
        <NavLink
          to="addnews"
          className={({ isActive }) =>
            ` cursor-pointer py-2  capitalize font-bold transition-colors ease-in duration-300 ${
              isActive
                ? "text-blue-400 border-b-4 border-blue-400 "
                : " text-yellow-500"
            }`
          }
        >
          add news
        </NavLink>
        <NavLink
          to="adduser"
          className={({ isActive }) =>
            ` cursor-pointer py-2  capitalize font-bold transition-colors ease-in duration-300 ${
              isActive
                ? "text-blue-400 border-b-4 border-blue-400 "
                : " text-yellow-500"
            }`
          }
        >
          add aurthor
        </NavLink>
        <NavLink
          to="user"
          className={({ isActive }) =>
            ` cursor-pointer py-2  capitalize font-bold transition-colors ease-in duration-300 ${
              isActive
                ? "text-blue-400 border-b-4 border-blue-400 "
                : " text-yellow-500"
            }`
          }
        >
          Profile
        </NavLink>
      </ul>
    </div>
  );
};

export default AdiminNav;
