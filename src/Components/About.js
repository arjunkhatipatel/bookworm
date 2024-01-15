import { useEffect } from "react";

export default function About({ setProgress }) {
  useEffect(() => {
    setProgress(10);
    setProgress(40);
    setProgress(70);
    setProgress(100);
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <div
        className="container"
        style={{
          maxWidth: "540px",
          margin: "65px auto 100px auto",
          textAlign: "justify",
        }}
      >
        <h1>About Us - BookWorm</h1>
        <p>
          Welcome to BookWorm, a passion project by{" "}
          <a
            href="https://arjunpatel.tech/"
            className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
          >
            Arjun Patel
          </a>
          . As a book enthusiast, I've created this virtual haven to share my
          love for literature and storytelling.
        </p>
        <h3>Our Story</h3>
        <p>
          Born out of a genuine love for books, BookWorm is a curated collection
          of literary treasures handpicked for fellow book lovers. This dummy
          e-commerce project is a reflection of my dedication to creating a
          space where the joy of reading knows no bounds.
        </p>
        <h3>Diverse Selection</h3>
        <p>
          Explore our carefully curated selection that caters to various tastes
          and preferences. From classic tales to contemporary wonders, BookWorm
          offers a diverse range of books, each chosen with care to ensure a
          delightful reading experience.
        </p>
        <h3>Exceptional Service</h3>
        <p>
          Your satisfaction is at the heart of BookWorm. Enjoy a seamless online
          shopping experience, from easy browsing to reading. This dummy
          e-commerce project aims to provide exceptional service, mirroring the
          commitment of a real bookstore.
        </p>
        <h3>Mission Statement</h3>
        <p>
          BookWorm is not just a bookstore; it's a virtual world where books
          come to life. Through this project, I aspire to share the joy of
          reading, spark imaginations, and create a haven for book enthusiasts
          like you. Thank you for being a part of this literary journey.
          Explore, discover, and immerse yourself in the wonderful world of
          books.
        </p>
        <p>Happy reading!</p>
        <p>
          <a
            href="https://arjunpatel.tech/"
            className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
          >
            Arjun Patel
          </a>{" "}
          - Founder of BookWorm
        </p>
      </div>
    </>
  );
}
