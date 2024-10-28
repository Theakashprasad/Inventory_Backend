import mongoose, { Schema, Document } from 'mongoose';

const inventorySchema = new Schema(
    {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number
        },
        creator: {
            type: String
        }
      },
      {
        timestamps: true,
      }
    );


const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;

