import CustSchema from "../model/customerSchema.js";
import ItemSchema from "../model/itemSchema.js";

//retrieve all customer 
export const getCustomer = async (req, res) => {
  try {
    const customers = await CustSchema.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//add new customer 
export const createCustomer = async (req, res) => {
  const body = req.body;
  try {
    await match(body)
    const newCustomer = new CustSchema(body);
    console.log(newCustomer);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err)
  }
};

//async function to match whatsappnumber to customernumber 
export const match = async (body) => {
  const doc = await ItemSchema.find({customerNumber: body.whatsapp_number}).populate(body.items);
  !doc ?  body.items = [] : body.items = doc ;
  return body.items
}

//update customer by id
export const updateCustomerById = async (req, res) => {
  const condition = { _id: req.params.id };
  const body = req.body
  try {
    const updateCustomer = await CustSchema.updateOne(condition, {$set: body});
    console.log(updateCustomer)
    res.status(200).json(updateCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err)
  }
};

//delete customer details
export const deleteCustomer = async (req, res) => {
  const condition = { _id: req.params.id };
  try {
    await match(req.body)
    const deletedcustomer = await CustSchema.deleteOne(condition);
    res.status(200).json(deletedcustomer);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};

//add to customer item
export const addCustItem = async (req, res) => {
  try {
    const customer = req.body.customer;
    const items = req.body.items;
    const addItemToCust = await CustSchema.findByIdAndUpdate(
      customer,
      { $push: { items } },
      { new: true }
    );
    res.status(200).send(addItemToCust);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete from customer item 
export const deleteCustItem = async (req,res) => {
  try {
    const customer = req.body.customer;
    const items = req.body.items;
    const updatedCustItems = await CustSchema.findByIdAndUpdate(
      customer,
      { $pull: { items: { _id: items._id } } },
      { new: true }
    );
    console.log(updatedCustItems);
    res.status(200).send(updatedCustItems.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCustName = async (req,res) => {
  try {
    const customer = req.body.customer;
    const names = req.body.names;
    const addItemToCust = await CustSchema.findByIdAndUpdate(
      customer,
      { $push: { names } },
      { new: true }
    );
    res.status(200).send(addItemToCust);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCustName = async (req,res) => {
  try {
    const customer = req.body.customer;
    const names = req.body.names;
    const updatedCustNames = await CustSchema.findByIdAndUpdate(
      customer,
      { $pull: { names: { _id: names._id } } },
      { new: true }
    );
    console.log(updatedCustNames);
    res.status(200).send(updatedCustNames.names);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
