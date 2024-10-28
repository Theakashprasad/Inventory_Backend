import Inventory from "../model/inventoryModel.js";
import Sale from "../model/saleModel.js";

const postSale = async (req, res) => {
  const { itemName, customerName, quantity, email } = req.body;
  try {
    const item = await Inventory.findOne({ name: itemName });
    
    if (!item || item.quandity < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const cash = item.price * quantity;

    const sale = new Sale({
      itemName,
      customerName,
      quantity,
      owner: email,
      cash,
    });

    await sale.save(); 

    item.quantity -= quantity;
    await item.save();

    return res.status(201).json({ message: "Sale recorded successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: err.message });
  }
};

const getSale = async (req, res) => {
      const email = req.params.email
  try {
    const sales = await Sale.find({ owner: email });
    if (!sales) {
      return res.status(404).json({ message: "No sales found" });
    }
    return res.status(200).json(sales);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: err.message });
  }
};
export default { postSale, getSale };
