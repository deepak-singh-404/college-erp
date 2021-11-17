import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import { SET_STUDENT, SET_ERRORS_HELPER, SET_ERRORS, STUDENT_UPDATE_PASSWORD, SET_OTP, SET_FLAG } from '../actionTypes'

const url = "http://localhost:5000"

export const setChatHistory = (data) => {
    return {
        type: "SET_CHAT",
        payload: data
    }
}

const setStudent = (data) => {
    return {
        type: SET_STUDENT,
        payload: data
    }
}

const chatHelp = (data) => {
    return {
        type: "CHAT_HELPER",
        payload: data
    }
}

const getStudentByRegNameHelper = (data) => {
    return {
        type: "GET_STUDENT_BY_REG_NUM",
        payload: data
    }
}


const privateConversation = (data) => {
    return {
        type: "GET_PRIVATE_CONVERSATION",
        payload: data
    }
}

const privateConversation2 = (data) => {
    return {
        type: "GET_PRIVATE_CONVERSATION2",
        payload: data
    }
}

const newerChatsHelper = (data) => {
    return {
        type: "GET_NEWER_CHATS",
        payload: data
    }
}

const previousChatsHelper = (data) => {
    return {
        type: "GET_PREVIOUS_CHATS",
        payload: data
    }
}

const getAllSubjectsHelper = (data) => {
    return {
        type: "GET_ALL_SUBJECTS",
        payload: data
    }
}

const fetchAttendenceHelper = (data) => {
    return {
        type: "GET_ATTENDENCE",
        payload: data
    }
}

const getMarksHelper = (data) => {
    return {
        type: "GET_MARKS",
        payload: data
    }
    
}

export const studentLogin = (studentCredential) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/student/login",
                data: studentCredential
            })
            const { token } = data;
            // Set token to local Storage
            localStorage.setItem('studentJwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setStudent(decoded))
           
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS_HELPER,
                payload: err.response.data
            })
        }
    }
}


export const studentUpdatePassword = (passwordData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/student/updatePassword",
                data: passwordData
            })
            alert("Password Updated Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS_HELPER,
                payload: err.response.data
            })
        }
    }
}

export const chatHelper = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/student/getStudentByName",
                data: name
            })
            dispatch(chatHelp(data.result))
        }
        catch (err) {
            console.log('error in recent',err.message)
        }
    }
}

export const getStudentByRegName = (registrationNumber) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/student/getStudentByRegName",
                data: { registrationNumber }
            })
            dispatch(getStudentByRegNameHelper(data.result))
        }
        catch (err) {
            console.log('Error in getting student by registration number', err.message)
        }
    }
    
}


export const getOTPStudent = (studentEmail) => {
    return async (dispatch) => {
        try {
            await axios({
                method: 'Post',
                url: url + '/api/student/forgotPassword',
                data: studentEmail
            })
            alert("Otp has been sent to your email")
            dispatch({type:SET_FLAG})
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const submitOTPStudent = (newPasswordWithOtp, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/student/postOTP" ,
                data:newPasswordWithOtp
            })
            alert("Password Update, kindly login with updated password")
            history.push('/')
        }
        catch (err){
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const sendMessage = (room,messageobj) => {
    return async () => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + `/api/student/chat/${room}`,
                data: messageobj
            })
        }
        catch (err) {
            console.log("Error in sending message",err.message)
        }
    }
}


export const getPrivateConversation = (roomId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: url + `/api/student/chat/${roomId}`,
            })
            dispatch(privateConversation(data.result))
        }
        catch (err) {
            console.log("Error in sending message", err.message)
        }
    }
}

export const getPrivateConversation2 = (roomId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: url + `/api/student/chat/${roomId}`,
            })
            dispatch(privateConversation2(data.result))
        }
        catch (err) {
            console.log("Error in sending message", err.message)
        }
    }
}

export const previousChats = (senderName) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: url + `/api/student/chat/previousChats/${senderName}`,
            })
            dispatch(previousChatsHelper(data.result))
        }
        catch (err) {
            console.log("Error in sending message", err.message)
        }
    }
}


export const newerChats = (receiverName) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: url + `/api/student/chat/newerChats/${receiverName}`,
            })
            dispatch(newerChatsHelper(data.result))
        }
        catch (err) {
            console.log("Error in sending message", err.message)
        }
    }
}

export const studentUpdate = (updatedData) => {
    return async () => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + `/api/student/updateProfile`,
                data: updatedData
            })
        }
        catch (err) {
            console.log("Error in sending message", err.message)
        }
    }
}

export const getAllSubjects = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: url + "/api/student/getAllSubjects"
            })
            dispatch(getAllSubjectsHelper(data.result))
        }
        catch (err) {
            console.log("Error in sending message", err.message)
        }
    }
}

export const fetchAttendence = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: url + "/api/student/checkAttendence"
            })
            dispatch(fetchAttendenceHelper(data.result))
        }
        catch (err) {
            console.log("Error in sending message", err.message)
        }
    
    }
}

export const getMarks = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Get',
                url: url + "/api/student/getMarks"
            })
           dispatch(getMarksHelper(data.result))
        }
        catch (err) {
            console.log("Error in getting marks", err.message)
        }
    }
}



export const setStudentUser = data => {
    return {
        type: SET_STUDENT,
        payload: data
    };
}

export const studentLogout = () =>
    (dispatch) => {
        // Remove token from localStorage
        localStorage.removeItem('studentJwtToken');
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to {} which will set isAuthenticated to false
        dispatch(setStudent({}));
    };