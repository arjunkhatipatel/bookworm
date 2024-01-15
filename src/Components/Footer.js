import React from "react";

function Footer() {
  return (
    <footer
      className="text-center  text-muted"
      style={{
        position: "fixed",
        width: "100%",
        bottom: "0",
        background: "#FAF9F6",
      }}
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-2">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with me on social networks:</span>
        </div>

        <div>
          <a
            href="https://www.x.com/arjunkhatipatel/"
            className="me-4 text-reset"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            href="https://www.instagram.com/arjunkhatipatel/"
            className="me-4 text-reset"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/arjunkhatipatel/"
            className="me-4 text-reset"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://www.github.com/arjunkhatipatel/"
            className="me-4 text-reset"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <div
        className="text-center p-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        Designed with ❤️ by{" "}
        <a className="text-reset fw-bold" href="https://arjunpatel.tech/">
          Arjun Patel
        </a>
      </div>
    </footer>
  );
}

export default Footer;
