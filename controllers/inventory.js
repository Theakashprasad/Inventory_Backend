import Inventory from "../model/inventoryModel.js";

const postInventory = async (req, res) => {
  try {
    const { itemName, description, quantity, price, creatorId } = req.body;
    const itemDetails = await Inventory.findOne({creator:creatorId, name: itemName }).exec();
    console.log('asdf',itemDetails);
    
    if (itemDetails) {
      return res.status(404).json({ message: "ITEAM ALREADY EXIST" });
    }
    const data = new Inventory({
      name: itemName,
      description,
      quantity,
      price,
      creator: creatorId,
    });
    await data.save();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getInventory = async (req, res) => {
  try {
    const id = req.params.id;
    const itemDetails = await Inventory.find({ creator: id }).exec();
    if (!itemDetails) {
      return res.status(404).json({ message: "No items found" });
    }
    return res.status(200).json(itemDetails);
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const patchInventory = async (req, res) => {
  try {
    const { itemName, description, quantity, price, creatorId, getId } = req.body;    
    const updatedItem = await Inventory.findOneAndUpdate(
      { creator: creatorId, _id: getId}, 
      { 
        name:itemName,
        description,
        quantity,
        price,
      },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json(updatedItem);
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


 const deleteInventory = async (req, res)=> {
 
  try {
    
    const { id } = req.params;

    const item = await Inventory.findOne({ _id: id });

    if (!item) {
      return res.status(404).json({ message: 'Item not found or you do not have permission to delete this item' });
    }

    await item.deleteOne();

    return res.status(200).json({
      message: "ITEM DELETED SUCESSFULLY",
    });

  } catch (err) {
    return res.status(500).json({ message: 'An error occurred', error: err.message });    
  }
};

export default { postInventory, getInventory, patchInventory, deleteInventory };
