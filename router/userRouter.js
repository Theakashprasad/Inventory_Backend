import express from 'express'
const router = express.Router()
import authController from '../controllers/authController.js'
import inventory from '../controllers/inventory.js'
import customerController from '../controllers/customerController.js'
import saleController from '../controllers/saleController.js'
import { getDashboardData } from '../controllers/dashBoardController.js'

router.post("/signUp", authController.signUp)
router.post("/login", authController.login)
// ------------------------     INVENTORY
router.post("/postInventory", inventory.postInventory)
router.get("/getInventory/:email", inventory.getInventory)
router.patch("/patchInventory", inventory.patchInventory)
router.delete("/deleteInventory/:id", inventory.deleteInventory)
// ------------------------     CUSTOMER
router.post("/postCustomer", customerController.postCustomer)
router.get("/getCustomer/:email", customerController.getCustomer)
router.patch("/patchCustomer", customerController.patchCustomer)
// -------------------------    SALE
router.post("/postSale", saleController.postSale) 
router.get("/getSale/:email", saleController.getSale)
//   is used to get all the datas
router.get("/getDashboardData/:email", getDashboardData)



 


export default router