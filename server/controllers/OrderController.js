import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModels.js";
import midtransClient from "midtrans-client";
import dotenv from "dotenv";
dotenv.config();

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER,
});

export const CreateOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, phone, cartItem } = req.body;
  if (!cartItem || cartItem.length < 1) {
    res.status(400);
    throw new Error("keranjang masih kosong");
  }

  let orderItem = [];
  let orderMidtrans = [];
  let total = 0;

  for (const cart of cartItem) {
    const productData = await Product.findById(cart.product);
    if (!productData) {
      res.status(404);
      throw new Error(`Product ID ${cart.product} tidak ditemukan`);
    }

    const { name, price, _id, stock } = productData;

    if(cart.quantity> stock){
      res.status(404)
      throw new Error(`jumlah product dari product ${name} melebihi batas stock product. Silahkan ubah jumlah product anda` )
    }

    orderItem.push({
      quantity: cart.quantity,
      name,
      price,
      product: _id,
    });

    orderMidtrans.push({
      quantity: cart.quantity,
      name: name.substring(0, 30),
      price,
      id: _id.toString(),
    });

    total += cart.quantity * price;
  }

  const order = await Order.create({
    itemsDetail: orderItem,
    total,
    firstName,
    lastName,
    email,
    phone,
    user: req.user.id,
  });

  let parameter = {
    transaction_details: {
      order_id: order._id.toString(), // Midtrans expects a string
      gross_amount: total,
    },
    item_details: orderMidtrans,
    customer_details: {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    },
  };

  const token = await snap.createTransaction(parameter);

  return res.status(201).json({
    total,
    order,
    message: "Berhasil Buat Order Product",
    token,
  });
});

// --- UPDATED CALLBACK LOGIC ---
export const callbackPayment = asyncHandler(async (req, res) => {
  try {
    const statusResponse = await snap.transaction.notification(req.body);
    const { order_id, transaction_status, fraud_status } = statusResponse;

    console.log(
      `Processing Callback for Order: ${order_id} - Status: ${transaction_status}`,
    );

    // Find the order
    const orderData = await Order.findById(order_id);

    if (!orderData) {
      return res.status(404).send("Order not found");
    }

    // 1. If status is already success, don't do anything (Prevent double stock deduction)
    if (orderData.status === "success") {
      return res.status(200).send("Order already processed");
    }

    // 2. Logic for Success (Settlement for VA/E-wallet, Capture for CC)
    if (
      transaction_status === "capture" ||
      transaction_status === "settlement"
    ) {
      if (fraud_status === "accept" || !fraud_status) {
        // Update stock in parallel for speed
        const updateStockPromises = orderData.itemsDetail.map(async (item) => {
          return Product.findByIdAndUpdate(item.product, {
            $inc: { stock: -item.quantity },
          });
        });

        await Promise.all(updateStockPromises);
        orderData.status = "success";
      }
    }
    // 3. Logic for Failure
    else if (["cancel", "deny", "expire"].includes(transaction_status)) {
      orderData.status = "failed";
    }
    // 4. Logic for Pending
    else if (transaction_status === "pending") {
      orderData.status = "pending";
    }

    await orderData.save();
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Midtrans Callback Error:", error.message);
    // Return 200 even on error to stop Midtrans from retrying and spamming your logs
    return res.status(200).send("Callback Error Handled");
  }
});

// Other controllers...
export const AllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  return res
    .status(200)
    .json({ data: orders, message: "Berhasil Tampil Semua Order Product" });
});

export const DetailOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  return res
    .status(200)
    .json({ data: order, message: "Berhasil Tampil Detail Order Product" });
});

export const CurrentUserOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user.id });
  return res.status(200).json({
    data: order,
    message: "Berhasil Tampil Current User Order Product",
  });
});
