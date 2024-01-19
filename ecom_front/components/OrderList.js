import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function OrderList({ userid }) {
  const [orderData, setOrderData] = useState("");

  useEffect(() => {
    if (!userid) {
      return;
    }
    axios.get("/api/orders?userid=" + userid).then((response) => {
      setOrderData(response.data);
    });
  }, [userid]);

  return (
    <div className="overflow-x-auto">
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderData.length > 0 &&
            orderData.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data.name} x {l.quantity}
                    </>
                  ))}
                </td>
                <td>
                  <Link
                    href={"/orders/track/" + order.trackingno}
                    className="bg-gray-700 px-4 py-2 rounded-lg text-white"
                  >
                    Track
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
