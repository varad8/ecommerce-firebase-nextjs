import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout"; // Make sure to import Layout correctly
import { useRouter } from "next/router";
import Link from "next/link";
import ProductBox from "@/components/ProductBox";

export default function EditOrderStatusPage() {
  const [orderData, setOrderData] = useState({});
  const [productInfo, setProductInfo] = useState([]);
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const [deliverStatus, setDeliverStatus] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const optionsForDelivery = [
    "pending",
    "dispatched",
    "shipped",
    "on the way",
    "cancelled",
    "out for delivery",
    "delivered",
  ];

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/orders?id=" + id).then((response) => {
      setOrderData(response.data);

      if (response.data?._id) {
        const productids = response.data.productIds.map((item, index) => {
          return item; // Collect product ids
        });

        axios
          .get("/api/products?productids=" + productids.toString())
          .then((response) => {
            setProductInfo(response.data);
          });
      }
    });
  }, [id]);

  function saveOrderStatus(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const newStatusObject = {
      status: newOrderStatus,
      date: new Date(),
    };

    // Update order status using PUT request

    const _id = orderData._id;

    axios
      .put("/api/orders", {
        _id,
        order_status: newStatusObject,
        newDeliverStatus: deliverStatus,
      })
      .then((response) => {
        console.log(response.data);

        // Update the orderData state to reflect the new status
        setOrderData((prevData) => ({
          ...prevData,
          order_status: [...prevData.order_status, newStatusObject],
        }));
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  }

  return (
    <Layout>
      <h1>Edit Order Status</h1>

      <div className="p-4 border rounded-sm">
        {orderData && (
          <>
            {/* Recipient Details */}
            <h3 className="font-bold">Recipient Details</h3>
            <label>Full Name :</label> {orderData.fullname}
            <br />
            <label>Email :</label> {orderData.email} <br />
            <label>Phone No :</label> {orderData.phoneno} <br />
            <label>Address :</label> {orderData.streetaddress}{" "}
            {orderData.landmark} {orderData.village} {orderData.district}{" "}
            {orderData.state} {orderData.country}-{orderData.postalcode}
            <div className="border-b mt-3 mb-3"></div>
            {/* Shipping Details */}
            <h3 className="font-bold">Shipping Details</h3>
            <label>Customer Name :</label>{" "}
            {orderData.shipping_address?.customername} <br />
            <label>Customer Email :</label>{" "}
            {orderData.shipping_address?.customeremail} <br />
            <label>Customer Mobile :</label>{" "}
            {orderData.shipping_address?.customermobile} <br />
            <label>Customer Address :</label>{" "}
            {orderData.shipping_address?.customerstreetaddress}{" "}
            {orderData.shipping_address?.customerlandmark}{" "}
            {orderData.shipping_address?.customerstate}{" "}
            {orderData.shipping_address?.customercountry}{" "}
            {orderData.shipping_address?.customerpostalcode}
            <div className="border-b mt-3 mb-3"></div>
            {/* Product Details */}
            <h3 className="font-bold">Product Details</h3>
            {productInfo && (
              <ProductBox
                productInfo={productInfo}
                orderTrackData={orderData}
              />
            )}
            {orderData?.line_items?.map((l) => (
              <>
                <label>
                  Paid :{" "}
                  <span
                    className={
                      orderData.paid ? "text-green-600" : "text-red-600 "
                    }
                  >
                    {orderData.paid ? "YES" : "NO"}
                  </span>
                </label>
              </>
            ))}
          </>
        )}
      </div>

      <form className="mt-2" onSubmit={saveOrderStatus}>
        <label>Add Order Status</label>
        <input
          type="text"
          value={newOrderStatus}
          onChange={(ev) => setNewOrderStatus(ev.target.value)}
        />

        <select
          value={deliverStatus}
          onChange={(ev) => setDeliverStatus(ev.target.value)}
        >
          {optionsForDelivery.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>

      <table className="basic mt-4">
        <thead>
          <tr>
            <th>Order Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderData.order_status &&
            orderData.order_status.map((st, index) => (
              <tr key={index}>
                <td>{st.status}</td>
                <td>{new Date(st.date).toLocaleString()}</td>
                <td>
                  <Link
                    className="btn-default"
                    href={"/api/orders/track/" + orderData._id}
                  >
                    Track
                  </Link>
                </td>
              </tr>
            ))}
          <tr className="bg-indigo-200">
            <td colspan="3">{orderData.deliver_staus}</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
}
