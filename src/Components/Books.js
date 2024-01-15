import { useEffect, useState } from "react";
import Item from "./Item";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Books({ setProgress }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState();

  const loadBooks = async () => {
    setProgress(10);
    const responce = await fetch("https://gutendex.com/books/");
    setProgress(40);
    const result = await responce.json();
    setProgress(80);
    setData(result.results);
    setTotalItem(result.count);
    setProgress(100);
  };

  const updateBooks = async () => {
    const responce = await fetch(
      `https://gutendex.com/books/?page=${page + 1}`
    );
    const result = await responce.json();
    setData([...data, ...result.results]);
    setPage(page + 1);
  };

  useEffect(() => {
    loadBooks();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={data.length} //This is important field to render the next data
        next={updateBooks}
        hasMore={data.length !== totalItem}
        loader={
          <div className="container my-0">
            <div className="row">
              <div className="col-md-3 my-2">
                <div className="card placeholder-glow">
                  <div
                    className="card-img-top placeholder"
                    style={{ width: "100%", height: "230px" }}
                  ></div>
                  <div className="card-body">
                    <h5 className="card-title ">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text ">
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                    <a
                      href="/"
                      className="btn btn-primary disabled placeholder col-4"
                      aria-disabled="true"
                    >
                      {" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container" style={{ margin: "65px auto 0px auto" }}>
          <div className="row">
            {data.map((e) => {
              return (
                <div className="col-md-3 my-2" key={e.id}>
                  <Item
                    title={
                      e.title ? e.title : "Title not available for this book"
                    }
                    imgSrc={
                      e.formats["image/jpeg"] ? e.formats["image/jpeg"] : ""
                    }
                    author={
                      e.authors[0]
                        ? e.authors[0].name
                        : "Author not available for this book"
                    }
                    id={e.id ? e.id : "Id not available for this book"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
