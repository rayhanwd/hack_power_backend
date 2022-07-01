const { check, validationResult } = require('express-validator');

const Billing = require('./billing.model');

module.exports.checkingCreatedData = [
    check("fullName")
        .trim()
        .escape()
        .not()
        .not().isEmpty()
        .withMessage('full name name can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!'),
    check('email')
        .trim()
        .isEmail()
        .withMessage('data should be a email address')
        .not().isEmpty()
        .withMessage('email address can not be empty!')
        .custom(value => {
            return Billing.findOne({ "email": value }).then(got_it => {
                if (got_it) {
                    return Promise.reject('E-mail already in used to created another billing');
                }
            });
        }),
    // password must be at least 5 chars long
    check("phone")
        .not().isEmpty()
        .withMessage('phone number can not be empty!')
        .isLength({ min: 11 })
        .withMessage('must be at 11 digit')
        .matches(/\d/)
        .withMessage('must contain a number')
        .isLength({ max: 11 })
        .withMessage('must be at 11 digit only')
        .custom(value => {
            return Billing.findOne({ "phone": value }).then(got_it => {
                if (got_it) {
                    return Promise.reject('phone number already in used to created another billing');
                }
            });
        }),
    check("paidAmount")
        .not().isEmpty()
        .withMessage('amount can not be empty!')
        .isLength({ min: 4 })
        .withMessage('must be at 4 digit')
        .matches(/\d/)
        .withMessage('must contain a number'),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(error => error.msg) });
        }
        next();
    }

]

module.exports.checkingUpdateData = [
    check("fullName")
        .trim()
        .escape()
        .not()
        .not().isEmpty()
        .withMessage('full name name can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!'),
    check('email')
        .trim()
        .isEmail()
        .withMessage('data should be a email address')
        .not().isEmpty()
        .withMessage('email address can not be empty!'),
    // password must be at least 5 chars long
    check("phone")
        .not().isEmpty()
        .withMessage('phone number can not be empty!')
        .isLength({ min: 11 })
        .withMessage('must be at 11 digit')
        .matches(/\d/)
        .withMessage('must contain a number')
        .isLength({ max: 11 })
        .withMessage('must be at 11 digit only'),
    check("paidAmount")
        .not().isEmpty()
        .withMessage('amount can not be empty!')
        .isLength({ min: 4 })
        .withMessage('must be at 4 digit')
        .matches(/\d/)
        .withMessage('must contain a number'),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(error => error.msg) });
        }
        next();
    }
]

// module.exports.checkingDeleteData = [
//     check("fullName")
//         .trim()
//         .escape()
//         .not()
//         .not().isEmpty()
//         .withMessage('full name name can not be empty!')
//         .bail()
//         .isLength({ min: 3 })
//         .withMessage('Minimum 3 characters required!'),
//     check('email')
//         .trim()
//         .isEmail()
//         .withMessage('data should be a email address')
//         .not().isEmpty()
//         .withMessage('email address can not be empty!'),
//     // password must be at least 5 chars long
//     check("phone")
//         .not().isEmpty()
//         .withMessage('phone number can not be empty!')
//         .isLength({ min: 11 })
//         .withMessage('must be at 11 digit')
//         .matches(/\d/)
//         .withMessage('must contain a number')
//         .isLength({ max: 11 })
//         .withMessage('must be at 11 digit only'),
//     check("paidAmount")
//         .not().isEmpty()
//         .withMessage('amount can not be empty!')
//         .isLength({ min: 4 })
//         .withMessage('must be at 4 digit')
//         .matches(/\d/)
//         .withMessage('must contain a number'),
//     (req, res, next) => {
//         // Finds the validation errors in this request and wraps them in an object with handy functions
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array().map(error => error.msg) });
//         }
//         next();
//     }
// ]