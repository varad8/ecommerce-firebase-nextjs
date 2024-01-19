import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  await mongooseConnect();
  const { method } = req;

  await isAdminRequest(req, res);

  //Here we get orders by id and get all latest order by timestamp
  if (method === "GET") {
    if (req.query?.id) {
      console.log(await Order.findOne({ _id: req.query.id }));
      res.json(await Order.findOne({ _id: req.query.id }));
    } else {
      res.json(await Order.find().sort({ createdAt: -1 }));
    }
  }

  //Here we update the status of the order and also update delivery status

  if (method === "PUT") {
    const { order_status, newDeliverStatus, _id } = req.body;

    try {
      const order = await Order.findOne({ _id });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      if (order_status) {
        order.order_status.push(order_status); // Add new status to the array
      }

      if (newDeliverStatus) {
        order.deliver_staus = newDeliverStatus; // Update the deliver_status
      }

      await order.save(); // Save the updated document

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
