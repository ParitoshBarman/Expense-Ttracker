const express = require('express');
const router = express.Router();
const {
    createExpense,
    createExpenseWithReceipt,
    getMyExpenses,
    getAllExpenses,
    updateExpenseStatus,
    exportExpensesCSV
} = require('../controllers/expenseController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// All routes need auth
router.use(authMiddleware);

// Employee routes
router.post('/', createExpense);
router.get('/my', getMyExpenses);

router.post('/with-receipt', upload.single('receipt'), createExpenseWithReceipt);



// Admin routes
router.get('/all', roleMiddleware('admin'), getAllExpenses);
router.put('/:id/status', roleMiddleware('admin'), updateExpenseStatus);
router.get('/export/csv', roleMiddleware('admin'), exportExpensesCSV);

module.exports = router;