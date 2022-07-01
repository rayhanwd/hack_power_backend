const billingService = require('./billing.service');

module.exports.createBilling = async function (req, res) {
    const billing = req.body;
    const createdBilling = await billingService.createBilling(billing);
    return res.status(200).json({ msg: "Billing has been created successfully!", data: createdBilling });
};

module.exports.getBilling = async function (req, res) {
    const PAGE_SIZE = 10;
    const PAGE_NUMBER = parseInt(req.query.page || "0");
    const billings = await billingService.getBilling(PAGE_SIZE, PAGE_NUMBER);
    return res.json(billings);
};

module.exports.updateBillingById = async function (req, res) {
    const billingId = req.params.id;
    const updatedbilling = req.body;
    const billing = await billingService.updateBillingById(billingId, updatedbilling);
    return res.json({ msg: "Billing has been updated successfully!", data: billing });
};

module.exports.deleteBillingById = async function (req, res) {
    const billingId = req.params.id;
    const billing = await billingService.deleteBillingById(billingId);
    return res.json({ msg: "Billing has been deleted successfully!", data: billing });
};