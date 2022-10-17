const express = require('express');
const { check, body } = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
    body('password', 'Please enter a valid password.')
        .isLength({ min: 8 })
], authController.postLogin);

router.post('/signup',
    [check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            // if (value === 'mtermux@gmail.com') {
            //     throw new Error('This email address is forbiden.');
            // }
            // return true;
            return User.findOne({ email: value })
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('This email address is already in use.');
                    }
                });

        }),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords does not macth');
            }
            return true;
        })]
    , authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;