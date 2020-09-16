const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateOTP = (data) => {
    let errors = {}
    data.otp = !isEmpty(data.otp) ? data.otp : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmNewPassword = !isEmpty(data.confirmNewPassword) ? data.confirmNewPassword : '';


    if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.newPassword = 'Password must contain at least six character';
    } 

    if (!Validator.isLength(data.otp, { min: 6, max: 6})) {
        errors.otp = 'OTP must contain six character ';
    } 

    if (Validator.isEmpty(data.otp)) {
        errors.otp = 'OTP field is required';
    }

    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'New Password field is required';
    }

    if (Validator.isEmpty(data.confirmNewPassword)) {
        errors.confirmNewPassword = 'Confirm New Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}

module.exports = validateOTP