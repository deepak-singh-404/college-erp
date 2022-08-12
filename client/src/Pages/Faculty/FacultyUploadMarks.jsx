import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { fetchStudents, uploadMarks } from '../../redux/action/facultyAction'
import FacultyHomeHelper from '../../Components/FacultyHomeHelper'
import { useHistory } from 'react-router-dom'
import '../../Style/UploadAttendence.css'


const FacultyUploadMarks = () => {
    const store = useSelector((store) => store)
    const history = useHistory()
    const dispatch = useDispatch() 
    const [department, setDepartment] = useState("")
    const [year, setYear] = useState("")
    const [marks, setMarks] = useState([])
    const [section, setSection] = useState("")
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
        dispatch(uploadMarks(exam,totalMarks, marks, department, section
        ))
    }

    return (
        <section className='upload-attendence'>
            {store.faculty.isAuthenticated ? <>
                <FacultyHomeHelper />
                {store.faculty.fetchedStudentsHelper && <div className="upload-main-container">
                    <div className="form-container-upload">
                        <form noValidate onSubmit={formHandler}>
                            <div className="form-group">
                            <label htmlFor="branchId">Departamento</label>
                    <select
                      onChange={(e) => setDepartment(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.department,
                      })}
                      id="branchId"
                    >
                      <option>Selecione</option>
                      <option value="E.C.E">Ensino Fundamental 1</option>
                      <option value="C.S.E">Ensino Fundamental 2</option>
                      <option value="E.E.E">Ensino Médio</option>
                    </select>
                    {error.department && (
                      <div classNameName="invalid-feedback">
                        {error.department}
                      </div>
                    )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="yearId">Ano</label>
                                <select
                      onChange={(e) => setYear(e.target.value)}
                      className={classnames("form-control", {
                        "is-invalid": error.year,
                      })}
                      id="yearId"
                    >
                      <option>Selecione</option>
                      <option value="1">1° ano fundamental</option>
                      <option value="2">2° ano fundamental</option>
                      <option value="3">3° ano fundamental</option>
                      <option value="4">4° ano fundamental</option>
                      <option value="5">5° ano fundamental</option>
                      <option value="6">6° ano fundamental</option>
                      <option value="7">7° ano fundamental</option>
                      <option value="8">8° ano fundamental</option>
                      <option value="9">9° ano fundamental</option>
                      <option value="10">1° ano ensino médio</option>
                      <option value="11">2° ano ensino médio</option>
                      <option value="12">3° ano ensino médio</option>
                    </select>

                    {error.year && (
                      <div classNameName="invalid-feedback">{error.year}</div>
                    )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="sectionId">Período</label>
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
                            <button type="submit" className="btn-send">Procurar</button>
                        </form>
                    </div>
                                    
                </div>}
                
               
                {!store.faculty.fetchedStudentsHelper && <div className="row  justify-content-center mt-4">
                    <div className="col-md-4">
                        <form onSubmit={secondFormHandler}>
                            <div className="form-group">
                                <label htmlFor="examId">Matérias</label>
                                <select onChange={(e) => setExam(e.target.value)} value={exam} className={classnames("form-control",
                                    {
                                        'is-invalid': errorHelper.exam

                                    })} id="examId">
                                    <option>Selecione</option>
                                    <option value="CycleTest1">Matemática</option>
                                    <option value="CycleTest2">Português</option>
                                    <option value="CycleTest3">Geografia</option>
                                    <option value="CycleTest4">Física</option>
                                    <option value="CycleTest5">História</option>
                                    <option value="CycleTest6">Filosofia</option>
                                    <option value="CycleTest7">Sociologia</option>
                                    <option value="CycleTest8">Artes</option>
                                    <option value="CycleTest9">Biologia/Ciências</option>
                                    <option value="CycleTest10">Química</option>
                                    <option value="CycleTest11">Inglês</option>
                                </select>
                                {errorHelper.exam && (<div classNameName="invalid-feedback">{errorHelper.exam}</div>)}
                                
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome do Aluno</th>
                                        <th scope="col">Presença</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.faculty.fetchedStudents.map((obj, index) =>
                                            <tr key={index}>
                                                <td>{obj.name}</td>
                                                <td><div className="form-check">
                                                    <input className="form-control" required type="number" value={obj.marks} onChange={(e) => handleInputChange(e.target.value, obj._id)} id="defaultCheck1" />
                                                </div></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <button type="submit" className="btn-send">Enviar Presenças</button>
                        </form>
                    </div>
                </div>
                }
            </> : (history.push('/'))}
            
        </section>
    )
}

export default FacultyUploadMarks
