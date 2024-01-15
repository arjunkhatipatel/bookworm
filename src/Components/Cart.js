import { useEffect, useState } from "react";

export default function Cart({ setProgress, setAlert }) {
  const [cartItem, setCartItem] = useState([]);

  const loadData = () => {
    setProgress(10);
    const cart = localStorage.getItem("cart");
    setCartItem(JSON.parse(cart));
    setProgress(100);
  };

  useEffect(() => {
    loadData();

    //eslint-disable-next-line
  }, []);

  //Function to remove all items from cart
  const removeAll = () => {
    localStorage.removeItem("cart");
    //clear state
    try {
      if (cartItem) {
        setCartItem([]);
        setAlert({
          onOff: "on",
          type: "warning",
          alertMsg: `Removed all 🥲`,
        });
      } else {
        setAlert({
          onOff: "on",
          type: "warning",
          alertMsg: `Nothing to remove 🥲`,
        });
      }
    } catch (error) {
      setAlert({
        onOff: "on",
        type: "warning",
        alertMsg: `Some error occured 🥲 ${error}`,
      });
    }
    setTimeout(() => {
      setAlert({ onOff: "off", type: "", alertMsg: "" });
    }, 3000);
  };

  const removeOne = (index) => {
    //remove item from state
    const updatedCart = [...cartItem];
    updatedCart.splice(index, 1);
    setCartItem(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setAlert({
      onOff: "on",
      type: "warning",
      alertMsg: `Removed that book 😑`,
    });
    setTimeout(() => {
      setAlert({ onOff: "off", type: "", alertMsg: "" });
    }, 3000);
  };

  const buyOne = (index) => {
    const cart = [...cartItem];
    const item = cart[index];

    const orders = localStorage.getItem("orders");
    const orderData = orders ? JSON.parse(orders) : [];

    orderData.push(item);
    localStorage.setItem("orders", JSON.stringify(orderData));

    removeOne(index);

    setAlert({
      onOff: "on",
      type: "info",
      alertMsg: `Order success 🥳`,
    });
    setTimeout(() => {
      setAlert({ onOff: "off", type: "", alertMsg: "" });
    }, 3000);
  };

  const buyAll = () => {
    const orders = JSON.parse(localStorage.getItem("orders"));
    const orderData = orders ? orders : [];

    localStorage.setItem("orders", JSON.stringify(orderData.concat(cartItem)));

    removeAll();

    setAlert({
      onOff: "on",
      type: "info",
      alertMsg: `Order success 🥳`,
    });
    setTimeout(() => {
      setAlert({ onOff: "off", type: "", alertMsg: "" });
    }, 3000);
  };

  return (
    <>
      <div
        className="container d-flex flex-column align-items-center"
        style={{ marginTop: "65px", marginBottom: "80px" }}
      >
        <div className="my-2 ">
          <button
            type="button"
            className="btn btn-success mx-2"
            onClick={buyAll}
          >
            Buy All
          </button>
          <button
            type="button"
            className="btn btn-danger mx-2"
            onClick={removeAll}
          >
            Remove All
          </button>
        </div>
        <div>
          {cartItem && cartItem.length > 0
            ? cartItem.map((e, index) => {
                return (
                  <div className="card mb-3 my-3" key={e.id}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={e.formats.img}
                          className="img-fluid rounded-start"
                          alt="..."
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            {e.title.length > 50
                              ? e.title.substr(0, 50)
                              : e.title}
                          </h5>
                          <p className="card-text">{e.authors[0].name}</p>
                        </div>
                        <div className="my-2">
                          <button
                            type="button"
                            className="btn btn-success mx-2"
                            onClick={() => {
                              buyOne(index);
                            }}
                          >
                            Buy
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-2"
                            onClick={() => {
                              removeOne(index);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : "Nothing to show 😒"}
        </div>
      </div>
    </>
  );
}
