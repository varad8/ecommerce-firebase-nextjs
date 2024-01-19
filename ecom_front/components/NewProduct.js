import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";

export default function NewProduct({ products }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <h2 className="mainTitle">New Arrivals</h2>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1  items-center md:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((p) => (
            <div
              className="relative border w-80 h-full overflow-hidden rounded-lg bg-white shadow-md flex flex-col justify-between"
              key={p._id}
            >
              <Link href={`/products/${p._id}`} className="flex justify-center">
                <img
                  className="h-60 rounded-t-lg object-fit p-3"
                  src={p.images[0]}
                  alt={p.title}
                />
              </Link>
              <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
                New
              </span>
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
  );
}
