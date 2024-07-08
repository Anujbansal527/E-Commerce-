import axios from "axios";
import  { createContext, useContext, useEffect, useState } from "react";

 const SearchContext = createContext();

 const SearchProvider = ({ children }) =>{

 const [value,setValue] = useState({
    keyword:"",
    result: [],
 });


 return(
     <SearchContext.Provider value={
        [ value,setValue ]
        }>  
        {children}
     </SearchContext.Provider>
 )
 }

 //coustom hook

 const useSearch = () => {
    return(useContext(SearchContext))
 }

 export {useSearch,SearchProvider}