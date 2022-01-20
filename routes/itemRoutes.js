import express from 'express'
const router = express.Router();
import {getItems, createItem, updateItemById, deleteItemById,} from '../controller/itemController.js'
import upload from '../middleware/imgWare.js'

//get all item
router.get('/item', getItems)

//create item
router.post('/create-item', upload, createItem)

//update item
router.patch('/update-item/:id', updateItemById)

//delete item
router.delete('/delete-item/:id', deleteItemById)

export default router 