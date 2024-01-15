import { useEffect, useState } from "react";

export default function Orders({ setProgress, setAlert }) {
  const [orderData, setOrderData] = useState([]);

  //Getting data from local storage
  const loadData = () => {
    setProgress(10);
    const orders = localStorage.getItem("orders");
    setOrderData(JSON.parse(orders));
    setProgress(100);
  };
  useEffect(() => {
    loadData();
    //eslint-disable-next-line
  }, []);

  //delete item
  const deleteItem = (i) => {
    setProgress(10);

    const orderExisting = JSON.parse(localStorage.getItem("orders"));

    orderExisting.splice(i, 1);

    setOrderData(orderExisting);

    localStorage.setItem("orders", JSON.stringify(orderExisting));

    //setting alert
    setAlert({
      onOff: "on",
      type: "success",
      alertMsg: `Deleted... 😒`,
    });
    setProgress(100);
    setTimeout(() => {
      setAlert({ onOff: "off", type: "", alertMsg: "" });
    }, "3000");
  };

  return (
    <>
      {orderData && orderData.length > 0 ? (
        <div className="container" style={{ margin: "65px auto 85px auto" }}>
          {orderData.map((e, i) => {
            return (
              <div className="card mb-3" key={e.id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={
                        e.formats.img && e.formats.img ? e.formats.img : "..."
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
                          ? e.title
                          : "Title not available for this book"}
                      </h5>
                      <p className="card-text">
                        {e.authors && e.authors[0]
                          ? e.authors[0].name
                          : "Author not available for this book"}
                      </p>
                      <p className="card-text">
                        <a
                          href={`${
                            e.formats.read ? e.formats.read : "/orders"
                          }`}
                          className="btn btn-primary"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Read
                        </a>
                        <a
                          href={`${
                            e.formats.download ? e.formats.download : "/orders"
                          }`}
                          className="btn btn-primary mx-2"
                          onClick={() => {
                            setProgress(10);

                            //setting alert
                            setAlert({
                              onOff: "on",
                              type: "success",
                              alertMsg: `See notification, It's downloading. 🥹`,
                            });
                            setProgress(100);
                            setTimeout(() => {
                              setAlert({
                                onOff: "off",
                                type: "",
                                alertMsg: "",
                              });
                            }, "3000");
                          }}
                        >
                          Download
                        </a>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteItem(i);
                          }}
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="container text-center"
          style={{ margin: "65px auto 100px auto" }}
        >
          Atleast buy something then come here 🤌 <br />
          Kya yrrrr.... <br />
          Please krlo yr buy koi si book to.... <br />
          Aisa kya krre...
        </div>
      )}
    </>
  );
}
