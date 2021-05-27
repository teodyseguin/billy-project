const router = require('express').Router();
const controller = require('../controllers/upload-controller');

router.post('/', controller.upload);

module.exports = router;
