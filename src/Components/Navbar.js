import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function Navbar({ setAlert }) {
  const [searchParam, setSearchParam] = useState("");
  const handleSearchParam = (e) => {
    setSearchParam(e.target.value);
  };

  const [useParams] = useSearchParams({ searchParam });
  let location = useLocation();

  //getting length of cart
  const lenFun = () => {
    const cartLen = JSON.parse(localStorage.getItem("cart"));
    if (cartLen) {
      return cartLen.length;
    }
    return 0;
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          zIndex: "10",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand mb-0 h1" to="/">
            BookWorm
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/orders" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/orders"
                >
                  Orders
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <input
                className="form-control me-2"
                placeholder="Search"
                value={searchParam}
                onChange={handleSearchParam}
              />
              {searchParam.length !== 0 ? (
                <Link
                  className="btn btn-outline-success"
                  to={`/search/${searchParam}`}
                  search={useParams.toString()}
                >
                  Search
                </Link>
              ) : (
                <Link
                  className="btn btn-outline-success"
                  onClick={(e) => {
                    e.preventDefault();
                    setAlert({
                      onOff: "on",
                      type: "danger",
                      alertMsg: "Search box empty.",
                    });
                    setTimeout(() => {
                      setAlert({ onOff: "off", type: "", alertMsg: "" });
                    }, 3000);
                  }}
                >
                  Search
                </Link>
              )}
            </div>
            <div className="m-2">
              <Link to="/cart">
                <i
                  className="fa-solid fa-cart-shopping mx-0 mx-sm-1"
                  style={{ color: "#ffffff" }}
                ></i>
              </Link>
              <span className="badge text-bg-secondary mx-1 mx-lg-0">
                {lenFun()}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
