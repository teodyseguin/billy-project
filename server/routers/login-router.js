const router = require('express').Router();
const controller = require('../controllers/login-controller');

router.post('/', controller.login);

module.exports = router;
