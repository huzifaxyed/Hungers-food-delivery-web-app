import React, { useEffect, useState } from "react";
import { useCart, useDispatchCart } from "./contextReducer";

const Cards = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  let [quantity, setQuantity] = useState(1);
  let [size, setSize] = useState();

  useEffect(() => {
    setSize(Object.keys(props.foodItems.options[0])[0]);
  }, [props.foodItems.options]);

  let img = props.foodItems.img;
  let name = props.foodItems.name;
  let id = props.foodItems._id;

  // Options
  let options = props.foodItems.options[0];
  let options2 = Object.entries(options);

  let totalPrice = quantity * (size ? options[size] : 0);

  const handleAddToCart = () => {
    let food = [];
    for (const item of data) {
      if (item.id === id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        dispatch({ type: "UPDATE", id: id, price: totalPrice, qty: quantity });
        return;
      } else if (food.size !== size) {
        dispatch({
          type: "ADD",
          id: id,
          name: name,
          price: totalPrice,
          qty: quantity,
          size: size,
        });
        return;
      }
      return;
    }
    dispatch({
      type: "ADD",
      id: id,
      name: name,
      price: totalPrice,
      qty: quantity,
      size: size,
    });
  };

  return (
    <div className="card text-dark" style={{ width: "17rem" ,marginBottom:"10px",marginRight:"20px", backgroundColor:"#ffb80e"}}>
      <img
        className="card-img-top"
        src={img}
        alt="Card cap"
        style={{ height: "150px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
      <div>
        {" "}
        <select
          className="m-2 h-100% bg-success text-white rounded"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        >
          {" "}
          {Array.from(Array(6), (v, i) => {
            return (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            );
          })}{" "}
        </select>{" "}
        <select
          className="m-2 h-100% bg-success text-white rounded"
          onChange={(e) => {
            setSize(e.target.value);
          }}
        >
          {options2.map((v, i) => {
            return (
              <option key={i} value={v[0]}>
                {v[0]}
              </option>
            );
          })}
        </select>{" "}
        <div className="d-inline h-100">
          <b>Rs{totalPrice}/=</b>
        </div>{" "}
      </div>
      <hr />
      <button className="btn btn-success text-white" style={{border:"3px solid white"}} onClick={handleAddToCart}>
        Add To Cart
      </button>
    </div>
  );
};

export default Cards;
