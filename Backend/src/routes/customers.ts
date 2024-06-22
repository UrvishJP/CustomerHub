import { createCustomerController } from "../controllers/createCustomer";
import { deleteCustomerController } from "../controllers/deleteCustomer";
import { getCustomerController } from "../controllers/getCustomer";
const express = require('express')
const router = express.Router();

router.post('/',createCustomerController)
router.get('/',getCustomerController)
router.delete('/:id', deleteCustomerController);

module.exports = router