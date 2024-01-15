import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function BookDetail({ setProgress, setAlert }) {
  const [data, setData] = useState();
  const { id } = useParams();

  const loadBook = async () => {
    setProgress(10);
    const url = `https://gutendex.com/books/${id}`;
    setProgress(50);
    const response = await fetch(url);
    setProgress(80);
    const result = await response.json();
    setData(result);
    setProgress(100);
  };

  useEffect(() => {
    loadBook();
    //eslint-disable-next-line
  }, []);

  const addToCart = () => {
    setProgress(10);
    const existingCart = localStorage.getItem("cart");
    const cartArray = existingCart ? JSON.parse(existingCart) : [];
    const existingItemIndex = cartArray.findIndex((item) => item.id === id);
    setProgress(30);
    if (existingItemIndex !== -1) {
      setAlert({
        onOff: "on",
        type: "danger",
        alertMsg: `${
          data.title.length > 20 ? data.title.substr(0, 20) + "..." : data.title
        } is already in cart`,
      });
      setProgress(100);
      setTimeout(() => {
        setAlert({ onOff: "off", type: "", alertMsg: "" });
      }, "3000");
      return;
    } else {
      cartArray.push({
        id,
        title: data.title,
        authors: data.authors,
        formats: {
          img: data.formats["image/jpeg"],
          read: data.formats["text/html"]
            ? data.formats["text/html"]
            : data.formats["text/plain; charset=us-ascii"],
          download: data.formats["application/epub+zip"]
            ? data.formats["application/epub+zip"]
            : data.formats["application/octet-stream"],
        },
      });
    }
    setProgress(40);

    localStorage.setItem("cart", JSON.stringify(cartArray));

    setProgress(90);
    //setting alert
    setAlert({
      onOff: "on",
      type: "success",
      alertMsg: `${
        data.title.length > 25 ? data.title.substr(0, 25) + "..." : data.title
      } added to cart`,
    });
    setProgress(100);
    setTimeout(() => {
      setAlert({ onOff: "off", type: "", alertMsg: "" });
    }, "3000");
  };

  return (
    <>
      {data && (
        <div className="container" style={{ margin: "65px auto 100px auto" }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              {data && data.bookshelves && data.bookshelves[0] && (
                <li className="breadcrumb-item active " aria-current="page">
                  {data.bookshelves[0]}
                </li>
              )}
            </ol>
          </nav>

          <div
            className="card"
            style={{ maxWidth: "540px", margin: "30px auto 00px auto" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={data.formats ? data.formats["image/jpeg"] : ""}
                  className="img-fluid rounded"
                  alt="..."
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{data.title}</h5>
                  {data.authors.map((author) => {
                    return (
                      <p className="card-text m-1" key={author.name}>
                        {author.name +
                          " ( " +
                          author.birth_year +
                          " - " +
                          author.death_year +
                          " ) "}
                      </p>
                    );
                  })}
                  <p className="card-text m-1">
                    Languages: {data.languages[0]}
                  </p>
                  <p className="card-text m-1">
                    Copyright: {data.copyright ? "True" : "False"}
                  </p>
                  <p className="card-text m-1">Media Type: {data.media_type}</p>
                  <p className="card-text m-1">
                    Download Count: {data.download_count}
                  </p>
                  <button
                    type="button"
                    className="btn btn-success my-2"
                    onClick={addToCart}
                  >
                    Add to cart <i className="fa-solid fa-cart-arrow-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
