import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AdminHomeHelper from "../../Components/AdminHomeHelper";
import { adminLogout } from "../../redux/action/adminAction";
import { AiOutlinePoweroff } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {BsFillPersonPlusFill} from 'react-icons/bs'
import {GiTeacher} from 'react-icons/gi'
import {BsPersonLinesFill} from 'react-icons/bs'
import "../../Style/AdminHome.css";

const AdminHome = () => {
  const store = useSelector((store) => store);

  const history = useHistory();
  const logoutHandler = () => {
    dispatch(adminLogout());
    history.push("/");
  };
  const dispatch = useDispatch();
  return (
    <section className="admin-dashboard">
      <AdminHomeHelper />

      {store.admin.isAuthenticated ? (
        
        <div className="dashboard-container">
         <div className="header">
         <div className="profile">
          <div className="picture">
            <CgProfile />
          </div>
          <div className="card-body">
            <h5 className="card-title">{store.admin.admin.name}</h5>
          </div>
         </div>
        </div>
            <div className="text-name"> <h1>Bem vindo de volta <span className="name">{store.admin.admin.name} !</span></h1></div>
            <div className="Cards-container">
              
                  <div className="card">
                    <Link activeClassName="active" to="/admin/addFaculty">
                        <BsFillPersonPlusFill className="icon"/>
                        <p>ADICIONAR PROFESSOR</p>
                    </Link>
                  </div>
                  <div className="card">
                    <Link activeClassName="active" to="/admin/addStudent">
                        <BsFillPersonPlusFill className="icon"/>
                        <p>ADICIONAR ALUNO</p>
                    </Link>
                  </div>
                  <div className="card">
                    <Link activeClassName="active" to="/admin/allFaculties">
                        <GiTeacher className="icon"/>
                        <p>TODOS OS PROFESSORES</p>
                    </Link>
                  </div>
                  <div className="card">
                    <Link activeClassName="active" to="/admin/allStudents">
                        <BsPersonLinesFill className="icon"/>
                        <p>TODOS OS ALUNOS</p>
                    </Link>
                  </div>
                 
              
            </div>
           
        </div>
   
       
      ) : (
        history.push("/")
      )}
    </section>
  );
};

export default AdminHome;
