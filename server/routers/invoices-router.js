const router = require('express').Router();
const controller = require('../controllers/invoices-controller');

router.post('/', controller.create);

module.exports = router;
