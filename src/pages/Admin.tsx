import { Outlet } from "react-router";
import AdiminNav from "@/components/ui/AdiminNav";

const Admin = () => {
  return (
    <div>
      <AdiminNav />
      <Outlet />
    </div>
  );
};

export default Admin;
