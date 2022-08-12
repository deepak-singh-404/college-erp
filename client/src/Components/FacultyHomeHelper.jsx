import React, {useState,useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {facultyLogout} from '../redux/action/facultyAction'
import { CgProfile } from "react-icons/cg";
import {FaHome} from "react-icons/fa";
import {BsClipboardData,BsCheckLg} from 'react-icons/bs'
import {GrDocumentUpdate} from 'react-icons/gr'
import "./GlobalHomeHelpStyles.css";

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
  
      <div className="navigation" id="navbarNav">
        <nav className="navigation-container">
       {/*  <div className="logo"><img src={logo}/></div> */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink activeClassName="active" to="/home">
                <li><FaHome  className="icon"/> HOME</li>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" to="/faculty/updateProfile">
                <li><GrDocumentUpdate/>Atualilzar Perfil</li>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" to="/attendenceFaculty">
                <li><BsCheckLg/>Chamada</li>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active"  to="/faculty/uploadMarks">
                <li><BsClipboardData/>Enviar Chamadas</li>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" to="/faculty/updatePassword">
                <li> <GrDocumentUpdate/>Atualizar Senha</li>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    )
}

export default Home
