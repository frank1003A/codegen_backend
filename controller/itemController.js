import ItemSchema from "../model/itemSchema.js";
import CustSchema from "../model/customerSchema.js";
import { createCustomer, match } from "./customerController.js";
import mongoose from "mongoose";


export const getItems = async(req,res) => {
    try {
        await match(req.body)
        const items = await ItemSchema.find()
        res.status(200).json(items)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

export const createItem = async(req,res) => {
    const body = req.body
    try {
      await itemMatch(body)
      const newItem = new ItemSchema(body)
      await newItem.calculations()
      console.log(newItem)
        await newItem.save()
        res.status(201).json(newItem)
    } catch (err) {
        res.status(400).json({error: err.message})
        console.log(err.message)
    }
}

export const itemMatch = async (body) => {
  const doc = await CustSchema.find({whatsapp_number: body.customerNumber}).populate(body.customerName)
  if (!doc[0])  {body.customerName = 'N/A'} else{ body.customerName = doc[0].customer_fullname}
  return body.customerName
}

export const updateItemById = async(req,res) => {
    const condition = { _id: req.params.id};
    const body = req.body
  try {
    const updateItem = await ItemSchema.updateOne(condition, {$set: body});
    console.log(updateItem);
    res.status(200).json(updateItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err)
  }
}

export const deleteItemById = async(req,res) => {
    const condition = { _id: req.params.id };
  try {
    await itemMatch(req.body)
    const deletedItem = await ItemSchema.deleteOne(condition);
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
}