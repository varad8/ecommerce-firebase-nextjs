import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await mongooseConnect();
    await isAdminRequest(req, res);

    try {
      // Fetch all orders
      const orders = await Order.find();

      // Calculate total revenue for different time intervals
      const now = new Date();
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);

      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);

      const monthAgo = new Date(now);
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      const yearAgo = new Date(now);
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);

      let todayRevenue = 0;
      let weekRevenue = 0;
      let monthRevenue = 0;
      let yearRevenue = 0;

      orders.forEach((order) => {
        const orderDate = new Date(order.createdAt);

        if (orderDate >= today) {
          todayRevenue += calculateOrderRevenue(order);
        }

        if (orderDate >= weekAgo) {
          weekRevenue += calculateOrderRevenue(order);
        }

        if (orderDate >= monthAgo) {
          monthRevenue += calculateOrderRevenue(order);
        }

        if (orderDate >= yearAgo) {
          yearRevenue += calculateOrderRevenue(order);
        }
      });

      const resdata = {
        todayRevenue,
        weekRevenue,
        monthRevenue,
        yearRevenue,
      };

      console.log(resdata);

      res.status(200).json(resdata);
    } catch (error) {
      console.error("Error calculating total revenue:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

function calculateOrderRevenue(order) {
  let totalRevenue = 0;
  const lineItems = order.line_items;

  if (lineItems && Array.isArray(lineItems)) {
    lineItems.forEach((item) => {
      if (item.price_data && item.price_data.unit_amount) {
        totalRevenue += item.price_data.unit_amount * item.quantity;
      }
    });
  }

  return totalRevenue;
}
