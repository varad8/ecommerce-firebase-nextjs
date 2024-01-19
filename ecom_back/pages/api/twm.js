import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  await mongooseConnect();
  const { method } = req;

  await isAdminRequest(req, res);

  //Here we get orders data according to Today weekly and monthly
  if (req.method === "GET") {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const todayOrders = await Order.countDocuments({
        createdAt: { $gte: today },
      });
      const weeklyOrders = await Order.countDocuments({
        createdAt: { $gte: oneWeekAgo },
      });
      const monthlyOrders = await Order.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
      console.log(
        "Today:" + todayOrders,
        "Weekly Orders:" + weeklyOrders,
        "Monthly Orders:" + monthlyOrders
      );

      res.status(200).json({ todayOrders, weeklyOrders, monthlyOrders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching orders" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
