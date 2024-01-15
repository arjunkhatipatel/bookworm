import { Link, useSearchParams } from "react-router-dom";

export default function Item({ title, imgSrc, author, id }) {
  const [searchParams] = useSearchParams({ id });
  return (
    <>
      <div className="card">
        <img
          src={imgSrc}
          className="card-img-top"
          alt="..."
          style={{ height: "250px" }}
        />
        <div className="card-body">
          <h5 className="card-title">
            {title.length > 50 ? title.substr(0, 50) + "..." : title}
          </h5>
          <p className="card-text">{author}</p>
          <Link
            to={`/book/${id}`}
            search={searchParams.toString()}
            className="btn btn-primary"
          >
            See more
          </Link>
        </div>
      </div>
    </>
  );
}
