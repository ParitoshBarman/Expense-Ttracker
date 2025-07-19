const express = require('express');
const router = express.Router();

const {
    getExpensesByCategory,
    getMonthlyExpenses
} = require('../controllers/analyticsController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/category', getExpensesByCategory);
router.get('/monthly', getMonthlyExpenses);

module.exports = router;
