import { Order } from "@/lib/models/Order";
import { mongooseConnect } from "@/lib/mongoose";
import axios from "axios";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";
import { useState } from "react";
const endpointSecret =
  "whsec_990ba9ef2fdff56e55069feadbca0da2af9ffcb30eddb07cb92c95165d1cd19e";

export default async function handler(req, res) {
  await mongooseConnect();

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  // console.log("Events", event.type);
  switch (event.type) {
    case "checkout.session.completed":
      // const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";

      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
          order_status: {
            date: new Date(),
            status: "order send for the approve",
          },
        });

        console.log(typeof orderId);

        try {
          await axios
            .post(process.env.PUBLIC_URL + "/api/mailsend", { orderId })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error("Error sending invoice:", error);
            });
        } catch (error) {
          console.error("Error updating order:", error);
        }
      }
      break;

    default:
      console.log(`Unhandled stripe event type ${event.type}`);
  }

  res.status(200).send("OK");
}

export const config = {
  api: { bodyParser: false },
};

//peach-cajole-cool-amazed
//acct_1NhF0MSE8NrIFvpj

//reform-outdo-daring-enrich
// account id acct_1NjQKBSBHv1Ons8g
