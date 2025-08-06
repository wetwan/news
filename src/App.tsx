import { BrowserRouter as Router, Routes, Route } from "react-router";
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

function App() {
  // const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  //   const { isSignedIn, isLoaded } = useAuth();
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     if (isLoaded && !isSignedIn) {
  //       navigate("/login");
  //     }
  //   }, [isLoaded, isSignedIn, navigate]);

  //   if (!isLoaded) return null;
  //   if (!isSignedIn) return null;

  //   return <>{children}</>;
  // };

  return (
    <div className="p-5 sm:w-5/6 mx-auto">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news/:id" element={<NewsId />} />
          <Route path="/tag/:id" element={<Tag />} />
          <Route path="/author/:id" element={<Author />} />

          <Route path="/admin" element={<Admin />}>
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
