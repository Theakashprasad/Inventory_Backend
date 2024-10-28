import Customer from "../model/customerModel.js";
import Inventory from "../model/inventoryModel.js";
import Sale from "../model/saleModel.js";

export const getDashboardData = async (req, res) => {

  try {
    const userEmail = req.params.email;
     
    const totalCustomers = await Customer.countDocuments({
      creator: userEmail,
    });
    const totalInventoryItems = await Inventory.countDocuments({
      creator: userEmail,
    });

    const sales = await Sale.find({ owner: userEmail });
    let totalProfit = 0;
    let totalItemsSold = 0;

    sales.forEach((sale) => {
      totalProfit += sale.cash;
      totalItemsSold += sale.quantity;
    });

    const monthlySalesData = await Sale.aggregate([
      {
        $match: { owner: userEmail }, // Match sales by user
      },
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } }, // Group by month and year
          totalSales: { $sum: "$cash" }, // Sum of sales in each month
          totalQuantitySold: { $sum: "$quantity" }, // Sum of items sold in each month
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month
      },
    ]);

    const monthlySales = Array(12).fill(0); // Initialize with 0 for all months

    monthlySalesData.forEach((sale) => {
      const monthIndex = sale._id.month - 1; // Adjust month to be 0-based
      monthlySales[monthIndex] = sale.totalSales;
    });

    return res.status(200).json({
      totalCustomers,
      totalInventoryItems,
      totalProfit,
      totalItemsSold,
      monthlySales,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: err.message });
  }
};
