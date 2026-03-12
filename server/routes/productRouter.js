import express from "express";
import {
  protectedMiddleware,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  CreateProduct,
  AllProduct,
  detailProduct,
  updateProduct,
  deleteProduct,
  FileUpload,
} from "../controllers/ProductController.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

// CRUD Product

// Create Data Product
// post /api.v1.product
//middleware owner -> it means only allow access for role owner
router.post("/", protectedMiddleware, adminMiddleware, CreateProduct);

// Read Data Product
// get /api.v1.product
router.get("/", AllProduct);

// Detail Data Product
// get /api.v1.product
router.get("/:id", detailProduct);

// Update Data Product
// put /api.v1.product
//middleware owner
router.put("/:id", protectedMiddleware, adminMiddleware, updateProduct);

// Delete Data Product
// delete /api.v1.product
//middleware owner
router.delete("/:id", protectedMiddleware, adminMiddleware, deleteProduct);

// File Upload Data Product
// post /api.v1.product
//middleware owner
router.post(
  "/:id",
  protectedMiddleware,
  adminMiddleware,
  upload.single("image"),
  FileUpload
);

export default router;
