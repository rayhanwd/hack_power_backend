const { check, validationResult } = require('express-validator');
const User = require('./user.model');

exports.checkRegData = [
    check("name")
        .trim()
        .escape()
        .not()
        .not().isEmpty()
        .withMessage('User name can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Full name should be 3 chars long!'),
    check("email")
        .custom(value => {
            return User.findOne({ "email": value }).then(user => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            });
        })
        .trim()
        .isEmail()
        .withMessage('data should be a email address')
        .not().isEmpty()
        .withMessage('email address can not be empty!'),
    check("password")
        .not().isEmpty()
        .withMessage('password can not be empty!')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array().map(error => error.msg) });
        next();
    },
];

exports.checkLogData = [
    check("email")
        .custom(value => {
            return User.findOne({ "email": value }).then(user => {
                if (!user) {
                    return Promise.reject('E-mail has no record our database!');
                }
            });
        })
        .trim()
        .isEmail()
        .withMessage('data should be a email address')
        .not().isEmpty()
        .withMessage('email address can not be empty!')
        .bail(),
    check("password")
        .not().isEmpty()
        .withMessage('password can not be empty!')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array().map(error => error.msg) });
        next();
    },
];
