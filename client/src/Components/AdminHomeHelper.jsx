import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminLogout } from '../redux/action/adminAction'


const Home = () => {
    const store = useSelector(store => store)
    const [name, setName] = useState("")
    useEffect(() => {

        if (store.admin.admin.name) {
            setName(store.admin.admin.name)
        }
    }, [store.admin.admin.name])
    const history = useHistory()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(adminLogout())
        history.push('/')
    }
    return (
        <div className="container-fluid">
          
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h4 className="navbar-brand mt-1" href="">SRM</h4>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <button type="button" className="btn"><Link to="/admin"><li>{name.toUpperCase()}</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/addFaculty"><li>ADD FACULTY</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/addStudent"><li>ADD STUDENT</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/addSubject"><li>ADD SUBJECT</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/addAdmin"><li>ADD ADMIN</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/allFaculties"><li>OUR FACULTIES</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/allStudents"><li>OUR STUDENTS</li></Link></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/allSubject"><li>SUBJECTS</li></Link></button>
                        </li>

                    </ul>
                </div>
                <div>

                    <button style={{ listStyle: "None" }} onClick={logoutHandler} type="button" className="btn"><li>LOGOUT</li></button>

                </div>
            </nav>
        </div>
    )
}

export default Home
