import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import Cart from "./Screens/Cart";
import { useCart } from "./contextReducer";

const Navbar = () => {

  const data = useCart() || [];
  const [cartView, setCartView] = useState(false);
  const handleLogout = () => {
    alert("are you sure");
    localStorage.removeItem("authToken");
  };
  
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundImage: "linear-gradient(#813531,#141414)" }}
    >
      <div className="container-fluid ">
        <Link
          className="navbar-brand fs-1 fst-italic"
          to="/"
          style={{ color: "#ffb80e" }}
        >
          Hungers
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto ">
            <li className="nav-item">
              <Link
                className="nav-link text-white fs-5 pt-2 "
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item">
                <Link
                  className="nav-link text-white fs-5"
                  aria-current="page"
                  to="/myorders"
                >
                  My Orders
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-success text-white mx-2" to="/login">
                <b>Login</b>
              </Link>
              <Link
                className="btn mx-2"
                style={{ backgroundColor: "#ffb80e", color: "#813531" }}
                to="/createuser"
              >
                <b>Signup </b>
              </Link>
            </div>
          ) : (
            <>
              <div
                className="btn bg-white text-success mx-2"
                onClick={() => {
                  setCartView(true);
                }}
              >
                My Cart{" "}
                <Badge pill bg="danger">
                  {data.length}
                </Badge>
              </div>
              {cartView ? (
                <Modal
                  onClose={() => {
                    setCartView(false);
                  }}
                >
                  <Cart />
                </Modal>
              ) : null}
              <Link
                className="btn bg-danger text-white mx-2"
                onClick={handleLogout}
                to="/login"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
