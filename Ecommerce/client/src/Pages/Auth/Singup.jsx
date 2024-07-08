import React, { useState } from "react";
import axios from "axios";
import Layouts from "../../Components/Layouts/Layouts";
import toast, {  } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../Styles/AuthStyle.css"

const Singup = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    ans:"",
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
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        user
      );

      if(res && res.data.sucess){

        toast.success(res.data && res.data.message)
        navigate("/login")
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layouts title={"Registration Page"}>
      <div className="form-container">

        <form onSubmit={SubmitHandler}>
        <h1 className="title">Register</h1>

          <div className="mb-3">
            <input
              placeholder="Enter Your Name"
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={(e) => {
                ChangeValue(e);
              }}
              required
            />
          </div>

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
          </div>

          <div className="mb-3">
            <input
              placeholder="Enter Your Phone Number"
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              onChange={(e) => {
                ChangeValue(e);
              }}
              required
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Enter Your Address"
              type="text"
              className="form-control"
              id="address"
              name="address"
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

          <button type="submit" className="btn btn-primary">
            Singup
          </button>
        </form>
      </div>
    </Layouts>
  );
};

export default Singup;
