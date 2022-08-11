import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { facultyLogin } from "../redux/action/facultyAction";
import { studentLogin } from "../redux/action/studentAction";
import classnames from "classnames";
import logo from "../Style/Images/tech school logo.png";

import "../Style/facultyStudentLogin.css";

const FacultyStudentLoginPags = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [facultyRegNum, setFacultyRegNum] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");
  const [studentRegNum, setStudentRegNum] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorsHelper, setErrorsHelper] = useState({});
  const [isFacultyLoading, setIsFacultyLoading] = useState(false);
  const [isStudentLoading, setIsStudentLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (store.faculty.isAuthenticated) {
      history.push("/faculty");
    }
  }, [store.faculty.isAuthenticated]);

  useEffect(() => {
    if (store.error) {
      setErrors(store.error);
    }
  }, [store.error]);
  useEffect(() => {
    if (store.student.isAuthenticated) {
      history.push("/home");
    }
  }, [store.student.isAuthenticated]);

  useEffect(() => {
    if (store.errorHelper) {
      setErrorsHelper(store.errorHelper);
    }
  }, [store.errorHelper]);

  const facultyFormHandler = (e) => {
    e.preventDefault();
    let registrationNumber;
    let password;
    setIsFacultyLoading(true);
    dispatch(
      facultyLogin({
        registrationNumber: facultyRegNum,
        password: facultyPassword,
      })
    );
  };

  useEffect(() => {
    if (store.error || store.faculty.isAuthenticated) {
      setIsFacultyLoading(false);
    } else {
      setIsFacultyLoading(true);
    }
  }, [store.error, store.faculty.isAuthenticated]);

  const studentFormHandler = (e) => {
    e.preventDefault();
    let registrationNumber;
    let password;
    setIsStudentLoading(true);
    dispatch(
      studentLogin({
        registrationNumber: studentRegNum,
        password: studentPassword,
      })
    );
  };

  useEffect(() => {
    if (store.errorHelper || store.student.isAuthenticated) {
      setIsStudentLoading(false);
    } else {
      setIsStudentLoading(false);
    }
  }, [store.errorHelper, store.student.isAuthenticated]);

  return (
    <section className="main-login-page">
     <div className="main-container-login">
     <div className="global-login-container">

<div className="login-container">
  <div className="box-login">
    <h3 className="text-center ">Logar como Professor</h3>
    <form noValidate onSubmit={facultyFormHandler}>
      <div className="form-group">
        <label htmlFor="facRegId">Número de Registro</label>
        <input
          onChange={(e) => setFacultyRegNum(e.target.value)}
          type="text"
          value={facultyRegNum}
          className={classnames("form-control", {
            "is-invalid": errors.registrationNumber,
          })}
          id="facRegId"
        />
        {errors.registrationNumber && (
          <div className="invalid-feedback">
            {errors.registrationNumber}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="passwordFacId">Senha</label>
        <input
          onChange={(e) => setFacultyPassword(e.target.value)}
          value={facultyPassword}
          className={classnames("form-control", {
            "is-invalid": errors.password,
          })}
          type="password"
          id="passwordFacId"
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>
      <div>
        <div>
          {isFacultyLoading && (
            <div role="status">
              <span class="sr-only">Cerregando...</span>
            </div>
          )}
        </div>
      </div>
      <p className="forgot-password">
        <Link to="/forgotPassword/faculty">Esqueci a Senha</Link>
      </p>
      {!isFacultyLoading && <button type="submit" className="btn-login">LOGIN</button>}
    </form>
  </div>
</div>
<div className="login-container">
    <div className="box-login">
      <h3 className="text-center">Logar como Aluno</h3>
      <form noValidate onSubmit={studentFormHandler}>
        <div className="form-group">
          <label htmlFor="studentId">Número de Registro</label>
          <input
            onChange={(e) => setStudentRegNum(e.target.value)}
            type="text"
            value={studentRegNum}
            className={classnames("form-control", {
              "is-invalid": errorsHelper.registrationNumber,
            })}
            id="studentId"
          />
          {errorsHelper.registrationNumber && (
            <div className="invalid-feedback">
              {errorsHelper.registrationNumber}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="passwordId">Senha</label>
          <input
            onChange={(e) => setStudentPassword(e.target.value)}
            value={studentPassword}
            className={classnames("form-control", {
              "is-invalid": errorsHelper.password,
            })}
            type="password"
            id="passwordId"
          />
          {errorsHelper.password && (
            <div className="invalid-feedback">
              {errorsHelper.password}
            </div>
          )}
        </div>
        <div class="row justify-content-center">
          <div class="col-md-1">
            {isStudentLoading && (
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Carregando...</span>
              </div>
            )}
          </div>
        </div>
        <p className="forgot-password">
        <Link to="/forgotPassword/student">
          Esqueci a Senha
        </Link>
      </p>
        {!isStudentLoading && (
          <button type="submit" className="btn-login ">
            LOGIN
          </button>
        )}
      </form>
    </div>
  </div>
</div>

  <div className="text-title">
      <h1>TECH SCHOOL</h1>
      <h3>Sistema de Gestão Escolar</h3>
  <div className="logo"><img src={logo} alt="Logo tech school" /></div>
  </div>
     </div>
    </section>
  );
};

export default FacultyStudentLoginPags;
