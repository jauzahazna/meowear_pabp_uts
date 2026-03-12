import express from "express";
import { CreateOrder, AllOrder, CurrentUserOrder, DetailOrder, callbackPayment } from "../controllers/OrderController.js";
import { adminMiddleware, protectedMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// post /api/v1/order
// cuman diakses user auth
router.post('/', protectedMiddleware, CreateOrder)

// get/api/v1/order
// cuman diakses oleh user role admin
router.get('/', protectedMiddleware, adminMiddleware, AllOrder)

// get /api/v1/order/:id
// cuman bisa diakses oleh uder role admin
router.get('/:id', protectedMiddleware, adminMiddleware, DetailOrder)

// get /api/v1/order/current/user
// cuman bisa diakses oleh user yang auth
router.get('/current/user', protectedMiddleware, CurrentUserOrder)

// post /api/v1/order/callback/midtrans
router.post('/callback/midtrans', callbackPayment)



export default router