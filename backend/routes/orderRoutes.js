const express = require("express");
const router = express.Router();

const { create } = require("../controllers/order_controller");

router.post('/order/create/', create);