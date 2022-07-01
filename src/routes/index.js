var express = require('express');
var router = express.Router();
const billingController = require('../billing/billing.controller');
const { Authenticated } = require('../billing/billing.middleware');
const { checkingCreatedData,checkingUpdateData,checkingDeleteData } = require('../billing/billing.validator');
const usersController = require('../users/user.controller');
const { checkRegData,checkLogData } = require('../users/user.validator');

/* GET home page. */

router.get('/api', function (req, res) {
  res.send('Welcome to power hack service api');
});

//billing routes 
router.post('/api/add-billing',Authenticated,checkingCreatedData, billingController.createBilling);
router.get('/api/billing-list',Authenticated, billingController.getBilling);
router.put('/api/update-billing/:id',Authenticated,checkingUpdateData, billingController.updateBillingById);
router.delete('/api/delete-billing/:id',Authenticated, billingController.deleteBillingById);

/* GET users listing. */
router.post('/api/registration',checkRegData, usersController.register);
router.post('/api/login',checkLogData, usersController.login);

module.exports = router;

