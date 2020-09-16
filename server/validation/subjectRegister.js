const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateSubjectRegisterInput = (data) => {
    let errors = {}
    data.subjectName = !isEmpty(data.subjectName) ? data.subjectName : '';
    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : '';
    data.year = !isEmpty(data.year) ? data.year : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.totalLectures = !isEmpty(data.totalLectures) ? data.totalLectures : '';


    if (Validator.isEmpty(data.subjectName)) {
        errors.subjectName = ' Subject Name field is required';
    }

    if (Validator.isEmpty(data.subjectCode)) {
        errors.subjectCode = 'Subject Code field is required';
    }

    if (Validator.isEmpty(data.year)) {
        errors.year = 'Year field is required';
    }

    if (Validator.isEmpty(data.department)) {
        errors.department = 'Department field is required';
    }

    if (Validator.isEmpty(data.totalLectures)) {
        errors.totalLectures = 'Total Lecture field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateSubjectRegisterInput