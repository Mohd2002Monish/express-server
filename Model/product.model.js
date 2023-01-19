const { Schema, model } = require("mongoose");
const ProductSchema = new Schema({
  img: String,
  price: String,
  name: String,
  qty: Number,
});
const ProductModel = model("product", ProductSchema);
module.exports = ProductModel;
