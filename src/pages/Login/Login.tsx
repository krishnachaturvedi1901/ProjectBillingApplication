import React, { useEffect } from "react";
import styles from "./Login.module.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useLoginMutation } from "../../states/query/Login_queries/loginQueries";
import { AuthContext } from "../../states/context/AuthContext/AuthContext";
import { validateToken } from "../../states/context/AuthContext/validateToken";
import { LinearProgress } from "@mui/material";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [logoutExecuted, setLogoutExecuted] = useState(false);
  const {
    isAuth,
    setIsAuth,
    adminId,
    setAdminId,
    setAdminData,
    logoutAdmin,
  } = useContext(AuthContext);
  const [authData, setAuthData] = useState({ email: "", password: "" });

  useEffect(() => {
    const validateTokenFunction = async () => {
      const result = await validateToken();
      if (result.validation && result.adminId) {
        setIsAuth(true);
        setAdminId(result.adminId);
      }
    };
    validateTokenFunction();
  }, []);

  useEffect(() => {
    const validateTokenFunction = async () => {
      const result = await validateToken();
      if (result.validation && result.adminId) {
        setIsAuth(true);
        setAdminId(result.adminId);
      }
    };
    validateTokenFunction();
  }, [isAuth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const LoginMutationHandler = useLoginMutation();
  const { isLoading, isError, isSuccess, data } = LoginMutationHandler;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    LoginMutationHandler.mutate(authData, {
      onSuccess: (data) => {
        console.log("Login User return response2", data);
        setAdminData(data.userDto);
        // setAdminId(data.uerDto.id) say yashraj to send id as well
        setIsAuth(true);
      },
      onError: (error) => {
        console.log("Error in login", error);
      },
    });
  };

  const handleLogout = () => {
    setLogoutExecuted(true);
    logoutAdmin();
  };

  if (isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="md:flex h-screen m-0 p-0  ">
      <div className={styles.loginSignupDiv}>
        <div className={styles.loginDiv}>
          <h1 className="text-3xl mb-5">Admin Login</h1>
          <hr />
          {isAuth ? (
            <p>
              Hlw, {data && data.userDto ? data.userDto.name : "Admin"} login
              successfull want to logout.
            </p>
          ) : (
            <p className="text-slate-500">
              If you have an account, sign in with email address. In case of any
              signing issue, please use Forgot Password link.
            </p>
          )}
          {isAuth ? (
            <button id={styles.logoutBtn} onClick={() => handleLogout()}>
              Logout
            </button>
          ) : (
            <form onSubmit={(e) => handleSubmit(e)}>
              {isError ? (
                <p id={styles.errorWarningPTag}>
                  User with give email or password not found! Try using right
                  email and password.
                </p>
              ) : null}
              {isLoading ? <LinearProgress /> : null}
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                name="email"
                required
                onChange={(e) => handleChange(e)}
              />
              <div className={styles.loginPasswordDiv}>
                <label htmlFor="password">Password:</label>
                <br />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  name="password"
                  required
                  onChange={(e) => handleChange(e)}
                />
                <div
                  className={styles.showPassEyeDiv}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </div>
              {!isAuth ? (
                <button id={styles.loginBtn} type="submit">
                  Login
                </button>
              ) : null}
              <button id={styles.forgetPasswordBtn}>Forget password ?</button>
            </form>
          )}
        </div>
      </div>
      <div className=" bg-teal-800 dark:bg-slate-800 md:w-2/3 sm:h-40 md:h-auto  text-colorLightFont  p-24 md:text-6xl md:flex justify-start items-center flex-col m-0  ">
        <div className="md:flex flex-col gap-8">
          <p>Your</p>
          <p>Personal</p>
          <p>
            <mark className="p-1 rounded-md bg-colorNormalButtonHover ">
              Billing
            </mark>
          </p>
          <p>Patner</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
