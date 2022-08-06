import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AdminHomeHelper from "../../Components/AdminHomeHelper";
import { adminLogout } from "../../redux/action/adminAction";
import "../../Style/AdminHome.css";
import { AiOutlinePoweroff } from "react-icons/ai";


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
             <button style={{ listStyle: "None" }} onClick={logoutHandler} type="button" className="btn-logout"><li>LOGOUT <AiOutlinePoweroff/></li></button>
            <div className="table">
              <table className="table-border">
                <tbody>
                  <tr>
                    <td>Nome</td>
                    <td>{store.admin.admin.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{store.admin.admin.email}</td>
                  </tr>
                  <tr>
                    <td>Número de Registro</td>
                    <td>{store.admin.admin.registrationNumber}</td>
                  </tr>
                  <tr>
                    <td>Ano de Entrada</td>
                    <td>{store.admin.admin.joiningYear}</td>
                  </tr>
                  <tr>
                    <td>Departamento</td>
                    <td>{store.admin.admin.department}</td>
                  </tr>
                  <tr>
                    <td>Número de Contato</td>
                    <td>
                      {store.admin.admin.contactNumber
                        ? store.admin.admin.contactNumber
                        : "NA"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
           
        </div>
   
       
      ) : (
        history.push("/")
      )}
    </section>
  );
};

export default AdminHome;
