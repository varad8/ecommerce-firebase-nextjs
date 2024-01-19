import { Product } from "@/lib/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function hanle(req, res) {
  await mongooseConnect();

  const ids = req.body.ids;
  res.json(await Product.find({ _id: ids }));
}
