const { Schema, models, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    line_items: Object,
    userid: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phoneno: { type: String, required: true },
    streetaddress: { type: String, required: true },
    landmark: { type: String, required: true },
    village: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    postalcode: { type: String, required: true },
    country: { type: String, required: true },
    paid: Boolean,
    trackingno: String,
    shipping_address: { type: Object, required: true },
    deliver_staus: { type: String },
    order_status: [{ type: Object }],
    productIds: { type: Object },
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
