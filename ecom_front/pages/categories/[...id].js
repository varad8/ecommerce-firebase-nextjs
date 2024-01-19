// import FooterPage from "@/components/Footer";
// import Header from "@/components/Header";
// import PriceCard from "@/components/PriceCard";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function CategorySearch() {
//   const [searching, setSearching] = useState(true);
//   const [products, setProducts] = useState({});
//   const router = useRouter();
//   const id = router.query.id;

//   useEffect(() => {
//     if (id) {
//       axios.get("/api/categoryfilter?category=" + id).then((response) => {
//         setProducts(response.data);
//         console.log(response.data);
//         setSearching(false);
//       });
//     }
//   }, [id]);

//   return (
//     <>
//       <Header />

// {searching && (
//   <div className="container mx-auto min-h-screen flex flex-col justify-center items-center">
//     <div className="flex justify-center items-center">
//       <svg className="svg w-32 h-32" viewBox="0 0 128 128">
//         <path
//           className="doc"
//           d="M0-0.00002 0 3.6768 0 124.32 0 128h4.129 119.74 4.129v-3.6769-120.65-3.6768h-4.129-119.74zm8.2581 7.3537 111.48 0 0 113.29-111.48 0zm13.626 25.048 0 7.3537 57.806 0 0-7.3537zm0 19.12 0 7.3537 84.232 0 0-7.3537zm0 17.649 0 7.3537 84.232 0 0-7.3537zm0 19.12 0 7.3537 84.232 0 0-7.3537z 7z"
//         />
//         <path
//           className="magnify"
//           d="M38.948 10.429c-18.254 10.539-24.468 33.953-14.057 51.986 9.229 15.984 28.649 22.764 45.654 16.763-0.84868 2.6797-0.61612 5.6834 0.90656 8.3207l17.309 29.98c2.8768 4.9827 9.204 6.6781 14.187 3.8013 4.9827-2.8768 6.6781-9.204 3.8013-14.187l-17.31-29.977c-1.523-2.637-4.008-4.34-6.753-4.945 13.7-11.727 17.543-31.935 8.31-47.919-10.411-18.034-33.796-24.359-52.049-13.82zm6.902 11.955c11.489-6.633 26.133-2.7688 32.893 8.9404 6.7603 11.709 2.7847 26.324-8.704 32.957-11.489 6.632-26.133 2.768-32.893-8.941-6.761-11.709-2.785-26.324 8.704-32.957z"
//         />
//       </svg>
//     </div>
//   </div>
// )}

//       {/* Not Found Message */}

//       {products.products?.length > 0 && !searching && (
//         <>
//           <div className="container mx-auto min-h-screen">
//             <h1 className="mainTitle">
//               {products.parentCategoryName[0].toUpperCase()}
//               {products?.parentCategoryName.substring(1)}
//             </h1>
//             <div className="flex gap-6 flex-wrap md:justify-center lg:justify-start justify-center">
//               {/* Display products under the current parent category */}
//               {products.products.map((product) => (
//                 <PriceCard key={product._id} productData={product} />
//               ))}
//             </div>
//           </div>
//         </>
//       )}

//       <FooterPage />
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import FooterPage from "@/components/Footer";
import PriceCard from "@/components/PriceCard";

