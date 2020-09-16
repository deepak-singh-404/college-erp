import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import AdminHomeHelper from '../../Components/AdminHomeHelper'

const AdminHome = () => {
    const store = useSelector((store) => store)

    const history = useHistory()
    return (
        <div>
           
            {store.admin.isAuthenticated ? <>
                <AdminHomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-2">
                        </div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={store.admin.admin.avatar} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{store.admin.admin.name}</h5>
                                            <h5 className="card-title">{store.admin.admin.registrationNumber}</h5>
                                            {/* <Link to='/faculty/updateProfile'>UPDATE PROFILE</Link> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <table className="table border">
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{store.admin.admin.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{store.admin.admin.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Registration Number</td>
                                                <td>{store.admin.admin.registrationNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>Joining Year</td>
                                                <td>{store.admin.admin.joiningYear}</td>
                                            </tr>
                                            <tr>
                                                <td>Department</td>
                                                <td>{store.admin.admin.department}</td>
                                            </tr>
                                            <tr>
                                                <td>Contact Number</td>
                                                <td>{store.admin.admin.contactNumber ?
                                                    store.admin.admin.contactNumber : "NA"}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                </div>
                </> : (history.push('/'))}
                
        </div>
    )
}

export default AdminHome
