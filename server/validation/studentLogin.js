const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateStudentLoginInput = (data) => {
    let errors = {}
    data.registrationNumber = !isEmpty(data.registrationNumber) ? data.registrationNumber : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isLength(data.registrationNumber, { min: 10, max: 14 })) {
        errors.registrationNumber = 'Número de registro deve haver ao menos 10 caractéres';
    }

    if (Validator.isEmpty(data.registrationNumber)) {
        errors.registrationNumber = 'Número de registro incorreto/inválido';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Senha Incorreta/inválida';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateStudentLoginInput