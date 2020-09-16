import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom';
import { getOTPStudent, submitOTPStudent } from '../redux/action/studentAction'
import { getOTPFaculty, submitOTPFaculty } from '../redux/action/facultyAction'
import classnames from 'classnames'


const ForgotPassword = (props) => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [helper, setHelper] = useState(false)

    useEffect(() => {
        setUser(props.match.params.user)
    }, [user])

    useEffect(() => {
        if (store.error) {
            setErrors(store.error)
        }
    }, [store.error])

    useEffect(() => {
        if (store.student.flag) {
            setHelper(true)
        }
    },[store.student.flag])

    const sendOTPHandler = (e) => {
        e.preventDefault()
        if (user === "student") {
            dispatch(getOTPStudent({ email }))
        }
        else if (user === "faculty") {
           dispatch(getOTPFaculty({email}))
        }
    }

    const submitOTPHandler = (e) => {
        e.preventDefault()
        if (user === "student") {
            dispatch(submitOTPStudent({ email, otp, newPassword, confirmNewPassword },history))
        }
        else if (user === "faculty")
        {
            dispatch(submitOTPFaculty({ email, otp, newPassword, confirmNewPassword }, history))
            }
    }




    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 m-auto">
                    {!helper ? <>
                        <form noValidate onSubmit={sendOTPHandler}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail11">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className={classnames('form-control', {
                                    'is-invalid': errors.email
                                })} id="exampleInputEmail11" placeholder="Provide our registered email" aria-describedby="emailHelp" />
                                <small id="emailHelp" className="form-text text-muted">OTP will be only valid for 5 minute.</small>
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary">Send OTP</button>
                        </form>
                    </> : <>
                            <form noValidate onSubmit={submitOTPHandler}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">OTP</label>
                                    <input onChange={(e) => setOtp(e.target.value)} value={otp} type="number" className={classnames('form-control', {
                                        'is-invalid': errors.otp
                                    })} id="exampleInputEmail1" />
                                    {errors.otp && (
                                        <div className="invalid-feedback">{errors.otp}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail2">New Password</label>
                                    <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type="password" className={classnames('form-control', {
                                        'is-invalid': errors.newPassword
                                    })} id="exampleInputEmail2" />
                                    {errors.newPassword && (
                                        <div className="invalid-feedback">{errors.newPassword}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail3">Confirm New Password</label>
                                    <input onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} type="password" className={classnames('form-control', {
                                        'is-invalid': errors.confirmNewPassword
                                    })} id="exampleInputEmail3" />
                                    {errors.confirmNewPassword && (
                                        <div className="invalid-feedback">{errors.confirmNewPassword}</div>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </>}
                </div>
            </div>
        </div>
    )
}

export default withRouter(ForgotPassword)
