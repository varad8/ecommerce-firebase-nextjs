import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }

  const {
    userid,
    fullname,
    email,
    phoneno,
    streetaddress,
    landmark,
    village,
    district,
    state,
    postalcode,
    country,
    shipping_address,
    cartProducts,
    trackingno,
  } = req.body;

  await mongooseConnect();

  //Here we get info about product title and quantity from cartProducts
  //also we grab the properties of the products

  const productIds = cartProducts;

  const uniqueIds = [...new Set(productIds)];
  const producstInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];

  let product_details = {};

  for (const productId of uniqueIds) {
    const productInfo = producstInfos.find(
      (p) => p._id.toString() === productId
    );

    const quantity = productIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      for (const [propertyName, propertyValue] of Object.entries(
        productInfo.properties
      )) {
        product_details[propertyName] = propertyValue;
      }

      //Here we set line_items to the stripe

      line_items.push({
        quantity,
        price_data: {
          currency: "INR",
          product_data: {
            name: productInfo.title,
          },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  //Here we create order document to the database

  const orderDoc = await Order.create({
    line_items,
    userid,
    fullname,
    email,
    phoneno,
    streetaddress,
    landmark,
    village,
    district,
    state,
    postalcode,
    country,
    paid: false,
    trackingno,
    shipping_address,
    productIds,
    deliver_staus: "pending",
    order_status: {
      date: "",
      status: "",
    },
  });

  // console.log(orderDoc);

  //Here we grab the session of the stripe

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
  });

  res.json({
    url: session.url,
  });
}
