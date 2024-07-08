import React, { useState } from "react";
import axios from "axios";
import Layouts from "../../Components/Layouts/Layouts";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Styles/AuthStyle.css";
import { useAuth } from "../../Context/auth";

const ForgotPassword = () => {
    
    const [user, setUser] = useState({
        email: "",
        ans:"",
        newPassword: "",
      });

  const navigate = useNavigate();

  const ChangeValue = (e) => {

    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/auth/forgot-password`,
        user
      );

      if (res && res.data.sucess) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layouts>
         <div className="form-container">
        <form onSubmit={SubmitHandler}>
          <h1 className="title">Reset Password</h1>

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
              placeholder="Your Favroite Person ?"
              type="text"
              className="form-control"
              id="ans"
              name="ans"
              onChange={(e) => {
                ChangeValue(e);
              }}
              required
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Enter Your New Password"
              type="password"
              className="form-control"
              id="password"
              name="newPassword"
              onChange={(e) => {
                ChangeValue(e);
              }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
          Forgot Pasword
          </button>
        </form>
      </div>
    </Layouts>
  )
}

export default ForgotPassword