const Billing = require('./billing.model.js');

module.exports.createBilling = async function (billing) {
    return Billing.create(billing);
};

module.exports.getBilling = async function (PAGE_SIZE, PAGE_NUMBER, req) {
    const total = await Billing.countDocuments({});
    const Billings = await Billing.find({}).sort({ field: 'descending' }).limit(PAGE_SIZE).skip(PAGE_SIZE * PAGE_NUMBER);
    return {
        total: Math.ceil(total / PAGE_SIZE),
        Billings: Billings
    }

};

module.exports.updateBillingById = async function (BillingId, updatedBilling) {
    return Billing.findByIdAndUpdate(BillingId, updatedBilling, { new: true, useFindAndModify: false });
};

module.exports.deleteBillingById = async function (BillingId) {
    return Billing.findByIdAndDelete(BillingId);
};