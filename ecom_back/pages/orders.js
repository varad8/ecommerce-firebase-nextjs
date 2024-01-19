import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <>
      <Layout>
        <h1>Orders</h1>
        <table className="basic">
          <thead>
            <tr>
              <th>DATE</th>
              <th>PAID</th>
              <th>RECUOIENTS</th>
              <th>PRODUCTS</th>
              <th>TRACKING NO</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td
                    className={order.paid ? "text-green-600" : "text-red-600"}
                  >
                    {order.paid ? "YES" : "NO"}
                  </td>
                  <td>
                    {order.name} {order.email}
                    <br />
                    {order.city}
                    {order.postalCode} {order.country}
                    <br />
                    {order.streetAddress}
                  </td>
                  <td>
                    {order.line_items.map((l) => (
                      <>
                        {l.price_data?.product_data.name} x {l.quantity}
                      </>
                    ))}
                  </td>
                  <td>{order.trackingno}</td>
                  <td>
                    <Link
                      className="btn-primary"
                      href={"/orders/edit/" + order._id}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Layout>
    </>
  );
}
