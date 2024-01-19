import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import Link from "next/link";
import generateTrackingNumber from "@/components/TrackIngNo";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [personalInfo, setPersonalInfo] = useState({});
  const [trackingno, setTrackingNO] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    axios
      .get("/api/personalinfo?userid=" + session?.user?.id)
      .then((response) => {
        if (response.data) {
          setPersonalInfo(response.data);
        }
      });
  }, [session?.user?.id]);

  useEffect(() => {
    setTrackingNO(generateTrackingNumber());
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      userid: personalInfo?.userid,
      fullname: personalInfo?.fullname,
      email: personalInfo?.email,
      phoneno: personalInfo?.phoneno,
      streetaddress: personalInfo?.streetaddress,
      landmark: personalInfo?.landmark,
      village: personalInfo?.village,
      district: personalInfo?.district,
      state: personalInfo?.state,
      postalcode: personalInfo?.postalcode,
      country: personalInfo?.country,
      shipping_address: personalInfo?.shipingaddress,
      cartProducts,
      trackingno,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0; // Default to 0 if product not found
    total += price;
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("success")
    ) {
      setIsSuccess(true);
      clearCart(); // Clear the cart when the order is successful
    }
  }, []);

  if (isSuccess) {
    return (
      <>
        <Header />
        <div className="flex justify-center p-2">
          <div className="border w-fit h-fit py-6 px-6 rounded-md shadow-md">
            <h1 className="text-3xl font-bold">Thanks for your order!</h1>
            <p className="mt-2 mb-5">
              We will email you when your order will be sent
            </p>
            <Link
              href="/tracking/trackorder"
              className="text-md text-white rounded-lg py-2 px-6 mt-3 bg-black"
            >
              Track Order Here
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2">
        {/* First element */}
        <div className="bg-white border  rounded-lg shadow-md">
          <h2 className="text-2xl mt-3 mb-3 p-4">Cart</h2>
          {!cartProducts?.length && (
            <p className="p-4  text-xl">Your cart is empty</p>
          )}
          {/* {List Here Products} */}
          {products?.length > 0 && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-40 h-40">
                        <img src={product.images[0]} alt="Apple Watch" />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </div>
                          <button
                            className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        ₹
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </a>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      Total ₹ {total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Second element */}
        {!!products?.length && personalInfo && (
          <div className="bg-white border p-4 rounded-lg shadow-md h-fit w-full">
            <h2 className="text-2xl mt-3 mb-3">Order Information</h2>

            <p>
              <strong>Address:</strong> {personalInfo?.streetaddress} &nbsp;
              {personalInfo?.landmark}&nbsp;
              {personalInfo?.village}&nbsp; {personalInfo?.district}
              &nbsp; {personalInfo?.postalcode}&nbsp;
              {personalInfo?.state}&nbsp; {personalInfo?.country}
            </p>
            <div className="mb-2 mt-3">
              <strong> Shipping Address:</strong>
              <ul>
                <li>
                  Customer Name: {personalInfo?.shipingaddress?.customername}
                </li>
                <li>
                  Customer Email: {personalInfo?.shipingaddress?.customeremail}
                </li>
                <li>
                  Customer Mobile:{" "}
                  {personalInfo?.shipingaddress?.customermobile}
                </li>
                <li>
                  Customer Street Address:{" "}
                  {personalInfo?.shipingaddress?.customerstreetaddress}
                </li>
                <li>
                  Customer State: {personalInfo?.shipingaddress?.customerstate}
                </li>
                <li>
                  Customer Country:{" "}
                  {personalInfo?.shipingaddress?.customercountry}
                </li>
                <li>
                  Customer Postal Code:{" "}
                  {personalInfo?.shipingaddress?.customerpostalcode}
                </li>
                <li>
                  Customer Landmark:{" "}
                  {personalInfo?.shipingaddress?.customerlandmark}
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 justify-center items-center">
              <Link
                href={`/account/new`}
                className="mt-2 text-blue-600 hover:underline"
              >
                Add Address
              </Link>
              <Link
                href={`/account/edit/${session?.user?.id}`}
                className="mt-2 text-blue-600 hover:underline"
              >
                Edit Addresses
              </Link>
            </div>

            {/* <input
              type="text"
              value={name}
              name="name"
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Name"
              className="inputP"
            />

            <input
              type="text"
              value={email}
              name="email"
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="Email"
              className="inputP"
            />

            <input
              type="number"
              maxLength={10}
              value={phone}
              name="phone"
              onChange={(ev) => setPhone(ev.target.value)}
              placeholder="Phone No"
              className="inputP"
            />

            <div className="flex gap-2 flex-nowrap">
              <input
                type="text"
                value={city}
                name="city"
                onChange={(ev) => setCity(ev.target.value)}
                placeholder="City"
                className="inputP"
              />
              <input
                type="number"
                value={postalCode}
                name="postalCode"
                onChange={(ev) => setPostalCode(ev.target.value)}
                placeholder="Postal Code"
                className="inputP"
              />
            </div>

            <input
              type="text"
              value={streetAddress}
              name="streetAddress"
              onChange={(ev) => setStreetAddress(ev.target.value)}
              placeholder="Street Address"
              className="inputP"
            />

            <input
              type="text"
              value={country}
              name="country"
              onChange={(ev) => setCountry(ev.target.value)}
              placeholder="Name"
              className="inputP"
            /> */}

            <button onClick={goToPayment} className="btnPay">
              Continue to Payment
            </button>
          </div>
        )}
      </div>
    </>
  );
}
