const express = require('express');
const router = express.Router();

const { getAuditLogs } = require('../controllers/auditLogController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);
router.get('/', roleMiddleware('admin'), getAuditLogs);

module.exports = router;