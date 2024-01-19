import { Product } from "@/lib/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.productname) {
      const keyword = req.query.productname;

      // Use a case-insensitive regular expression to match titles containing the keyword
      const regex = new RegExp(keyword, "i");

      try {
        const matchingProducts = await Product.find({
          title: { $regex: regex },
        });
        res.json(matchingProducts);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while fetching products." });
      }
    } else {
      res.status(400).json({ error: "Missing productname parameter." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
