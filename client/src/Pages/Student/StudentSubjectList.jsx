import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSubjects } from '../../redux/action/studentAction'
import HomeHelper from '../../Components/HomeHelper'
import { useHistory } from 'react-router-dom'

const StudentSubjectList = () => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(getAllSubjects())
    },[])
    return (
        <>
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
                                        <th scope="col">Year</th>
                                        <th scope="col">Total Lectures</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.student.allSubjects.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.subjectCode}</td>
                                                <td>{res.subjectName}</td>
                                                <td>{res.year}</td>
                                                <td>{res.totalLectures}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div></> : (history.push('/'))}
           
            </>
    )
}

export default StudentSubjectList
