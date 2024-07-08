import axios from "axios";
import  { createContext, useContext, useEffect, useState } from "react";

 const AuthContext = createContext();


 const AuthProvider = ({ children }) =>{

 const [auth,setAuth] = useState({
    user:null,token:''
 });


 //derfault axios
                                                //if auth present then set token
 axios.defaults.headers.common["Authorization"] = auth?.token;

 useEffect(()=>{
    //getting data from local storage stored at localy
    const data = localStorage.getItem('auth')
    if(data){
        const parseData = JSON.parse(data)
        setAuth({
            ...auth,
            user : parseData.user,
            token: parseData.token
        }); 
    }
    //eslint-disable-next-line
 },[])

 return(
     <AuthContext.Provider value={
        [ auth ,setAuth ]
        }>  
        {children}
     </AuthContext.Provider>
 )
 }

 //coustom hook

 const useAuth = () => {
    return(useContext(AuthContext))
 }

 export {useAuth,AuthProvider}