import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminGetAllStudent } from "../../redux/action/adminAction";
import AdminHomeHelper from "../../Components/AdminHomeHelper";
import classnames from "classnames";
import "../../Style/AdminGetAllStudent.css";

const AdminGetAllFaculty = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({});
  const history = useHistory();

  const formHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(adminGetAllStudent({ department, year }));
  };

  useEffect(() => {
    if (store.admin.allStudent.length !== 0) {
      setIsLoading(false);
    }
  }, [store.admin.allStudent.length]);
  return (
    <section className="all-student-admin">
                <AdminHomeHelper />
      {store.admin.isAuthenticated ? (
        <>

          <div className="admin-all-student">
            <form noValidate onSubmit={formHandler} className='form'> 
              <div className="search-container-student">
                <div className="input-all-student">
                  <label htmlFor="departmentId">Departamento</label>
                  <select
                    onChange={(e) => setDepartment(e.target.value)}
                    className={classnames("form-control", {
                      "is-invalid": error.department,
                    })}
                    id="departmentId"
                  >
                    <option>Selecione</option>
                    <option value="E.C.E">Ensino Fundamental 1</option>
                    <option value="C.S.E">Ensino Fundamental 2</option>
                    <option value="E.E.E">Ensino Médio</option>
                  </select>
                  {error.department && (
                    <div className="invalid-feedback">{error.department}</div>
                  )}
                </div>
                <div className="input-all-student">
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
                    <div className="invalid-feedback">{error.year}</div>
                  )}
                </div>
                <div className="search-student-container">
                  {!isLoading && (
                    <button type="submit" className="btn-search-student  ">
                      Procurar
                    </button>
                  )}
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-md-1">
                  {isLoading && (
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Carregando...</span>
                    </div>
                  )}
                </div>
              </div>
            </form>
            <div className="table-infos">
              <div className="table-container">
                <tr>
                  <th scope="col">Número de Registro</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Número do responsável</th>
                  <th scope="col">Número do Aluno</th>
                </tr>

                {store.admin.allStudent.map((res, index) => (
                  <tr key={index} className="infos">
                    <td>{res.registrationNumber}</td>
                    <td>{res.name}</td>
                    <td>{res.email}</td>
                    <td>{res.fatherMobileNumber}</td>
                    <td>{res.studentMobileNumber}</td>
                  </tr>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </section>
  );
};

export default AdminGetAllFaculty;
