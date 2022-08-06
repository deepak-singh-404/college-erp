import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { adminGetAllFaculty } from '../../redux/action/adminAction'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import classnames from 'classnames'
import {BiSearch} from 'react-icons/bi'
import '../../Style/AdminGetAllFaculty.css'


const AdminGetAllFaculty = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [department, setDepartment] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()


    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminGetAllFaculty({ department }))
    }

    useEffect(() => {
        if (store.admin.allFaculty.length !== 0) {
            setIsLoading(false)
        }
        
    }, [store.admin.allFaculty.length])

    
    return (
        <section className='get-all-faculty'>
            {store.admin.isAuthenticated ? <>
                <AdminHomeHelper />
                        <div className="all-faculty-container">
                            <form form-inline noValidate onSubmit={formHandler}>
                                <div className="select-departament">
                                    <label htmlFor="departmentId">Departamento</label>
                                   <div className="search-container">
                                   <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                        {
                                            'is-invalid': error.department
                                        })} id="departmentId">
                                        <option>Selecione</option>
                                        <option value="E.C.E">Ensino Fundamental 1</option>
                                        <option value="C.S.E">Ensino Fundamental 3</option>
                                        <option value="E.E.E">Ensino Médio</option>
                                    </select>
                                    {error.department && (<div className="invalid-feedback">{error.department}</div>)}
                                    <div className="search-btn">{!isLoading && <button type="submit" className="btn-search-faculty ">Procurar <BiSearch/></button>}</div>
                                   </div>
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
                               
                            </form>


                        </div>
                          <div className="table-infos">
                          <div className="table-container">
                                  <tr>
                                        <th scope="col">N°</th>
                                        <th scope="col">Número de Registro</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Ano de Entrada</th>
                                    </tr>
                            
                                     {
                                        store.admin.allFaculty.map((res, index) =>
                                            <tr key={index} className='infos'>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.registrationNumber}</td>
                                                <td>{res.name}</td>
                                                <td>{res.email}</td>
                                                <td>{res.joiningYear}</td>
                                            </tr>
                                        )
                                    }
                           </div>
                          </div>
                
           </> : (history.push('/'))}
        </section>
    )
}

export default AdminGetAllFaculty
