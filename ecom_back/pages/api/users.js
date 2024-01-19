import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { User } from "@/models/User";
export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const { method } = req;
  if (method === "GET") {
    if (req.query?.id) {
      const user = await User.findById(req.query.id); // Use findById to get a single document
      res.json(user);
    } else if (req.query?.email) {
      const user = await User.findOne({ email: req.query.email }); // Use findOne to get a single document
      if (user) {
        res.json(user._id);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      const adminUsers = await User.find({ role: "admin" });
      res.json(adminUsers);
    }
  }

  if (method === "PUT") {
    const { email, role } = req.body;

    if (email && role) {
      const result = await User.updateOne({ email }, { role });
      res.json(result);
    }
  }
}
