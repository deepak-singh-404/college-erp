import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { fetchStudents, uploadMarks } from '../../redux/action/facultyAction'
import FacultyHomeHelper from '../../Components/FacultyHomeHelper'
import { useHistory } from 'react-router-dom'



const FacultyUploadMarks = () => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch() 
    const [department, setDepartment] = useState("")
    const [year, setYear] = useState("")
    const [marks, setMarks] = useState([])
    const [section, setSection] = useState("")
    const [subjectCode, setSubjectCode] = useState("")
    const [totalMarks, setTotalMarks] = useState()
    const [exam ,setExam] = useState("")
    const [error, setError] = useState({})
    const [errorHelper, setErrorHelper] = useState({})

   


    const handleInputChange = (value, _id) => {
    
        const newMarks = [...marks]
        let index = newMarks.findIndex(m => m._id === _id)
        if (index === -1) {
            newMarks.push({ _id, value })
        }
        else {
           newMarks[index].value = value
        }
        setMarks(newMarks)
    }

    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    useEffect(() => {
        if (store.errorHelper) {
            setErrorHelper(store.errorHelper)
        }
    }, [store.errorHelper])

    const formHandler = (e) => {
        e.preventDefault()
    
       dispatch(fetchStudents(department, year,  section))

    }



    const secondFormHandler = (e) => {
        e.preventDefault()
        dispatch(uploadMarks(subjectCode, exam, totalMarks, marks, department, section
        ))
    }

    return (
        <div>
            {store.faculty.isAuthenticated ? <>
                <FacultyHomeHelper />
                {store.faculty.fetchedStudentsHelper && <div className="row justify-content-center mt-4 ">
                    <div className="col-md-4">
                        <form noValidate onSubmit={formHandler}>
                            <div className="form-group">
                                <label htmlFor="branchId">Department</label>
                                <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.department

                                    })} id="bramchId">
                                    <option>Select</option>
                                    <option value={store.faculty.faculty.faculty.department}>{store.faculty.faculty.faculty.department}</option>
                                </select>
                                {error.department && (<div classNameName="invalid-feedback">{error.department}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="yearId">Year</label>
                                <select onChange={(e) => setYear(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.year

                                    })} id="yearId">
                                    <option>Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>

                                {error.year && (<div classNameName="invalid-feedback">{error.year}</div>)}
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="semesterId">Semester</label>
                                <select onChange={(e) => setSemester(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.semester

                                    })} id="semesterId">
                                    <option>Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                                {error.year && (<div classNameName="invalid-feedback">{error.year}</div>)}
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="sectionId">Section</label>
                                <select onChange={(e) => setSection(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': error.section

                                    })} id="sectionId">
                                    <option>Select</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                </select>
                                {error.section && (<div classNameName="invalid-feedback">{error.section}</div>)}
                            </div>
                            <button type="submit" className="btn btn-primary">Search</button>
                        </form>
                    </div>
                </div>}


                {!store.faculty.fetchedStudentsHelper && <div className="row  justify-content-center mt-4">
                    <div className="col-md-4">
                        <form onSubmit={secondFormHandler}>
                            <div className="form-group">
                                <label htmlFor="subjectId">Subject Code</label>
                                <select onChange={(e) => setSubjectCode(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': errorHelper.subjectCode

                                    })} id="subjectId">
                                    <option>Select</option>
                                    {
                                        store.faculty.allSubjectCodeList.map(subjectCodeName =>
                                            <option>{subjectCodeName}</option>
                                        )
                                    }
                                </select>
                                {errorHelper.subjectCode && (<div classNameName="invalid-feedback">{errorHelper.subjectCode}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="examId">Exam</label>
                                <select onChange={(e) => setExam(e.target.value)} value={exam} className={classnames("form-control",
                                    {
                                        'is-invalid': errorHelper.exam

                                    })} id="examId">
                                    <option>Select</option>
                                    <option value="CycleTest1">Cycle Test 1</option>
                                    <option value="CycleTest2">Cylce Test 2</option>
                                    <option value="Semester">Semester</option>
                                </select>
                                {errorHelper.exam && (<div classNameName="invalid-feedback">{errorHelper.exam}</div>)}
                            </div>

                            <div className="form-group">
                                <label htmlFor="marksId">Total Marks</label>
                                <input type="number" className={classnames("form-control",
                                    {
                                        'is-invalid': errorHelper.totalMarks

                                    })} id="marksId"
                                    value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} />
                                {errorHelper.totalMarks && (<div classNameName="invalid-feedback">{errorHelper.totalMarks}</div>)}
                            </div>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Registration Number</th>
                                        <th scope="col">Student Name</th>
                                        <th scope="col">Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.faculty.fetchedStudents.map((obj, index) =>
                                            <tr key={index}>
                                                <td>{obj.registrationNumber}</td>
                                                <td>{obj.name}</td>
                                                <td><div className="form-check">
                                                    <input className="form-control" required type="number" value={obj.marks} onChange={(e) => handleInputChange(e.target.value, obj._id)} id="defaultCheck1" />
                                                </div></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <button type="submit" className="btn btn-primary ml-1">Submit</button>
                        </form>
                    </div>
                </div>
                }
            </> : (history.push('/'))}
            
        </div>
    )
}

export default FacultyUploadMarks
