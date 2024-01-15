import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import Books from "./Components/Books";
import BookDetail from "./Components/BookDetail";
import Search from "./Components/Search";
import About from "./Components/About";
import NoPage from "./Components/NoPage";
import Orders from "./Components/Orders";
import Alert from "./Components/Alert";
import LoadingBar from "react-top-loading-bar";
import Footer from "./Components/Footer";

function App() {
  const [alert, setAlert] = useState({ onOff: "off", type: "", alertMsg: "" });
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        {alert.onOff === "on" ? (
          <Alert alert={alert} setAlert={setAlert} />
        ) : (
          <Navbar setAlert={setAlert} />
        )}
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => {
            setProgress(0);
          }}
          shadow={true}
          height={3}
        />
        <Routes>
          <Route path="/" element={<Books setProgress={setProgress} />} exact />
          <Route
            path="/book/:id"
            element={
              <BookDetail setAlert={setAlert} setProgress={setProgress} />
            }
            exact
          />
          <Route
            path="/cart"
            element={<Cart setAlert={setAlert} setProgress={setProgress} />}
            exact
          />
          <Route
            path="/search/:searchParam"
            element={<Search setProgress={setProgress} />}
            exact
          />
          <Route
            path="/about"
            element={<About setProgress={setProgress} />}
            exact
          />
          <Route
            path="/orders"
            element={<Orders setProgress={setProgress} setAlert={setAlert} />}
            exact
          />
          <Route
            path="*"
            element={<NoPage setProgress={setProgress} />}
            exact
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
