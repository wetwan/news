import AdminCategory from "@/components/AdminCategory";
import AdminNew from "@/components/AdminNews";
import { useNewsCreation } from "@/context/newsContext";
import { Loader2Icon, LucideFileWarning } from "lucide-react";

const AdminHome = () => {
  const { loading, AdminNews } = useNewsCreation();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2Icon
          size="50"
          className=" animate-spin duration-100 ease-in-out text-blue-600"
        />
      </div>
    );
  }
  if (AdminNews.length === 0) {
    return (
      <div className="h-screen flex items-center   flex-col  mt-[200px]">
        <LucideFileWarning
          size={"100"}
          color="oklch(68.1% 0.162 75.834)"
          className="text-yellow-600"
        />
        <h2 className="text-6xl font-bold mt-10 "> No new yet</h2>
      </div>
    );
  }
  return (
    <div>
      <AdminCategory />
      {AdminNews.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {AdminNews.map((item) => (
            <AdminNew item={item} key={item.$id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
