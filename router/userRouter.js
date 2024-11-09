import express from "express";
const router = express.Router();
import authController from "../controllers/authController.js";
import inventory from "../controllers/inventory.js";
import customerController from "../controllers/customerController.js";
import saleController from "../controllers/saleController.js";
import { getDashboardData } from "../controllers/dashBoardController.js";
import { setEmail } from "../controllers/emailController.js";
import protectRoute from "../middleware/protectedRoute.js";

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
// ------------------------     INVENTORY
router.post("/postInventory", protectRoute, inventory.postInventory);
router.get("/getInventory/:id", protectRoute, inventory.getInventory);
router.patch("/patchInventory", inventory.patchInventory);
router.delete("/deleteInventory/:id", protectRoute, inventory.deleteInventory);
// ------------------------     CUSTOMER
router.post("/postCustomer", protectRoute, customerController.postCustomer);
router.get("/getCustomer/:id", protectRoute, customerController.getCustomer);
router.patch("/patchCustomer", protectRoute, customerController.patchCustomer);
router.delete(
  "/deleteCustomer/:id",
  protectRoute,
  customerController.deleteCustomer
);

// -------------------------    SALE
router.post("/postSale", protectRoute, saleController.postSale);
router.get("/getSale/:id", protectRoute, saleController.getSale);

// -------------------------    DASHBOARD
router.get("/getDashboardData/:email", protectRoute, getDashboardData);

// -------------------------    EMAIL
router.post("/postEmail", protectRoute, setEmail);

export default router;
