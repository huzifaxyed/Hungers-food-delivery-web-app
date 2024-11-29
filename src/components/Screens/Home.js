import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Cards from "../Cards";
const Home = () => {
  let [search, setSearch] = useState("");
  let [foodItems, setfoodItems] = useState([]);
  let [foodCat, setfoodCat] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/foodData", {
        method: "POST",
      });
      const res = await response.json();
      setfoodItems(res[0]);
      setfoodCat(res[1]);
    } catch (errors) {
      alert("server is not responding");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#1c1c1c" }}>

        <div>
          <Navbar />
        </div>

          {/* Carousal Start */}
        <div>
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-caption" style={{ zIndex: "3" }}>
                {" "}
                <div className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2 text-white bg-dark"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="carousel-item active">
                <img
                  height="600px"
                  src="https://images.squarespace-cdn.com/content/v1/5ec1febb58a4890157c8fbeb/19ebb9ed-4862-46e1-9f7c-4e5876730227/Beetroot-Burger.jpg"
                  style={{ filter: "brightness(40%)", objectFit: "cover" }}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  height="600px"
                  src="https://www.allrecipes.com/thmb/aefJMDXKqs42oAP71dQuYf_-Qdc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6776_Pizza-Dough_ddmfs_4x3_1724-fd91f26e0bd6400a9e89c6866336532b.jpg"
                  style={{ filter: "brightness(40%)", objectFit: "cover" }}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  height="600px"
                  src="https://www.shellyfoodspot.com/wp-content/uploads/2023/01/Veggie-momos-recipeVegan-momos--scaled-735x712.jpg"
                  style={{ filter: "brightness(40%)", objectFit: "cover" }}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
         </div>
          {/* Carousal End */}
          
        <div
          className="container"
          style={{
            backgroundImage: "linear-gradient(to right,#813531,#141414)",
            marginTop: "10px",
            marginBottom: "10px",
            border: "1px solid #d8be07",
            borderRadius: "1%",
          }}
        >
          {foodCat != [] ? (
            foodCat.map((v, i) => {
              return (
                <div className=" row mb-3" key={i}>
                  <div className="text-white" key={v._id}>
                    <b>{v.CategoryName}</b>
                  </div>
                  <hr />
                  {foodItems != [] ? (
                    foodItems
                      .filter(
                        (items) =>
                          items.CategoryName === v.CategoryName &&
                          items.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .map((v, i) => {
                        return (
                          <div className="col-12 col-md-6 col-lg-3">
                            <Cards foodItems={v} key={i} />
                          </div>
                        );
                      })
                  ) : (
                    <div>No Such Data</div>
                  )}
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
