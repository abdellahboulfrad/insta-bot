const express = require('express');
const signatureValidator = require('../middleware/signatureValidator');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

router.get('/', webhookController.verifyWebhook);
router.post('/', signatureValidator, webhookController.receiveWebhook);

module.exports = router;
