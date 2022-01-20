import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customer_fullname: String,
    whatsapp_number: {
        type: String,
        unique: true,
        index: true
    },
    image: String,
    items: [{
        item: { ref: "Item", type: mongoose.Schema.Types.ObjectId}
    }],
    names: [{
        name: {type: String}
    }],
},{
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
}, {timestamps:true}, {minimize: false})

  

//mongoose virtual populate to tell mongoose to populate ref field in other collections */
customerSchema.virtual('customer_items',{
    ref:'Item',
    localField: 'whatsapp_number',
    foreignField: 'customerNumber',
})

const CustSchema = mongoose.model('customer', customerSchema);
export default CustSchema;



