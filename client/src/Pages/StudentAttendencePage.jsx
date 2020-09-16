import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchAttendence} from '../redux/action/studentAction'

import axios from 'axios'
import HomeHelper from '../Components/HomeHelper'
import { useHistory } from 'react-router-dom'

const Home = () => {
    const store = useSelector(store => store)
    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(() => {
      dispatch(fetchAttendence())  
    },[])

    return (
        <div>
            {store.student.isAuthenticated ? <>
                <HomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-6 m-auto">
                            <table className="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Subject Code</th>
                                        <th scope="col">Subject Name</th>
                                        <th scope="col">Maximum Hours</th>
                                        <th scope="col">Present Hours</th>
                                        <th scope="col">Absent Hours</th>
                                        <th scope="col">Total Hours</th>
                                        <th scope="col">Attendence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.student.attendence.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.subjectCode}</td>
                                                <td>{res.subjectName}</td>
                                                <td>{res.maxHours}</td>
                                                <td>{res.lectureAttended}</td>
                                                <td>{res.absentHours}</td>
                                                <td>{res.totalLecturesByFaculty}</td>
                                                <td>{res.attendence}%</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </> : (history.push('/'))}
           
            
        </div>

    )
}

export default Home
