import express from 'express';
import { createCustomerController } from '../controllers/createCustomer';
import { getCustomerController } from '../controllers/getCustomer';
import { deleteCustomerController } from '../controllers/deleteCustomer';
import { updateCustomerController } from '../controllers/updateCustomer';

const router = express.Router();

router.post('/', createCustomerController);
router.get('/', getCustomerController);
router.delete('/:id', deleteCustomerController);
router.put('/:id', updateCustomerController);

export default router;
