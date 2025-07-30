const express = require('express');
const { jobIdController } = require('../controller/apiController');
const {statusController} = require('../controller/apiStatusController');
const router = express.Router();

router.get('/jobId', jobIdController);
router.get('/status/:id', statusController);

module.exports = router;
