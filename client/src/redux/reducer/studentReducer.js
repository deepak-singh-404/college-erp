
import { SET_STUDENT, SET_OTP, SET_FLAG } from '../actionTypes'

import isEmpty from '../validation/is-empty'

const initialState = {
    isAuthenticated: false,
    student: {},
    alongsideStudent: {},
    flag: false,
    chatHistory: [],
    regNumStudent: {},
    privateChat: [],
    privateChat2: [],
    newerChats: [],
    previousChats: [],
    allSubjects: [],
    attendence: [], 
    allMarks: {}
}


const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STUDENT:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                student: action.payload
            }
        case "CHAT_HELPER":
            return {
                ...state,
                alongsideStudent: action.payload
            }
        case SET_FLAG:
            return {
                ...state,
                flag: true
            }
        case "SET_CHAT":
            return {
                ...state, 
                chatHistory : [state.chatHistory, action.payload]
            }
        case "GET_STUDENT_BY_REG_NUM": {
            return {
                ...state,
                regNumStudent: action.payload
            }
        }
        case "GET_PRIVATE_CONVERSATION": {
            return {
                ...state,
                privateChat: action.payload
            }
        }
        case "GET_PRIVATE_CONVERSATION2": {
            return {
                ...state,
                privateChat2: action.payload
            }
        }
        case "GET_NEWER_CHATS": {
            return {
                ...state,
                newerChats: action.payload
            }
        }
        case "GET_PREVIOUS_CHATS": {
            return {
                ...state,
                previousChats: action.payload
            }
        }
        case "GET_ALL_SUBJECTS": 
            return {
                ...state,
                allSubjects: action.payload
            }
        
        case "GET_ATTENDENCE": 
            return {
                ...state,
                attendence: action.payload
            }
        
        case "GET_MARKS": 
            return {
                ...state,
                allMarks: action.payload
            }
        
        default:
            return state
        
    } 
}

export default studentReducer