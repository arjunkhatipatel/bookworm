import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Search({ setProgress }) {
  const { searchParam } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState();
  const [searching, setSearching] = useState("");

  const loadResult = async () => {
    setSearching("Searching");
    setProgress(10);
    const url = `https://gutendex.com/books?search=${searchParam}`;
    setProgress(40);
    const response = await fetch(url);
    setProgress(70);
    const result = await response.json();
    setSearching("");
    setTotalItem(result.count);
    setData(result.results);
    setProgress(100);
  };

  const updateResult = async () => {
    const url = `https://gutendex.com/books/?page=${
      page + 1
    }&search=${searchParam}`;
    const response = await fetch(url);
    const result = await response.json();
    setData([...data, ...result.results]);
    //updating page number
    setPage(page + 1);
  };

  useEffect(() => {
    loadResult();
    //eslint-disable-next-line
  }, [searchParam]);

  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        hasMore={data.length !== totalItem}
        next={updateResult}
        loader={
          <div className="container">
            <div className="card mb-3 my-3">
              <div className="row g-0">
                <div className="col-md-4 placeholder-glow">
                  <div
                    className="img-fluid rounded-start placeholder"
                    style={{ width: "360px", height: "250px" }}
                  ></div>
                </div>
                <div className="col-md-8">
                  <div className="card-body placeholder-glow">
                    <h5 className="card-title placeholder col-8"> </h5>
                    <p className="card-text  placeholder col-6"></p>
                    <p className="card-text">
                      <a
                        href="/"
                        className="btn btn-primary disabled placeholder col-4"
                        aria-disabled="true"
                      >
                        {" "}
                      </a>
                    </p>
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
        {data && (
          <div className="container" style={{ margin: "65px auto 10px auto" }}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  Total Results: {totalItem > 0 ? totalItem : searching}
                </li>
              </ol>
            </nav>
            {data.map((e) => {
              return (
                <div className="card mb-3" key={e.id}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={
                          e.formats && e.formats["image/jpeg"]
                            ? e.formats["image/jpeg"]
                            : "..."
                        }
                        className="img-fluid rounded-start"
                        alt="..."
                        style={{ width: "360px", height: "250px" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {e.title
                            ? e.title.length > 50
                              ? e.title.substr(0, 50)
                              : e.title
                            : "Title not available for this book"}
                        </h5>
                        <p className="card-text">
                          {e.authors && e.authors[0]
                            ? e.authors[0].name
                            : "Author not available for this book"}
                        </p>
                        <p className="card-text">
                          <Link
                            to={`/book/${e.id}`}
                            className="btn btn-primary"
                          >
                            See more
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </InfiniteScroll>
    </>
  );
}
