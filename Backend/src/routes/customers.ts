import { createCustomerController } from "../controllers/createCustomer";
import { getCustomerController } from "../controllers/getCustomer";
const express = require('express')
const router = express.Router();

router.post('/',createCustomerController)
router.get('/',getCustomerController)

module.exports = router