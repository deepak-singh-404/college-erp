import { combineReducers } from 'redux';
import facultyReducer from './facultyReducer'
import adminReducer from './adminReducer'
import studentReducer from './studentReducer'
import errorReducerHelper from './errorReducerHelper'
import errorReducer from './errorReducer'


export default combineReducers({
    faculty: facultyReducer,
    admin: adminReducer,
    student: studentReducer,
    error: errorReducer,
    errorHelper: errorReducerHelper
});