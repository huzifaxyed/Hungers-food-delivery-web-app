import React from "react";
import { useCart, useDispatchCart } from "../contextReducer";
const Cart = () => {
  const dispatch = useDispatchCart();
  const data = useCart();
  if (data.length === 0) {
    return (
      <div
        className="text-center fs-3 bg-dark text-success"
        style={{ height: "80vh" }}
      >
        No items yet!
      </div>
    );
  }
  const handleCheckOut = async () => {
    let email = localStorage.getItem("userEmail");
    const data2 = {
      order_data: data,
      email: email,
      order_date: new Date().toDateString(),
    };
    let response = await fetch("http://localhost:9090/api/createorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    });

    dispatch({ type: "DROP" });
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      {" "}
      <div className="container m-auto mt-5 table-responsive-sm table-responsive-md">
        <table className="table ">
          <thead className="text-success">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {data.map((food, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h1 className="text-white">Total Price :{totalPrice}</h1>
        </div>
      </div>
      <button className="btn btn-success text-white" onClick={handleCheckOut}>
        Check Out
      </button>
    </div>
  );
};

export default Cart;
