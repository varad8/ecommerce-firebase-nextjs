import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";
import { storage } from "@/lib/firebase";
import { ref, deleteObject } from "firebase/storage";
import { extractImageNameFromUrl } from "@/components/UrlUtils";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else if (req.query?.productids) {
      const productIds = req.query.productids.split(","); // Split the product IDs
      const products = await Product.find({ _id: { $in: productIds } }); // Find products with matching IDs
      res.json(products);
    } else {
      res.json(await Product.find());
    }
  }

  if (method == "POST") {
    const { title, description, price, images, category, properties } =
      req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
    });

    res.json(productDoc);
  }

  if (method === "PUT") {
    const { title, description, price, images, category, properties, _id } =
      req.body;
    await Product.updateOne(
      { _id },
      { title, description, price, images, category, properties }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      const product = await Product.findOne({ _id: req.query?.id });

      // Delete images from Firebase Storage
      if (product && product.images && Array.isArray(product.images)) {
        for (const imageUrl of product.images) {
          try {
            const fileName = extractImageNameFromUrl(imageUrl);
            const fileRef = ref(storage, "productsImage/" + fileName);
            await deleteObject(fileRef);
          } catch (error) {
            console.error("Error deleting image:", error);
          }
        }
      }

      // Delete the slider entry from MongoDB
      await Product.deleteOne({ _id: req.query?.id });

      res.json(true);
    }
  }
}
