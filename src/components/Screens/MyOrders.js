import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [data, setData] = useState(null); // Initial state is null
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchData = async () => {
    let email = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:9090/api/myorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    try {
      let res = await response.json();
      setData(res.orderData.order_data);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else if (data === null) {
    <div>No data yet</div>;
  }

  return (
    <div className="bg-dark text-white" style={{ height: "100vh" }}>
      <h1>My Orders</h1>
      {data ? (
        data.map((order, orderIndex) => (
          <div key={orderIndex}>
            <h2>Order {orderIndex + 1}</h2>
            <table
              className="bg-dark text-success"
              border={4}
              cellPadding={5}
              style={{ width: "100%", marginBottom: "20px" }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order
                  .filter((item) => item.Order_date === undefined)
                  .map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{item.size}</td>
                      <td>${item.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
