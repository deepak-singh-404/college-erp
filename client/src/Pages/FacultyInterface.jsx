import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CalendarFaculty from "../Components/CalendarFaculty";
import FacultyHomeHelper from "../Components/FacultyHomeHelper";
import "../Style/FacultyInterface.css";
import {BsClipboardData,BsCheckLg} from 'react-icons/bs'
import {FaBook} from 'react-icons/fa'

const FacultyInterface = () => {
  const history = useHistory();
  const store = useSelector((store) => store);
  return (
  <section className="faculty-interface">
      <div className="faculty-interface-header">
        <FacultyHomeHelper />
      </div>
      <div className="faculty-interface-container">
      <div className="text-name"><h1>Bem Vindo(a) de Volta <span className="name">{store.faculty.faculty.faculty.name} !</span></h1></div>
      <div className="Cards-container">
              
              <div className="card">
                <Link activeClassName="active" to="/attendenceFaculty">
                  <BsCheckLg className="icon"/>
                    <p>CHAMADA</p>
                </Link>
              </div>
              <div className="card">
                <Link activeClassName="active" to="/faculty/uploadMarks">
                <BsClipboardData className="icon"/>
                    <p>ENVIAR CHAMADAS</p>
                </Link>
              </div>
              <div className="card">
                <Link activeClassName="active" to="/">
                    <FaBook className='icon'/>
                    <p>LANÇAR NOTAS</p>
                </Link>
              </div>
             
          
        </div>
       <div className="calendar-container-interface">
       <CalendarFaculty />
       </div>
      </div>
    </section>
  );
};

export default FacultyInterface;
