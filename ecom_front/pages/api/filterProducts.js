// import { Product } from "@/lib/models/Product";
// import { mongooseConnect } from "@/lib/mongoose";

// export default async function handle(req, res) {
//   const { method } = req;
//   await mongooseConnect();
//   const { title, properties } = req.query;

//   if (method === "GET") {
//     try {
//       console.log("Title:", title);
//       console.log("Properties:", properties);

//       const filters = [];

//       if (title) {
//         const titleKeywords = title.split(",").map((keyword) => keyword.trim());
//         filters.push({ title: { $in: titleKeywords } });
//       }

//       if (properties) {
//         const propertiesObj = JSON.parse(properties);
//         for (const propName in propertiesObj) {
//           if (
//             Array.isArray(propertiesObj[propName]) &&
//             propertiesObj[propName].length > 0
//           ) {
//             filters.push({
//               [`properties.${propName}`]: { $in: propertiesObj[propName] },
//             });
//           }
//         }
//       }

//       const query = filters.length > 0 ? { $and: filters } : {};

//       const filteredProducts = await Product.find(query);

//       res.status(200).json(filteredProducts);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// }
import { Product } from "@/lib/models/Product";
import { Category } from "@/lib/models/Category"; // Import the Category model
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  const { title, properties } = req.query;

  if (method === "GET") {
    try {
      console.log("Title:", title);
      console.log("Properties:", properties);

      const filters = [];
      let titleKeywords = []; // Declare the titleKeywords variable

      if (title) {
        titleKeywords = title.split(",").map((keyword) => keyword.trim());
        filters.push({ title: { $in: titleKeywords } });
      }

      if (properties) {
        const propertiesObj = JSON.parse(properties);
        for (const propName in propertiesObj) {
          if (
            Array.isArray(propertiesObj[propName]) &&
            propertiesObj[propName].length > 0
          ) {
            filters.push({
              [`properties.${propName}`]: { $in: propertiesObj[propName] },
            });
          }
        }
      }

      const query = filters.length > 0 ? { $and: filters } : {};

      let filteredProducts = await Product.find(query);

      // If no products match by title, search within categories
      if (filteredProducts.length === 0 && titleKeywords.length > 0) {
        const categories = await Category.find({
          name: { $in: titleKeywords }, // Search categories by title keywords
        });

        if (categories.length > 0) {
          const categoryIds = categories.map((category) => category._id);
          const categoryQuery = { category: { $in: categoryIds } };
          filteredProducts = await Product.find(categoryQuery);
        }
      }

      res.status(200).json(filteredProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(413).json({ error: "Forbidden" });
  }
}
