import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import NewsId from "./pages/NewsId";
import Nav from "./components/nav";
import Tag from "./pages/Tag";
import Author from "./pages/Author";
import Login from "./pages/Login";

function App() {
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
