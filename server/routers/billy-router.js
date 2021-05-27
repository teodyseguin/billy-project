'use strict';

const router = require('express').Router();
const controller = require('../controllers/billy-controller');

router.post('/', controller.create);

module.exports = router;
