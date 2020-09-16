import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { adminAddAdmin } from '../../redux/action/adminAction'
import AdminHomeHelper from '../../Components/AdminHomeHelper'



const AdminAddAdmin = () => {
    const store = useSelector((state) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')
    const [dob, setDob] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
        else {
            setError({})
        }
    }, [store.error])
    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminAddAdmin({
            name,
            email,
            department,
            contactNumber,
            dob: dob.split("-").reverse().join("-")
        }))
    }

    useEffect(() => {
        if (store.admin.adminAddAdminFlag) {
            setError({})
        }
    }, [store.admin.adminAddAdminFlag])

    useEffect(() => {
        if (store.error || store.admin.adminAddAdminFlag) {
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
        }
    }, [store.error, store.admin.adminAddAdminFlag])

    return (

        <div>
            {store.admin.isAuthenticated ? (<><AdminHomeHelper />
                <div className="container mt-5">
                    <div className="row ">
                        <div className="col">
                            <form noValidate onSubmit={formHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="nameId">Admin Name</label>
                                            <input onChange={(e) => setName(e.target.value)} type="text" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.name
                                                })} id="nameId" />
                                            {error.name && (<div className="invalid-feedback">{error.name}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="emailId">Email</label>
                                            <input onChange={(e) => setEmail(e.target.value)} type="email" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.email
                                                })} id="emailId" />
                                            {error.email && (<div className="invalid-feedback">{error.email}</div>)}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="departmentId">Department</label>
                                            <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                                {
                                                    'is-invalid': error.department
                                                })} id="departmentId">
                                                <option>Select</option>
                                                <option value="E.C.E">E.C.E</option>
                                                <option value="C.S.E">C.S.E</option>
                                                <option value="E.E.E">E.E.E</option>
                                                <option value="I.T">I.T</option>
                                                <option value="Mechanical">Mechanical</option>
                                                <option value="Civil">Civil</option>
                                            </select>
                                            {error.department && (<div className="invalid-feedback">{error.department}</div>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="dobId">DOB</label>
                                            <input onChange={(e) => setDob(e.target.value)} type="date" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.dob
                                                })} id="dobId" />
                                            {error.dob && (<div className="invalid-feedback">{error.dob}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="numberId">Contact Number</label>
                                            <input onChange={(e) => setContactNumber(e.target.value)} type="number" className={classnames("form-control",
                                                {
                                                    'is-invalid': error.contactNumber
                                                })} id="numberId" />
                                            {error.contactNumber && (<div className="invalid-feedback">{error.contactNumber}</div>)}
                                        </div>
                                    </div>
                                </div>
                                    <div class="row justify-content-center">
                                        <div class="col-md-1">
                                            {
                                                isLoading && <div class="spinner-border text-primary" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {!isLoading && <button type="submit" className="btn btn-info  ">Add Admin</button>}
                            </form>
                        </div>
                    </div>
                </div></>) : (history.push('/'))}

        </div>



    )
}

export default AdminAddAdmin

