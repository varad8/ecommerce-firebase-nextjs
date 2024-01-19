// import FooterPage from "@/components/Footer";
// import Header from "@/components/Header";
// import PriceCard from "@/components/PriceCard";
// import axios from "axios";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Category() {
//   const [productData, setProductData] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios.get("/api/products").then((response) => {
//       setProductData(response.data);
//     });

//     axios.get("/api/categoryfilter").then((response) => {
//       setCategories(response.data);
//     });
//   }, []);

//   // Create a map to store parent categories and their associated products
//   const parentCategoryProducts = {};

//   // Populate the parentCategoryProducts map
//   productData.forEach((product) => {
//     const categoryId = product.category;
//     const parentCategory = categories.find(
//       (category) => category._id === categoryId
//     ).parent;

//     if (parentCategory) {
//       if (!parentCategoryProducts[parentCategory._id]) {
//         parentCategoryProducts[parentCategory._id] = {
//           parent: parentCategory,
//           products: [],
//         };
//       }
//       parentCategoryProducts[parentCategory._id].products.push(product);
//     }
//   });

//   return (
//     <>
//       <Header />
//       <div className="container mx-auto min-h-screen">
//         {Object.values(parentCategoryProducts).map((categoryGroup) => (
//           <div key={categoryGroup.parent._id}>
//             <div className="flex justify-between items-center">
//               <h1 className="mainTitle">{categoryGroup.parent.name}</h1>
//               <Link
//                 className="mr-2"
//                 href={`/categories/${categoryGroup.parent._id}`}
//               >
//                 Show More
//               </Link>
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               {/* Display products under the current parent category */}
//               {categoryGroup.products.map((product) => (
//                 <PriceCard key={product._id} productData={product} />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <FooterPage />
//     </>
//   );
// }
import FooterPage from "@/components/Footer";
import Header from "@/components/Header";
import PriceCard from "@/components/PriceCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Category() {
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProductData(response.data);
    });

    axios.get("/api/categoryfilter").then((response) => {
      setCategories(response.data);
    });
  }, []);

  // Create a map to store parent categories and their associated products
  const parentCategoryProducts = {};

  // Populate the parentCategoryProducts map
  productData.forEach((product) => {
    const categoryId = product.category;
    const category = categories.find((cat) => cat._id === categoryId);

    if (category && category.parent) {
      if (!parentCategoryProducts[category.parent._id]) {
        parentCategoryProducts[category.parent._id] = {
          parent: category.parent,
          products: [],
        };
      }
      if (parentCategoryProducts[category.parent._id].products.length < 4) {
        parentCategoryProducts[category.parent._id].products.push(product);
      }
    }
  });

  return (
    <>
      <Header />
      <div className="container mx-auto min-h-screen">
        {Object.values(parentCategoryProducts).map((categoryGroup) => (
          <div key={categoryGroup.parent._id}>
            <div className="flex justify-between items-center">
              <h1 className="mainTitle">
                {categoryGroup.parent.name[0].toUpperCase()}
                {categoryGroup.parent.name.substring(1)}
              </h1>
              <Link
                className="mr-2"
                href={`/categories/${categoryGroup.parent._id}`}
              >
                Show More
              </Link>
            </div>
            <div className="flex gap-6 flex-wrap md:justify-center lg:justify-start justify-center">
              {/* Display products under the current parent category */}
              {categoryGroup.products.map((product) => (
                <PriceCard key={product._id} productData={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <FooterPage />
    </>
  );
}
