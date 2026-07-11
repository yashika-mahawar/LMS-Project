const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController");

// Order create karne ka route
router.post("/create-order", createOrder);

// Payment verify karne ka route (Naya add kiya gaya)
router.post("/verify-payment", verifyPayment);

module.exports = router;