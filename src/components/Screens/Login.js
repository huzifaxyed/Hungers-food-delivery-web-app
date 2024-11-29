import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9090/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const res = await response.json();
    if (!res.success) {
      alert("Enter valid credentials");
    } else {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("authToken", res.authToken);
      navigate("/");
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <section className="bg-dark" style={{ height: "100vh" }}>
        <div
          style={{ width: "100%", height: "100%" }}
          className="container-fluid"
        >
          <div className="row">
            <div className="col-sm-6 text-white">
              <div style={{ paddingLeft: "5rem", marginTop: "4rem" }}>
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                ></i>
                <span className="h1 fw-bold mb-0 text-warning">Hungers</span>
              </div>

              <div
                className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5"
                style={{ paddingLeft: "5rem", paddingTop: "5rem" }}
              >
                <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Log in
                  </h3>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example18"
                      className="form-control form-control-lg bg-warning"
                      value={email}
                      onChange={emailHandler}
                    />
                    <label className="form-label" htmlFor="form2Example18">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example28"
                      className="form-control form-control-lg"
                      style={{backgroundColor:"#ffb80e"}}
                      value={password}
                      onChange={passwordHandler}
                    />
                    <label className="form-label" htmlFor="form2Example28">
                      Password
                    </label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      type="submit"
                      className="btn btn-warning btn-lg btn-block"
                    >
                      Login
                    </button>
                  </div>

                  <p>
                    Don't have an account?{" "}
                    <Link to="/createuser" className="link-info">
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>

            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="https://media.istockphoto.com/id/1303370330/photo/flat-lay-of-friends-having-quarantine-home-party-with-fast-food.jpg?s=612x612&w=0&k=20&c=IkEcw3XvE8MSvXxgqJ2ZLqrVNALLJt4YSwbj1HLiW_Q="
                alt="Login image"
                style={{
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover",
                  objectPosition: "left",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
