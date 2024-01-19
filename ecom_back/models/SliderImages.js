const { Schema, models, model } = require("mongoose");

const SliderSchema = new Schema({
  title: { type: String, require: true },
  description: String,
  images: [{ type: String }],
});

export const SliderImages =
  models.SliderImages || model("SliderImages", SliderSchema);
