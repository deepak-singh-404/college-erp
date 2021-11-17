const express = require('express')
const passport = require('passport')
const router = express.Router()
const upload = require('../utils/multer')

const { checkAttendence, getAllStudents, getStudentByName, studentLogin,
    updatePassword, forgotPassword, getStudentByRegName,
    postOTP, postPrivateChat, getPrivateChat, differentChats,
    previousChats, updateProfile, getAllSubjects, getMarks } = require('../controller/studentController')

router.post('/login', studentLogin)

router.post('/forgotPassword', forgotPassword)

router.post('/postOTP', postOTP)

//UPLOAD PROFILE
router.post('/updateProfile', passport.authenticate('jwt', { session: false }),
    upload.single("avatar"), updateProfile)

//UPLOAD PASSWORD
router.post('/updatePassword', passport.authenticate('jwt', { session: false }), updatePassword)    

//CHAT RELATED ROUTES    
router.get('/chat/:roomId', passport.authenticate('jwt', { session: false }), getPrivateChat)

router.post('/chat/:roomId', passport.authenticate('jwt', { session: false }), postPrivateChat)
 
router.get('/chat/newerChats/:receiverName', passport.authenticate('jwt', { session: false }), differentChats)
    
router.get('/chat/previousChats/:senderName', passport.authenticate('jwt', { session: false }), previousChats)
    
router.get('/getMarks', passport.authenticate('jwt', { session: false }),getMarks)

router.get('/getAllSubjects', passport.authenticate('jwt', { session: false }), getAllSubjects)

router.get('/checkAttendence', passport.authenticate('jwt', { session: false }), checkAttendence)

//HELPER ROUTES
router.post('/getAllStudents', passport.authenticate('jwt', { session: false }), getAllStudents)

router.post('/getStudentByRegName', passport.authenticate('jwt', { session: false }), getStudentByRegName)

router.post('/getStudentByName', passport.authenticate('jwt', { session: false }), getStudentByName)

module.exports = router