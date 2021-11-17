const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

//Validation
const validateAdminRegisterInput = require('../validation/adminRegister')
const validateFacultyRegisterInput = require('../validation/facultyRegister')
const validateStudentRegisterInput = require('../validation/studentRegister')
const validateAdminLoginInput = require('../validation/adminLogin')
const validateSubjectRegisterInput = require('../validation/subjectRegister')

//Models
const Subject = require('../models/subject')
const Student = require('../models/student')
const Faculty = require('../models/faculty')
const Admin = require('../models/admin')

//Config
const keys = require('../config/key')

module.exports = {
    addAdmin: async (req, res, next) => {
        try {
            const { name, email, dob, department, contactNumber } = req.body
            
            //VALIDATE REQUEST BODY
            if (!name || !email || !dob || !department || !contactNumber){
                return res.status(400).json({success:false, message:"Probably you have missed certain fields"})
            }

            const admin = await Admin.findOne({ email })
            if (admin) {
                return res.status(400).json({success:false, message:"Email already exist"})
            }
            const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
            let departmentHelper;
            if (department === "C.S.E") {
                departmentHelper = "01"
            }
            else if (department === "E.C.E") {
                departmentHelper = "02"
            }
            else if (department === "I.T") {
                departmentHelper = "03"
            }
            else if (department === "Mechanical") {
                departmentHelper = "04"
            }
            else if (department === "Civil") {
                departmentHelper = "05"

            }
            else if (department === "E.E.E") {
                departmentHelper = "06"
            }
            else {
                departmentHelper = "00"
            }

            const admins = await Admin.find({ department })
            let helper;
            if (admins.length < 10) {
                helper = "00" + admins.length.toString()
            }
            else if (students.length < 100 && students.length > 9) {
                helper = "0" + admins.length.toString()
            }
            else {
                helper = admins.length.toString()
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(dob, 10)
            var date = new Date();
            const joiningYear = date.getFullYear()
            var components = [
                "ADM",
                date.getFullYear(),
                departmentHelper,
                helper
            ];

            var registrationNumber = components.join("");
            const newAdmin = await new Admin({
                name,
                email,
                password: hashedPassword,
                joiningYear,
                registrationNumber,
                department,
                avatar,
                contactNumber,
                dob,
            })
            await newAdmin.save()
            return res.status(200).json({ success: true, message: "Admin registerd successfully", response: newAdmin })
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message })
        }
    },
    getAllStudents: async (req, res, next) => {
        try {
            const { branch, name } = req.body
            const students = await Student.find({})
            if (students.length === 0) {
                return res.status(404).json({ message: "No students found" })
            }
            res.status(200).json({ result: students })
        }
        catch (err) {
            res.status(400).json({ message: `error in getting all student", ${err.message}` })
        }

    },
    adminLogin: async (req, res, next) => {
        try {
            const { errors, isValid } = validateAdminLoginInput(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, password } = req.body;

            const admin = await Admin.findOne({ registrationNumber })
            if (!admin) {
                errors.registrationNumber = 'Registration number not found';
                return res.status(404).json(errors);
            }
            const isCorrect = await bcrypt.compare(password, admin.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            const payload = {
                id: admin.id, name: admin.name, email: admin.email,
                contactNumber: admin.contactNumber, avatar: admin.avatar,
                registrationNumber: admin.registrationNumber,
                joiningYear: admin.joiningYear,
                department: admin.department
            };
            jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );
        }
        catch (err) {
            console.log("Error in admin login", err.message)
        }

    },
    addStudent: async (req, res, next) => {
        try {
            const { errors, isValid } = validateStudentRegisterInput(req.body);

            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { name, email, year, fatherName, aadharCard,
                gender, department, section, dob, studentMobileNumber,
                fatherMobileNumber } = req.body

            const student = await Student.findOne({ email })
            if (student) {
                errors.email = "Email already exist"
                return res.status(400).json(errors)
            }
            const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
            let departmentHelper;
            if (department === "C.S.E") {
                departmentHelper = "01"
            }
            else if (department === "E.C.E") {
                departmentHelper = "02"
            }
            else if (department === "I.T") {
                departmentHelper = "03"
            }
            else if (department === "Mechanical") {
                departmentHelper = "04"
            }
            else if (department === "Civil") {
                departmentHelper = "05"

            }
            else {
                departmentHelper = "06"
            }

            const students = await Student.find({ department })
            let helper;
            if (students.length < 10) {
                helper = "00" + students.length.toString()
            }
            else if (students.length < 100 && students.length > 9) {
                helper = "0" + students.length.toString()
            }
            else {
                helper = students.length.toString()
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(dob, 10)
            var date = new Date();
            const batch = date.getFullYear()
            var components = [
                "STU",
                date.getFullYear(),
                departmentHelper,
                helper
            ];

            var registrationNumber = components.join("");
            const newStudent = await new Student({
                name,
                email,
                password: hashedPassword,
                year,
                fatherName,
                aadharCard,
                gender,
                registrationNumber,
                department,
                section,
                batch,
                avatar,
                dob,
                studentMobileNumber,
                fatherMobileNumber
            })
            await newStudent.save()
            const subjects = await Subject.find({ year })
            if (subjects.length !== 0) {
                for (var i = 0; i < subjects.length; i++) {
                    newStudent.subjects.push(subjects[i]._id)
                }
            }
            await newStudent.save()
            res.status(200).json({ result: newStudent })
        }
        catch (err) {
            res.status(400).json({ message: `error in adding new student", ${err.message}` })
        }

    },
    getAllStudents: async (req, res, next) => {
        try {
            const { branch, name } = req.body
            const students = await Student.find({})
            if (students.length === 0) {
                return res.status(404).json({ message: "No students found" })
            }
            res.status(200).json({ result: students })
        }
        catch (err) {
            res.status(400).json({ message: `error in getting all student", ${err.message}` })
        }
    },
    addFaculty: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFacultyRegisterInput(req.body)
            //Validation
            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { name, email, designation, department, facultyMobileNumber,
                aadharCard, dob, gender } = req.body
            const faculty = await Faculty.findOne({ email })
            if (faculty) {
                errors.email = 'Email already exist'
                return res.status(400).json(errors)
            }
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Default
            });
            let departmentHelper;
            if (department === "C.S.E") {
                departmentHelper = "01"
            }
            else if (department === "E.C.E") {
                departmentHelper = "02"
            }
            else if (department === "I.T") {
                departmentHelper = "03"
            }
            else if (department === "Mechanical") {
                departmentHelper = "04"
            }
            else if (department === "Civil") {
                departmentHelper = "05"
            }
            else {
                departmentHelper = "06"
            }

            const faculties = await Faculty.find({ department })
            let helper;
            if (faculties.length < 10) {
                helper = "00" + faculties.length.toString()
            }
            else if (faculties.length < 100 && faculties.length > 9) {
                helper = "0" + faculties.length.toString()
            }
            else {
                helper = faculties.length.toString()
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(dob, 10)
            var date = new Date();
            const joiningYear = date.getFullYear()
            var components = [
                "FAC",
                date.getFullYear(),
                departmentHelper,
                helper
            ];

            var registrationNumber = components.join("");
            const newFaculty = await new Faculty({
                name,
                email,
                designation,
                password: hashedPassword,
                department,
                facultyMobileNumber,
                gender,
                avatar,
                aadharCard,
                registrationNumber,
                dob,
                joiningYear
            })
            await newFaculty.save()
            res.status(200).json({ result: newFaculty })
        }
        catch (err) {
            console.log("error", err.message)
            res.status(400).json({ message: `error in adding new Faculty", ${err.message}` })
        }

    },
    getAllFaculty: async (req, res, next) => {
        try {
            const faculties = await Faculty.find({})
            if (faculties.length === 0) {
                return res.status(404).json({ message: "No Record Found" })
            }
            res.status(200).json({ result: faculties })
        }
        catch (err) {
            res.status(400).json({ message: `error in getting new Faculty", ${err.message}` })
        }

    },
    addSubject: async (req, res, next) => {
        try {
            const { errors, isValid } = validateSubjectRegisterInput(req.body)
            //Validation
            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { totalLectures, department, subjectCode,
                subjectName, year } = req.body
            const subject = await Subject.findOne({ subjectCode })
            if (subject) {
                errors.subjectCode = "Given Subject is already added"
                return res.status(400).json(errors)
            }
            const newSubject = await new Subject({
                totalLectures,
                department,
                subjectCode,
                subjectName,
                year
            })
            await newSubject.save()
            const students = await Student.find({ department, year })
            if (students.length === 0) {
                errors.department = "No branch found for given subject"
                return res.status(400).json(errors)
            }
            else {
                for (var i = 0; i < students.length; i++) {
                    students[i].subjects.push(newSubject._id)
                    await students[i].save()
                }
                res.status(200).json({ newSubject })
            }
        }
        catch (err) {
            console.log(`error in adding new subject", ${err.message}`)
        }
    },
    getAllSubjects: async (req, res, next) => {
        try {
            const allSubjects = await Subject.find({})
            if (!allSubjects) {
                return res.status(404).json({ message: "You havent registered any subject yet." })
            }
            res.status(200).json(allSubjects)
        }
        catch (err) {
            res.status(400).json({ message: `error in getting all Subjects", ${err.message}` })
        }
    },
    getAllFaculty: async (req, res, next) => {
        try {
            const { department } = req.body
            const allFaculties = await Faculty.find({ department })
            res.status(200).json({ result: allFaculties })
        }
        catch (err) {
            console.log("Error in gettting all faculties", err.message)
        }
    },
    getAllStudent: async (req, res, next) => {
        try {
            const { department, year } = req.body
            const allStudents = await Student.find({ department, year })
            res.status(200).json({ result: allStudents })
        }
        catch (err) {
            console.log("Error in gettting all students", err.message)
        }
    },
    getAllSubject: async (req, res, next) => {
        try {
            const { department, year } = req.body
            const allSubjects = await Subject.find({ department, year })
            res.status(200).json({ result: allSubjects })
        }
        catch (err) {
            console.log("Error in gettting all students", err.message)
        }
    }
}