import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import NewsId from "./pages/NewsId";
import Nav from "./components/nav";

function App() {
  return (
    <div className="p-5 w-5/6 mx-auto">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<NewsId />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
