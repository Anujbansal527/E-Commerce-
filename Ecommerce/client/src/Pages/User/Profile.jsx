import React, { useEffect, useState } from 'react'
import Layouts from '../../Components/Layouts/Layouts'
import UserMenu from '../../Components/Layouts/UserMenu'
import { useAuth } from '../../Context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
    
    const [auth,setAuth] = useAuth();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
    

      //get user data
      useEffect(()=>{
        const {email,name,phone,password,address} = auth.user;

        setUser({...user,name,email,phone,address});
      },[auth.user])

      const ChangeValue = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
    
      const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
          const {data} = await axios.put(
            `http://localhost:8000/api/v1/auth/profile`,
            user
          );
 
          if(data?.error){
            toast.error(data.error)
          }
          else{
            setAuth({...auth,user:data?.updateUser})
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls)
            ls.user = data.updateUser
            localStorage.setItem("auth",JSON.stringify(ls))
            toast.success(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong!");
        }
      };

  return (
    <Layouts title={"User-Profile"}>
        <div className='container-fluid p-3 m-3 '>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                    <h3>Profile</h3>
                    <div className="form-container">

        <form onSubmit={SubmitHandler}>
        <h1 className="title">User Profile</h1>

          <div className="mb-3">
            <input
              placeholder="Enter Your Name"
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              onChange={(e) => {
                ChangeValue(e);
              }}
              
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Enter Your Email"
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => {
                ChangeValue(e);
              }}
              
              disabled
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Enter Your Password"
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => {
                ChangeValue(e);
              }}
              
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Enter Your Phone Number"
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={(e) => {
                ChangeValue(e);
              }}
              
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Enter Your Address"
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={user.address}
              onChange={(e) => {
                ChangeValue(e);
              }}
              
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
                </div>
            </div>
        </div>
    </Layouts>
  )
}

export default Profile