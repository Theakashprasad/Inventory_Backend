import mongoose, { Schema, Document } from 'mongoose';


const salesSchema = new mongoose.Schema({
  itemName: { type: String, },
  customerName: { type: String,},
  quantity: { type: Number, },
  cash: { type: Number,  },
  owner: {type:String},
  saleDate: { type: Date, default: Date.now }
});

const Sale =  mongoose.model('Sales', salesSchema);
export default Sale; 

