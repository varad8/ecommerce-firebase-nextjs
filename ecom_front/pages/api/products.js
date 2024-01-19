import { Product } from "@/lib/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import createServer from "next/dist/server/next";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.productids) {
      const productIds = req.query.productids.split(","); // Split the product IDs
      const products = await Product.find({ _id: { $in: productIds } }); // Find products with matching IDs
      res.json(products);
    } else if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }
}
