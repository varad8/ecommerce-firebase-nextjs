import { Category } from "@/lib/models/Category";
import { Product } from "@/lib/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

// Async function to handle HTTP requests
export default async function handle(req, res) {
  const { method, query } = req;
  await mongooseConnect(); // Connect to MongoDB

  if (method === "GET") {
    if (query?.category) {
      const categoryId = query.category;
      // Find the parent category based on the provided category ID
      const parentCategory = await Category.findById(categoryId);

      //From that ParentCategory we get name
      const parentCategoryName = parentCategory.name;

      if (parentCategory) {
        // Recursively find child categories
        const childCategories = await findChildCategories(parentCategory);
        // Collect IDs of parent and child categories
        const categoryIds = [
          parentCategory._id,
          ...childCategories.map((cat) => cat._id),
        ];

        // Find products belonging to these categories
        const products = await Product.find({ category: { $in: categoryIds } });

        const productdata = {
          parentCategoryName,
          products,
        };
        res.json(productdata); // Send the products as a JSON response
      } else {
        res.status(404).json({ error: "Category not found" }); // Category not found
      }
    } else {
      // If no category specified, fetch and send all categories
      const categories = await Category.find().populate("parent");
      res.json(categories);
    }
  }
}

// Recursive function to find child categories of a given category
async function findChildCategories(category) {
  const childCategories = await Category.find({ parent: category._id });
  let categories = [...childCategories];

  // Recursively find nested child categories
  for (const childCategory of childCategories) {
    const nestedCategories = await findChildCategories(childCategory);
    categories = [...categories, ...nestedCategories];
  }

  return categories;
}
