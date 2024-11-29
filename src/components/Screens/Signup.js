import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setGeolocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9090/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        location: location,
      }),
    });
    const res = await response.json();

    if (!res.success) {
      let res2 = res.errors.map((v) => {
        return v.path;
      });
      alert("Please Enter " + res2 + " correctly");
    } else {
      alert("user signed up successfully");
      navigate("/login");
    }
  };

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/02/47/38/12/240_F_247381272_gNeByJcAbH9UAzT03HAUAJgrQsZQLz3s.jpg')",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div
                  style={{ maxHeight: "99vh", borderRadius: "15px" }}
                  className="card-body p-5 bg-dark text-white"
                >
                  <h2 className="text-uppercase text-center mb-5 text-warning">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit}>
                    
                    {/* Name Field */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg text-black bg-warning"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example1cg">
                        Your Name
                      </label>
                    </div>

                    {/* Email Field */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg text-black bg-warning"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    {/* Password Field */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg text-black bg-warning"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                    </div>

                    {/* Geolocation Field */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example5cg"
                        className="form-control form-control-lg text-black bg-warning"
                        value={location}
                        onChange={(e) => setGeolocation(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example5cg">
                        Address
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>
                    <p className="text-start">
                      Already have an account?{" "}
                      <Link to="/login" className=" text-body">
                        <u className=" text-primary">Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
