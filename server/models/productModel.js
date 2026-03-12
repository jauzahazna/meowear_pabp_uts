import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Product Harus diisi"],
    unique: [true, "Nama sudah digunakan silahkan buat yang lain"]
  },
  price: {
    type: Number,
    required: [true, "Harga Product harus diisi"],
  },
  description: {
    type: String,
    required: [true, "Description Product harus diisi"],
  },
  image: {
    type: String,
    default: null
  },
  category:{
    type: String,
    required: [true, "Category Product Harus diisi"],
    enum: ["sepatu", "kemeja", "baju", "celana"]
  },
  stock : {
    type: Number,
    default: 0
  }
});


const Product = mongoose.model("Product", productSchema)

export default Product