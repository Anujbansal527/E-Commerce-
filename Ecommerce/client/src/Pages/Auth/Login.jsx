import React, { useState } from "react";
import axios from "axios";
import Layouts from "../../Components/Layouts/Layouts";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Styles/AuthStyle.css";
import { useAuth } from "../../Context/auth";

const Login = () => {
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const ChangeValue = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        user
      );

      if (res && res.data.sucess) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layouts title={"Login Page"}>
      <div className="form-container">
        <form onSubmit={SubmitHandler}>
          <h1 className="title">Login</h1>

          <div className="mb-3">
            <input
              placeholder="Enter Your Email"
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={(e) => {
                ChangeValue(e);
              }}
              required
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Enter Your Password"
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={(e) => {
                ChangeValue(e);
              }}
              required
            />
            <br/>
            <div className="md-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Pasword
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layouts>
  );
};

export default Login;
