export default function Alert({ alert, setAlert }) {
  return (
    <>
      {alert.onOff === "on" ? (
        <div
          className={`alert alert-${alert.type} m-0 fade show container-fluid`}
          role="alert"
          style={{
            borderRadius: "0",
            position: "fixed",
            width: "100%",
            top: "0",
            zIndex: "10",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {alert.alertMsg}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => {
              setAlert({
                onOff: "off",
                type: "",
                alertMsg: "",
              });
            }}
          ></button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
