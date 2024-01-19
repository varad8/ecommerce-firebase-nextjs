import { model, models, Schema } from "mongoose";

const AddressSchema = new Schema({
  userid: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneno: { type: String, required: true },
  streetaddress: { type: String, required: true },
  landmark: { type: String, required: true },
  village: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  postalcode: { type: String, required: true },
  country: { type: String, required: true },
  shipingaddress: { type: Object, required: true },
});

export const Address = models?.Address || model("Address", AddressSchema);
