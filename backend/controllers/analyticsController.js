const Expense = require('../models/Expense');

// 1. Total expenses per category
exports.getExpensesByCategory = async (req, res) => {
    try {
        const result = await Expense.aggregate([
            { $group: { _id: "$category", total: { $sum: "$amount" } } },
            { $sort: { total: -1 } }
        ]);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2. Expenses per month
exports.getMonthlyExpenses = async (req, res) => {
    try {
        const result = await Expense.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    total: { $sum: "$amount" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        // Format for frontend
        const formatted = result.map(item => ({
            month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
            total: item.total
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
