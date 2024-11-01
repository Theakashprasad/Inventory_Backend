import Customer from "../model/customerModel.js";

const postCustomer = async (req, res) => {
  try {
    const { customerName, email, phone, address, userEmail } = req.body;
    console.log(email);
    
    const itemDetails = await Customer.findOne({ email: email }).exec();
    if (itemDetails) {
      return res.status(404).json({ message: "USER EXITS" });
    }
    const data = new Customer({
      name: customerName,
      address: address,
      email: email,
      phone: phone,
      creator: userEmail,
    });
    await data.save();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCustomer = async (req, res) => {
  try {
    const email = req.params.email;
    const itemDetails = await Customer.find({ creator: email }).exec();

    if (!itemDetails) {
      return res.status(404).json({ message: "No items found" });
    }
    return res.status(200).json(itemDetails);
  } catch (error) {
    console.log("Error in customer controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const patchCustomer = async (req, res) => {
    try {
        const { customerName, email, phone, address, userEmail, getId } = req.body;
        const updatedItem = await Customer.findOneAndUpdate(
            { creator: userEmail, _id: getId }, // Ensure you're matching the correct item
            {
                name:customerName,
                email,
                phone,
                address,
            },
            { new: true } // Return the updated document
        );
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json(updatedItem);
    n;
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { postCustomer, getCustomer, patchCustomer };
