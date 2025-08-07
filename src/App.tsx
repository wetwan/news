import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router";
import Home from "./pages/Home";
import NewsId from "./pages/NewsId";
import Nav from "./components/nav";
import Tag from "./pages/Tag";
import Author from "./pages/Author";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminHome from "./pages/AdminHome";
import AddNews from "./pages/AddNews";
import Addadmin from "./pages/Addadmin";
import Profile from "./pages/Profile";
import "quill/dist/quill.snow.css";
import { useEffect, useState, type ReactNode } from "react";
import { account } from "./lib/apprwrite";
import { ToastContainer } from "react-toastify";

interface ProtectedRouteProps {
  children: ReactNode;
}

function App() {
  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      const checkUser = async () => {
        try {
          await account.get(); // This will throw if not authenticated
          setIsAuthenticated(true);
        } catch (error) {
          console.log("Not authenticated", error);
          setIsAuthenticated(false);
          navigate("/login");
        }
      };

      checkUser();
    }, [navigate]);

    if (isAuthenticated === null) return null; // Or show a loader

    return <>{children}</>;
  };

  return (
    <div className="p-5 sm:w-5/6 mx-auto">
      <ToastContainer />
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news/:id" element={<NewsId />} />
          <Route path="/tag/:id" element={<Tag />} />
          <Route path="/author/:id" element={<Author />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHome />} />{" "}
            <Route path="addnews" element={<AddNews />} />
            <Route path="adduser" element={<Addadmin />} />
            <Route path="user" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
