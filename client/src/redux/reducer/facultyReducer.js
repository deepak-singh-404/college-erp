
import { SET_FACULTY } from '../actionTypes'

import isEmpty from '../validation/is-empty'

const initialState = {
    isAuthenticated: false,
    faculty: {},
    flag: false,
    updateProfileFlag: false,
    allSubjectCodeList: [],
    fetchedStudents: [],
    fetchedStudentsHelper: true
}


const facultyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FACULTY: {
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                faculty: action.payload
            }
        }
        case "FETCH_STUDENTS": {
            return {
                ...state,
                fetchedStudentsHelper: false,
                fetchedStudents: action.payload
            }
        }
        case "FACULTY_UPDATE_PROFILE_FLAG": {
            return {
                ...state,
                updateProfileFlag: action.payload
            }
        }
        case "GET_SUBJECTCODE_LIST": {
            return {
                ...state,
                allSubjectCodeList: action.payload
            }
        }
        case "HELPER": {
            return {
                ...state,
                fetchedStudentsHelper: action.payload
            }
        }
        default:
            return state
    }
}

export default facultyReducer