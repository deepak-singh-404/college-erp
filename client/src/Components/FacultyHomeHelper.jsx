import React, {useState,useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {facultyLogout} from '../redux/action/facultyAction'
import '../Style/FacultyHomeHelper.css'
import {AiOutlinePoweroff} from 'react-icons/ai'


const Home = () => {
    const store = useSelector((store)=>store)
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    useEffect(() => {

        if (store.faculty.faculty.faculty.name) {
            setName(store.faculty.faculty.faculty.name)
        }
    }, [store.faculty.faculty.faculty.name])
    const logoutHandler = () => {
        dispatch(facultyLogout())
        history.push('/')
    }
    return (
        <div className="container-fluid">
      <header className="header">
        <div className="profile">
          <div className="picture">
          <button style={{listStyle:"None"}} onClick={logoutHandler} type="button" className="btn-logout-faculty"><li>LOGOUT<AiOutlinePoweroff/></li></button>
          </div>
        </div>
      </header>
      <div className="navigation" id="navbarNav">
        <div className="card"></div>
        <nav className="navigation-container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink activeClassName="active" to="/home">
                <li> HOME</li>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" to="/faculty/updateProfile">
                <li>Atualilzar Perfil</li>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" to="/attendenceFaculty">
                <li> Chamada</li>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active"  to="/faculty/uploadMarks">
                <li>Chamadas Feitas</li>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" to="/faculty/updatePassword">
                <li>Atualizar Senha</li>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    )
}

export default Home
