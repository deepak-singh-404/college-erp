import React from 'react';
import {useSelector} from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './redux/utils/setAuthToken'
import store from './redux/store'

import { setFacultyUser, facultyLogout } from './redux/action/facultyAction'

import { setAdminUser, adminLogout, adminGetAllStudent } from './redux/action/adminAction'

import { setStudentUser, studentLogout } from './redux/action/studentAction'


import LoginPage from './Pages/LoginPage'
import Home from './Pages/StudentHome'


import StudentDetails from './Pages/StudentDetails'
import facultyInterface from './Pages/FacultyInterface'
import AttendenceFaculty from './Pages/AttendenceFaculty'

import AdminAddStudent from './Pages/AdminAddStudent'
import AdminAddFaculty from './Pages/AdminAddFaculty'
import AdminAddSubject from './Pages/AdminAddSubject'
import StudentAttendencePage from './Pages/StudentAttendencePage'
import FacultyStudentLoginPags from './Pages/FacultyStudentLoginPags'
import StudentUpdatePassword from './Pages/StudentUpdatePassword'
import FacultyUpdatePassword from './Pages/FacultyUpdatePassword'
import ForgotPassword from './Pages/ForgotPassword'
import Chat from './Pages/Chat'
import RecieverUserDetails from './Pages/RecieverUserDetails'
import StudentUpdateProfile from './Pages/StudentUpdateProfile'
 
import StudentSubjectList from './Pages/Student/StudentSubjectList'

import FacultyUploadMarks from './Pages/Faculty/FacultyUploadMarks'

import FacultyUpdateProfile from './Pages/Faculty/FacultyUpdateProfile'

import StudentTestPerformace from './Pages/Student/StudentTestPerformance'

import AdminAddAdmin from './Pages/Admin/AdminAddAdmin'

import AdminGetAllFaculty from './Pages/Admin/AdminGetAllFaculty'

import AdminGetAllStudent from './Pages/Admin/AdminGetAllStudents'

import AdminGetAllSubject from './Pages/Admin/AdminGetAllSubjects'

import AdminHome from './Pages/Admin/AdminHome'
 
if (window.localStorage.facultyJwtToken) {
  setAuthToken(localStorage.facultyJwtToken);
  const decoded = jwt_decode(localStorage.facultyJwtToken);
 
  store.dispatch(setFacultyUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(facultyLogout());
    window.location.href = '/';
  }
}
else if (window.localStorage.studentJwtToken) {
  setAuthToken(localStorage.studentJwtToken);
  const decoded = jwt_decode(localStorage.studentJwtToken);

  store.dispatch(setStudentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(studentLogout());
    window.location.href = '/';
  } 
}
else if (window.localStorage.adminJwtToken) {
  setAuthToken(localStorage.adminJwtToken);
  const decoded = jwt_decode(localStorage.adminJwtToken);

  store.dispatch(setAdminUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(adminLogout());
    window.location.href = '/';
  } 
}

function App() {
  const store = useSelector((store)=>store)
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={FacultyStudentLoginPags} />
          <Route exact path='/adminLogin' component={LoginPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/student/updateProfile' component={StudentUpdateProfile} />
          <Route exact path="/studentDetails" component={StudentDetails} />
          <Route exact path='/faculty' component={facultyInterface} />
          <Route exact path='/attendenceFaculty' component={AttendenceFaculty} />
          <Route exact path='/admin' component={AdminHome} />
          <Route exact path="/admin/addStudent" component={AdminAddStudent} />
          <Route exact path="/admin/addFaculty" component={AdminAddFaculty} />
          <Route exact path="/admin/addSubject" component={AdminAddSubject} />
          <Route exact path="/admin/addAdmin" component={AdminAddAdmin} />
          <Route exact path="/admin/allFaculties" component={AdminGetAllFaculty} />
          <Route exact path="/admin/allStudents" component={AdminGetAllStudent} />
          <Route exact path="/admin/allSubject" component={AdminGetAllSubject} />
          <Route exact path="/student/attendence" component={StudentAttendencePage} />
          <Route exact path="/student/updatePassword" component={StudentUpdatePassword} />
          <Route exact path="/student/testPerformance" component={StudentTestPerformace} />
          <Route exact path="/faculty/updatePassword" component={FacultyUpdatePassword} />
          <Route exact path="/faculty/uploadMarks" component={FacultyUploadMarks} />
          <Route exact path="/faculty/updateProfile" component={FacultyUpdateProfile} />
          <Route exact path="/student/getAllSubjects" component={StudentSubjectList} />
          <Route exact path="/forgotPassword/:user" component={ForgotPassword} />
          <Route exact path="/chat/:room" component={Chat} />
          <Route exact path="/student/:registrationNumber" component={RecieverUserDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
