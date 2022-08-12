import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, withRouter } from 'react-router-dom'
import { facultyUpdate, facultyLogout} from '../../redux/action/facultyAction'
import '../../Style/UpdateProfileFaculty.css'
import FacultyHomeHelper from '../../Components/FacultyHomeHelper'


const FacultyUpdateProfile = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [gender, setGender] = useState('')
    const [facultyMobileNumber, setContactNumber] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setAvatar(img)
        }
    }


    const formHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("gender", gender)
        formData.append("facultyMobileNumber", facultyMobileNumber)
        formData.append("aadharCard", aadharCard)
        formData.append("avatar", avatar)
        formData.append("email", store.faculty.faculty.faculty.email)
        setIsLoading(true)
        dispatch(facultyUpdate(formData, history))
        alert("Kindly login again to see updates")
        dispatch(facultyLogout())
        history.push('/')
    }

    useEffect(() => {
        if (store.faculty.updateProfileFlag) {
            setIsLoading(false)
        }
    }, [store.faculty.updateProfileFlag])
    return (
        <section className='update-profile-faculty'>
            {store.faculty.isAuthenticated ? <>
                <FacultyHomeHelper />
                        <div className="update-profile-faculty-container">
                            <form onSubmit={formHandler}>
                                <div className="form-group">
                                    <label htmlFor="inputId">Foto de Perfil</label>
                                    <input required className="form-control" type="file" accept=".jpg,.png,.jpeg" id="inputId" onChange={imagehandler}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="genderId">Gênero</label>
                                    <select onChange={(e) => setGender(e.target.value)} className="form-control" id="genderId">
                                        <option>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="numberId">Número de Contato</label>
                                    <input onChange={(e) => setContactNumber(e.target.value)} required type="number" className="form-control" id="numberId" />
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
                                {!isLoading && <button type="submit" className="btn-search">Atualizar</button>}
                            </form>
                        </div>
             </> : (history.push('/'))}
            
        </section>
    )
}

export default withRouter(FacultyUpdateProfile)
