import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getStudentByRegName } from '../redux/action/studentAction'
import HomeHelper from '../Components/HomeHelper'

const RecieverUserDetails = (props) => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch()

    const [registrationNumber, setRegistrationNumber] = useState("")
  


    useEffect(() => {
        setRegistrationNumber(props.match.params.registrationNumber)
        dispatch(getStudentByRegName(registrationNumber))
        
    }, [registrationNumber]) 


    return (
        <div>
            {store.student.isAuthenticated ? <>
                <HomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={store.student.regNumStudent.avatar} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{store.student.regNumStudent.name}</h5>
                                            <h5 className="card-title">{}</h5>
                                            <Link to={`/chat/${store.student.regNumStudent.registrationNumber}.${store.student.student.student.registrationNumber}`}>CHAT</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <table className="table border">
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{store.student.regNumStudent.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{store.student.regNumStudent.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Registration Number</td>
                                                <td>{store.student.regNumStudent.registrationNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>Year</td>
                                                <td>{store.student.regNumStudent.year}</td>
                                            </tr>
                                            <tr>
                                                <td>Department</td>
                                                <td>{store.student.regNumStudent.department}</td>
                                            </tr>
                                            <tr>
                                                <td>Section</td>
                                                <td>{store.student.regNumStudent.section}</td>
                                            </tr>
                                            <tr>
                                                <td>Batch</td>
                                                <td>{store.student.regNumStudent.batch}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">

                        </div>

                    </div>
                </div>





            </> : (history.push('/'))}
        </div>

    )
}

export default RecieverUserDetails
