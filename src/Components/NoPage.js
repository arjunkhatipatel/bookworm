import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <>
      <div className="container">
        <p className="text-center" style={{ margin: "65px auto 0 auto" }}>
          Ohooo... Wrong URL!!! <br />
          This page does not exist. <Link to="/">Go to Home page.</Link>
        </p>
      </div>
    </>
  );
}
