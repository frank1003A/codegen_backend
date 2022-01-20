import express from 'express'
const router = express.Router();
import {getCustomer, createCustomer, updateCustomerById, 
        deleteCustomer, addCustItem, addCustName, deleteCustName, deleteCustItem} from '../controller/customerController.js'
import upload from '../middleware/imgWare.js'

//get all customer 
router.get('/customer', getCustomer)

//create customer 
router.post('/customer-create',upload, createCustomer)

//update customer 
router.patch('/customer-update/:id', updateCustomerById)

//delete customer
router.delete('/customer-delete/:id', deleteCustomer)

//add item to customer
router.post('/customer-item-add', addCustItem)

//delete customer item
router.delete('/customer-item-delete',deleteCustItem)

//add customer item to customer
router.post('/customer-name-add', addCustName)

//delete customer name
router.delete('/customer-name-delete', deleteCustName)

export default router