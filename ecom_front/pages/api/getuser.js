import { user } from "@/lib/models/User";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method == "GET") {
    if (req.query?.userid) {
      res.json(await user.findOne({ _id: req.query.userid }));
    }
  }
}
