import mongoose from "mongoose";
const {Schema} = mongoose;

const singleProduct = Schema({
    name: {type:String, required:true},
    quantity: {type:Number, required:true},
    price: {type:Number, required:true},
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        requeired: true
    },
})
const orderSchema = new Schema({
    total: {
        type: Number,
        required: ["true", "Total Harga Harus diisi"]
    },
    itemsDetail:[singleProduct],
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "failed", "success"],
        default: "pending"
    },
    firstName: {
        type: String,
        required: ["true", "Nama Depan Harus diisi"]
    },
    lastName: {
        type: String,
        required: ["true", "Nama Belakang Harus diisi"]
    },
    phone: {
        type: String,
        required: ["true", "Nomor Telepon Harus diisi"]
    },
    email: {
        type: String,
        required: ["true", "Email Harus diisi"]
    },
});

const Order = mongoose.model("Order", orderSchema)

export default Order