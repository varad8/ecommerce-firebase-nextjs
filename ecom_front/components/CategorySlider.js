import React from "react";
import Link from "next/link";
import Glider from "react-glider";
import "glider-js/glider.min.css";

const categories = [
  {
    name: "Shirts",
    icon: "https://cdn-icons-png.flaticon.com/512/11622/11622295.png",
    slug: "shirts",
  },
  {
    name: "Mobiles",
    icon: "https://cdn-icons-png.flaticon.com/512/3137/3137807.png",
    slug: "mobiles",
  },
  {
    name: "Headset",
    icon: "https://cdn-icons-png.flaticon.com/512/543/543227.png",
    slug: "headset",
  },
  {
    name: "T-Shirts",
    icon: "https://cdn-icons-png.flaticon.com/512/4715/4715310.png",
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: "https://cdn-icons-png.flaticon.com/512/2742/2742674.png",
    slug: "shoes",
  },
  {
    name: "Ladies Garments",
    icon: "https://cdn-icons-png.flaticon.com/512/3798/3798217.png",
    slug: "ladiesgarments",
  },
  {
    name: "Mens Garments",
    icon: "https://cdn-icons-png.flaticon.com/512/2226/2226418.png",
    slug: "mensgarments",
  },
  {
    name: "Furniture",
    icon: "https://cdn-icons-png.flaticon.com/512/5564/5564849.png",
    slug: "furniture",
  },
  {
    name: "Appliances",
    icon: "https://cdn-icons-png.flaticon.com/512/1261/1261106.png",
    slug: "Appliances",
  },
  {
    name: "Electronics",
    icon: "https://cdn-icons-png.flaticon.com/512/3659/3659898.png",
    slug: "electronics",
  },
  {
    name: "Toys",
    icon: "https://cdn-icons-png.flaticon.com/512/3082/3082048.png",
    slug: "Toys",
  },
  {
    name: "School Bags",
    icon: "https://cdn-icons-png.flaticon.com/512/3429/3429142.png",
    slug: "schoolbags",
  },
  {
    name: "Beauty Products",
    icon: "https://cdn-icons-png.flaticon.com/512/1312/1312091.png",
    slug: "beautyproducts",
  },
];

console.log(categories.length);

export default function CategorySlider() {
  return (
    <div className="bg-bgOrange h-20 relative">
      <div className="flex justify-center items-center h-full">
        <Glider
          className="glider-container"
          draggable
          scrollLock
          slidesToShow={11}
        >
          {categories.map((category, index) => (
            <Link
              href={`/categories?${category.slug}`}
              key={index}
              className="flex flex-col justify-center gap-2 items-center p-2"
            >
              <img
                src={category.icon}
                className="h-8 w-8 object-fill object-center"
                alt={category.name}
              />
              <p className="text-sm text-center break-words">{category.name}</p>
            </Link>
          ))}
        </Glider>
      </div>
    </div>
  );
}
