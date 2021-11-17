import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import { SET_FACULTY, SET_ERRORS, SET_FLAG, SET_ERRORS_HELPER } from '../actionTypes'

const setFaculty = (data) => {
    return {
        type: SET_FACULTY,
        payload: data
    }
}

const url = "http://localhost:5000"

const fetchStudentsHelper = (data) => {
    return {
        type: "FETCH_STUDENTS",
        payload: data
    }
}

const subjectCodeListHelper = (data) => {
    return {
        type: "GET_SUBJECTCODE_LIST",
        payload: data
    }
}


export const facultyLogin = (facultyCredential) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/faculty/login",
                data: facultyCredential
            })
            const { token } = data;
            // Set token to local Storage
            localStorage.setItem('facultyJwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setFaculty(decoded))
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

export const facultyUpdatePassword = (passwordData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/faculty/updatePassword",
                data: passwordData
            })
            alert("Password Updated Successfully")
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const getOTPFaculty = (studentEmail) => {
    return async (dispatch) => {
        try {
            await axios({
                method: 'Post',
                url: url + '/api/faculty/forgotPassword',
                data: studentEmail
            })
            alert("Otp has been sent to your email")
            dispatch({ type: SET_FLAG })
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const submitOTPFaculty = (newPasswordWithOtp, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/faculty/postOTP",
                data: newPasswordWithOtp
            })
            alert("Password Update, kindly login with updated password")
            history.push('/')
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}


export const fetchStudents = (department, year, section) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + "/api/faculty/fetchStudents",
                data: { department, year, section}
            })
            dispatch(fetchStudentsHelper(data.result))
            dispatch(subjectCodeListHelper(data.subjectCode))
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        }
    }
}

const facultyUpdateProfileFlag = (data) => {
    return {
        type: "FACULTY_UPDATE_PROFILE_FLAG",
        payload: data
    }
}

export const facultyUpdate = (updatedData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'Post',
                url: url + `/api/faculty/updateProfile`,
                data: updatedData
            })
            dispatch(facultyUpdateProfileFlag(true))
        }
        catch (err) {
            console.log("Error in sending message", err.message)
        }
    }
}

export const markAttendence = (selectedStudents, subjectCode, department, year,
           section) => {
    return async(dispatch) => {
        try {
                await axios({
                method: 'Post',
                    url: url + "/api/faculty/markAttendence",
                data: { selectedStudents, subjectCode, department, year, section}
                })
            alert("attendence has been marked successfully")
            dispatch({
                type: "HELPER",
                payload: true
            })
        }
        catch (err) {
           console.log("Error in marking attendence, faculty action", err.message)
        }
    }
}

export const uploadMarks = (subjectCode, exam, totalMarks, marks,
    department, year, section, ) => {
    return async (dispatch) => {
        try {
            await axios({
                method: 'Post',
                url: url + "/api/faculty/uploadMarks",
                data: {
                    subjectCode, exam, totalMarks, marks, department, year, section,
                    }
            })
            alert("Mark uploaded successfully")
            dispatch({
                type: "HELPER",
                payload: true
            })
           
        }
        catch (err) {
            dispatch({
                type: SET_ERRORS_HELPER,
                payload: err.response.data
            })
        }
    }
}

export const setFacultyUser = data => {
    return {
        type: SET_FACULTY,
        payload: data
    };
}

export const facultyLogout = () =>
    (dispatch) => {
        // Remove token from localStorage
        localStorage.removeItem('facultyJwtToken');
        // Remove auth header for future requests
        setAuthToken(false);
        // Set current user to {} which will set isAuthenticated to false
        dispatch(setFaculty({}));
    };