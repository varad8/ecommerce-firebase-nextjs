import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function ProductDetails() {
  const [productdata, setProductData] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addProduct } = useContext(CartContext);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductData(response.data);
    });
  }, [id]);

  return (
    <>
      <Header />
      {productdata && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-5 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              {productdata && productdata.images && (
                <div className="lg:w-1/2 w-full flex flex-col justify-center  lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <img
                    alt="ecommerce"
                    className="h-full lg:h-auto w-full object-fit object-center rounded"
                    src={productdata.images[selectedImageIndex]}
                  />
                  <div className="flex gap-2 flex-wrap">
                    {/* Map and display images */}
                    {productdata?.images?.map((image, index) => (
                      <img
                        key={index}
                        alt="ecommerce"
                        className={`mt-3 shadow-md  lg:h-auto h-16 md:h-16 md:w-16 object-cover object-center border bg-white p-2 rounded ${
                          index === selectedImageIndex
                            ? "border border-indigo-500"
                            : ""
                        }`}
                        src={image}
                        onClick={() => setSelectedImageIndex(index)} // Update selected image index on click
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="lg:w-1/2 w-full ">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                  {productdata.title}
                </h1>
                <div className="border-b-2 border-indigo-500 mb-2 mt-3"></div>
                <p className="leading-relaxed mb-4">
                  {productdata.description}
                </p>

                {/* Map productdata.properties */}
                <div>
                  {productdata && productdata.properties && (
                    <div>
                      {Object.entries(productdata.properties).map(
                        ([propertyName, propertyValue]) => (
                          <div
                            key={propertyName}
                            className="flex border-t border-gray-200 py-2"
                          >
                            <span className="text-gray-500">
                              {propertyName}
                            </span>
                            <span className="ml-auto text-gray-900">
                              {propertyValue}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹ {productdata.price}
                  </span>
                  <button
                    onClick={() => addProduct(productdata._id)}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    Add To Cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
