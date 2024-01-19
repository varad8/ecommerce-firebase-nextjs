import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method == "GET") {
    if (req.query?.userid) {
      res.json(await Order.find({ userid: req.query.userid }));
    }

    if (req.query?.trackingno) {
      res.json(await Order.findOne({ trackingno: req.query.trackingno }));
    }
  }
}
