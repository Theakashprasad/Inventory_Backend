import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    }, 
    phone: {
      type: String,
    },
    creator: {
      type: String,
    }
  },
  {
    timestamps: true, 
  }
);

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;