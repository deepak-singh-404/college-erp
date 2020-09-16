const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateStudentUpdatePassword = (data) => {
    let errors = {}
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmNewPassword = !isEmpty(data.confirmNewPassword) ? data.confirmNewPassword : '';
   
    if (data.newPassword !== data.confirmNewPassword) {
        errors.confirmNewPassword = 'Password mismatch';
    }

    if (Validator.isEmpty(data.confirmNewPassword)) {
        errors.confirmNewPassword = 'Confirm New Password field is required';
    }
    


    if (Validator.isEmpty(data.oldPassword)) {
        errors.oldPassword = 'Old Password field is required';
    }

    if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.newPassword = 'Password must contain at least six character';
    }

    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'New Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateStudentUpdatePassword