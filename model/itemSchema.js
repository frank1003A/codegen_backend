
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    customerNumber: {
        type: String,
    },
    customerName: {
        type: String, ref: 'customer', default: 'N/A'
    },
    images: [{
        image: {type: String}
    }],
    dateAdded: {
        type: Date, 
        default: Date.now()
    },
    agent: String,
    kilo: Number,
    dollar_rate : {type: Number, default: 4.5},
    naira_rate : {type: Number, default: 750},
    dollar: Number, 
    naira : Number,
    Total_Naira_Amount: Number,
    paid: [{
        pay: {type: Boolean, default: false},
        datePaid: {type: Date, default: Date.now},
        paidBy: {type: String},
        amountpaid: {type: Number}
    }],
    collected:[{
        collect: {type: Boolean, default: false}, 
        dateCollected: {type:Date, default: Date.now()}
    }],
    balance: {
        type: Number
    },
    remark: String,
},{timestamps:true}, {minimize: false}, {toJSON: { virtuals: true },toObject: { virtuals: true }})

itemSchema.virtual('get-customer-name', {
    ref: 'customer',
    localField: 'customerNumber',
    foreignField: 'whatsapp_number'
})

itemSchema.methods.calculations = async function(){
    const item = this;
    const rate = 575;
    const calcDollar = item.kilo * item.dollar_rate
    const calcNaira = item.kilo * item.naira_rate
    const totalAmt = calcNaira + ( calcDollar * rate)
    this.dollar = calcDollar
    this.naira = calcNaira
    this.Total_Naira_Amount = totalAmt
    await item.save();
    return this
}

const ItemSchema = mongoose.model('Item', itemSchema)
export default ItemSchema


