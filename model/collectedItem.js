import mongoose from 'mongoose'

const movedItemSchema = new mongoose.Schema({
    item: []
},{timestamps:true}, {minimize: false}, {toJSON: { virtuals: true },toObject: { virtuals: true }})

const ColItemSchema = mongoose.model('MovedItem', movedItemSchema)
export default ColItemSchema