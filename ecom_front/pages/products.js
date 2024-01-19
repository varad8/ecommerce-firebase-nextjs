import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import Link from "next/link";
import Header from "@/components/Header";
import axios from "axios";
import { Product } from "@/lib/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import FooterPage from "@/components/Footer";

export default function ProductPage({ products }) {
  const [showFirstContainer, setShowFirstContainer] = useState(false);
  const { addProduct } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [filteredata, setFilterData] = useState([]);

  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);
  const [selectedPropertyFilters, setSelectedPropertyFilters] = useState({});

  useEffect(() => {
    axios.get("/api/categoryfilter").then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    const filters = {
      title: selectedCategoryFilters,
      properties: selectedPropertyFilters, // No need to stringify here
    };

    // Check if any filter is provided
    if (filters.title || Object.keys(filters.properties).length > 0) {
      console.log(filters);

      // Prepare the query parameters
      const params = new URLSearchParams();
      if (filters.title) {
        params.append("title", filters.title);
      }
      if (Object.keys(filters.properties).length > 0) {
        params.append("properties", JSON.stringify(filters.properties));
      }

      // Make the API request
      axios
        .get(`/api/filterProducts?${params.toString()}`)
        .then((response) => {
          setFilterData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedCategoryFilters, selectedPropertyFilters]);

  const toggleContainer = () => {
    setShowFirstContainer(!showFirstContainer);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="flex">
          <div
            className={
              (showFirstContainer
                ? "left-0 w-80 p-4 bg-gray-200 border h-screen"
                : "-left-full") +
              " top-0 p-4 fixed  z-10 bg-gray-200 w-48 h-full md:static md:auto lg:w-auto transition-all overflow-scroll"
            }
          >
            <h2 className="text-2xl font-normal">Filter</h2>

            {categories.length > 0 && (
              <div>
                <ul>
                  {categories.map((category) => (
                    <li key={category._id}>
                      <div
                        className={`py-2 px-3 ${
                          category.parent ? "bg-white " : ""
                        }`}
                      >
                        {category.parent && (
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2"
                              onChange={(e) => {
                                const categoryName = category.name;
                                setSelectedCategoryFilters((prevFilters) =>
                                  e.target.checked
                                    ? [...prevFilters, categoryName]
                                    : prevFilters.filter(
                                        (name) => name !== categoryName
                                      )
                                );
                              }}
                            />
                            {category.name}
                          </label>
                        )}

                        {!category.parent && (
                          <h4 className="font-semibold">{category.name}</h4>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <h3 className="text-md font-normal mt-2 mb-2">Properties</h3>
                <ul>
                  {(() => {
                    // Use an object to store property names and their unique values
                    const propertiesMap = {};

                    // Iterate through categories and properties to populate the object
                    categories.forEach((category) => {
                      category.properties.forEach((property) => {
                        if (!propertiesMap[property.name]) {
                          propertiesMap[property.name] = new Set();
                        }
                        property.values.forEach((value) => {
                          propertiesMap[property.name].add(value);
                        });
                      });
                    });

                    // Render the property names and their unique values
                    return Object.keys(propertiesMap).map((propertyName) => (
                      <li key={propertyName}>
                        <h4 className="font-semibold">{propertyName}</h4>
                        <ul className="bg-white py-2 px-3 mt-2 mb-2">
                          {Array.from(propertiesMap[propertyName]).map(
                            (value) => (
                              <li key={value}>
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    className="mr-2"
                                    onChange={(e) => {
                                      setSelectedPropertyFilters(
                                        (prevFilters) => {
                                          const updatedFilters = {
                                            ...prevFilters,
                                          };
                                          if (!updatedFilters[propertyName]) {
                                            updatedFilters[propertyName] = [];
                                          }

                                          const selectedValue = value;

                                          if (e.target.checked) {
                                            if (
                                              !updatedFilters[
                                                propertyName
                                              ].includes(selectedValue)
                                            ) {
                                              updatedFilters[propertyName].push(
                                                selectedValue
                                              );
                                            }
                                          } else {
                                            updatedFilters[propertyName] =
                                              updatedFilters[
                                                propertyName
                                              ].filter(
                                                (filterValue) =>
                                                  filterValue !== selectedValue
                                              );
                                          }

                                          return updatedFilters;
                                        }
                                      );
                                    }}
                                  />

                                  {value}
                                </label>
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            )}
          </div>

          <div className="w-full p-4 bg-white">
            {filteredata && filteredata.length > 0 && (
              <>
                <h2 className="mainTitle">All Products</h2>
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredata.map((p) => (
                      <div
                        className="relative border w-80 h-full overflow-hidden rounded-lg bg-white shadow-md flex flex-col justify-between"
                        key={p._id}
                      >
                        <Link
                          href={`/products/${p._id}`}
                          className="flex justify-center"
                        >
                          <img
                            className="h-60 rounded-t-lg object-cover"
                            src={p.images[0]}
                            alt={p.title}
                          />
                        </Link>
                        <div className="mt-2 px-5 pb-3">
                          <Link href={`/products/${p._id}`}>
                            <h5 className="text-md font-semibold tracking-tight text-slate-900">
                              {p.title}
                            </h5>
                          </Link>
                          <div className="mt-2.5 mb-5 flex items-center">
                            <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                              5.0
                            </span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 text-yellow-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center justify-between px-5 py-2">
                          <p>
                            <span className="text-xl font-bold text-slate-900">
                              ₹{p.price}
                            </span>
                          </p>
                          <button
                            onClick={() => addProduct(p._id)}
                            className="flex items-center rounded-md bg-slate-900 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                              />
                            </svg>
                            Add to cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* <h2 className="mainTitle">All Products</h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <div
                  className="relative border w-80 h-full overflow-hidden rounded-lg bg-white shadow-md flex flex-col justify-between"
                  key={p._id}
                >
                  <Link
                    href={`/products/${p._id}`}
                    className="flex justify-center"
                  >
                    <img
                      className="h-60 rounded-t-lg object-cover"
                      src={p.images[0]}
                      alt={p.title}
                    />
                  </Link>
                  <div className="mt-2 px-5 pb-3">
                    <Link href={`/products/${p._id}`}>
                      <h5 className="text-md font-semibold tracking-tight text-slate-900">
                        {p.title}
                      </h5>
                    </Link>
                    <div className="mt-2.5 mb-5 flex items-center">
                      <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                        5.0
                      </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5 py-2">
                    <p>
                      <span className="text-xl font-bold text-slate-900">
                        ₹{p.price}
                      </span>
                    </p>
                    <button
                      onClick={() => addProduct(p._id)}
                      className="flex items-center rounded-md bg-slate-900 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          </div>

          <button
            className="bg-white rounded-full border fixed bottom-5 left-2 z-10 text-blue-500 p-2 ml-3 md:hidden"
            onClick={toggleContainer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
          </button>
        </div>
      </div>
      <FooterPage />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
