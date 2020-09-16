
const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateFetchStudentsInput = (data) => {
    let errors = {}
    data.department = !isEmpty(data.department) ? data.department : '';
    data.year = !isEmpty(data.year) ? data.year : '';
    data.section = !isEmpty(data.section) ? data.section : '';


    if (Validator.isEmpty(data.department)) {
        errors.department = 'Department field is required';
    }

    if (Validator.isEmpty(data.year)) {
        errors.year = 'Year field is required';
    }

    if (Validator.isEmpty(data.section)) {
        errors.section = 'Section field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateFetchStudentsInput