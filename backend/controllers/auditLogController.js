const AuditLog = require('../models/AuditLog');

exports.getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find()
            .populate('user', 'email role')
            .populate('expense')
            .sort({ timestamp: -1 });

        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};