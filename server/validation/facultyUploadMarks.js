const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateFacultyUploadMarks = (data) => {
    let errors = {}
    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : '';
    data.exam = !isEmpty(data.exam) ? data.exam : '';
    data.totalMarks = !isEmpty(data.totalMarks) ? data.totalMarks : '';

    if (Validator.isEmpty(data.subjectCode)) {
        errors.subjectCode = 'Subject Code field is required';
    }

    if (Validator.isEmpty(data.exam)) {
        errors.exam = 'Exam field is required';
    }
    if (Validator.isEmpty(data.totalMarks)) {
        errors.totalMarks = 'Total marks field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateFacultyUploadMarks