const { Parser } = require('json2csv');
const Expense = require('../models/Expense');
const AuditLog = require('../models/AuditLog');

// Create a new expense
exports.createExpense = async (req, res) => {
    try {
        const { amount, category, date, notes } = req.body;
        const expense = await Expense.create({
            user: req.user._id,
            amount,
            category,
            date,
            notes
        });

        await AuditLog.create({
            user: req.user._id,
            action: `Created expense of ₹${amount} in ${category}`,
            expense: expense._id
        });

        res.status(201).json({ message: 'Expense created', expense });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new expense With Receipt
exports.createExpenseWithReceipt = async (req, res) => {
    try {
        const { amount, category, date, notes } = req.body;
        const expense = await Expense.create({
            user: req.user._id,
            amount,
            category,
            date,
            notes,
            receipt: `uploads/${req.file.filename}`
        });
        await AuditLog.create({
            user: req.user._id,
            action: `Created expense of ₹${amount} in ${category} with receipt`,
            expense: expense._id
        });
        res.status(201).json({ message: 'Expense with receipt created', expense });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// Get own expenses (employee)
exports.getMyExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all expenses (admin)
exports.getAllExpenses = async (req, res) => {
    try {
        const { status, category } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (category) filter.category = category;

        const expenses = await Expense.find(filter).populate('user', 'email role').sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update expense status (admin only)
exports.updateExpenseStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const expense = await Expense.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!expense) return res.status(404).json({ message: 'Expense not found' });

        await AuditLog.create({
            user: req.user._id,
            action: `Changed expense status to ${status}`,
            expense: expense._id
        });


        res.json({ message: 'Expense status updated', expense });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Admin: Export all expenses as CSV
exports.exportExpensesCSV = async (req, res) => {
    try {
        const expenses = await Expense.find()
            .populate('user', 'email role')
            .sort({ date: -1 });

        const fields = ['user.email', 'amount', 'category', 'date', 'notes', 'status'];
        const opts = { fields };

        const parser = new Parser(opts);
        const csv = parser.parse(expenses);

        res.header('Content-Type', 'text/csv');
        res.attachment('expenses.csv');
        return res.send(csv);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