export default function CategorySearch() {
  const [searching, setSearching] = useState(true);
  const [products, setProducts] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(""); // State to store selected filter
  const [selectedValue, setSelectedValue] = useState(""); // State to store selected value
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (id) {
      axios.get("/api/categoryfilter?category=" + id).then((response) => {
        setProducts(response.data);
        console.log(response.data);
        setSearching(false);
      });
    }
  }, [id]);

  // Extract unique properties for options
  const propertiesOptions = Array.from(
    new Set(
      products.products?.flatMap((product) =>
        Object.keys(product.properties || [])
      )
    )
  );

  // Filter logic based on selected filter and value
  const filteredProducts = products.products?.filter((product) => {
    if (!selectedFilter || !selectedValue) {
      return true; // Show all products if no filter or value is selected
    }

    // Check if the selectedFilter and selectedValue match the product's properties
    return (
      product.properties && product.properties[selectedFilter] === selectedValue
    );
  });

  // Extract unique values for selected property
  const selectedPropertyValues = Array.from(
    new Set(
      products.products?.flatMap(
        (product) => product.properties && product.properties[selectedFilter]
      )
    )
  );

  // Apply Filter Button Click Handler
  const applyFilter = () => {
    // Set the selected filter and value
    setSelectedFilter(selectedFilter);
    setSelectedValue(selectedValue);
  };

  return (
    <>
      <Header />
      {searching && (
        <div className="container mx-auto min-h-screen flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <svg className="svg w-32 h-32" viewBox="0 0 128 128">
              <path
                className="doc"
                d="M0-0.00002 0 3.6768 0 124.32 0 128h4.129 119.74 4.129v-3.6769-120.65-3.6768h-4.129-119.74zm8.2581 7.3537 111.48 0 0 113.29-111.48 0zm13.626 25.048 0 7.3537 57.806 0 0-7.3537zm0 19.12 0 7.3537 84.232 0 0-7.3537zm0 17.649 0 7.3537 84.232 0 0-7.3537zm0 19.12 0 7.3537 84.232 0 0-7.3537z 7z"
              />
              <path
                className="magnify"
                d="M38.948 10.429c-18.254 10.539-24.468 33.953-14.057 51.986 9.229 15.984 28.649 22.764 45.654 16.763-0.84868 2.6797-0.61612 5.6834 0.90656 8.3207l17.309 29.98c2.8768 4.9827 9.204 6.6781 14.187 3.8013 4.9827-2.8768 6.6781-9.204 3.8013-14.187l-17.31-29.977c-1.523-2.637-4.008-4.34-6.753-4.945 13.7-11.727 17.543-31.935 8.31-47.919-10.411-18.034-33.796-24.359-52.049-13.82zm6.902 11.955c11.489-6.633 26.133-2.7688 32.893 8.9404 6.7603 11.709 2.7847 26.324-8.704 32.957-11.489 6.632-26.133 2.768-32.893-8.941-6.761-11.709-2.785-26.324 8.704-32.957z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Filter Container */}
      <div className="container mx-auto mt-4 flex flex-wrap justify-center mb-4 gap-4">
        {/* Property Filter Select */}
        {!searching && (
          <div className="flex flex-col">
            <label htmlFor="propertyFilterSelect" className="block font-medium">
              Filter by Property:
            </label>
            <select
              id="propertyFilterSelect"
              className="mt-1 block rounded-md px-5 py-2 border border-indigo-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="">All</option>
              {propertiesOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Value Filter Select */}
        {selectedFilter && (
          <div className="flex flex-col">
            <label htmlFor="valueFilterSelect" className="block font-medium">
              Select {selectedFilter}:
            </label>
            <select
              id="valueFilterSelect"
              className="mt-1  block rounded-md px-5 py-2 border border-indigo-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="">All</option>
              {selectedPropertyValues.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Apply Filter Button
        {selectedFilter && (
          <div className="flex items-end">
            <button
              onClick={applyFilter}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Apply Filter
            </button>
          </div>
        )} */}
      </div>

      {/* Display filtered products */}
      {!searching && (
        <div className="container mx-auto min-h-screen">
          <div className="flex gap-6 flex-wrap md:justify-center lg:justify-start justify-center">
            {filteredProducts?.length > 0
              ? filteredProducts.map((product) => (
                  <PriceCard key={product._id} productData={product} />
                ))
              : products.products.map((product) => (
                  <PriceCard key={product._id} productData={product} />
                ))}
          </div>
        </div>
      )}

      <FooterPage />
    </>
  );
}
