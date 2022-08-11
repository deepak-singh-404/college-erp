import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { adminLogin } from '../redux/action/adminAction'
import classnames from 'classnames'
import logo from "../Style/Images/tech school logo.png";
import '../Style/AdminLogin.css'



const LoginPage = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch( )
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    useEffect(() => {
        if (store.admin.isAuthenticated) {
            history.push('/admin')
        }
    }, [store.admin.isAuthenticated])
    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])

    const fromHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminLogin({registrationNumber, password}))
       
    }

    useEffect(() => {
        if (store.error ||
            store.admin.isAuthenticated) {
            setIsLoading(false)
        }
        
        else {
            setIsLoading(true)
        }
    }, [store.error, store.admin.isAuthenticated])

    
    return (
        <div className="container">
                        <div className='box-login'>
                        <div className="logo"><img src={logo} alt="logo tech school" /></div>
                            <h1 className="display-4 text-center">ADMIN PAINEL</h1>
                            <form noValidate onSubmit={fromHandler}>
                                <div className="form-group">
                                    <label htmlFor="emailId">Número de Registro</label>
                                    <input onChange={(e) => setRegistrationNumber(e.target.value)} type="text" value={registrationNumber} className={classnames("form-control form-control-lg",
                                        {'is-invalid' : error.registrationNumber
                                        
                                        })} id="emailId" />
                                    {error.registrationNumber && (<div className="invalid-feedback">{error.registrationNumber}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordId">Senha</label>
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} className={classnames("form-control form-control-lg", {
                                        "is-invalid": error.password
                                    })}type="password" id="passwordId" />
                                    {error.password && (<div className="invalid-feedback">{error.password}</div>)}
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-1">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Carregando...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {!isLoading && <button type="submit" className="btn-login-admin">Login</button>}
                            </form>
                        </div>
        </div>
    )
}

export default LoginPage
