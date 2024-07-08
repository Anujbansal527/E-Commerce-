import React from 'react'
import Headers from './Headers'
import Footer from './Footer'
import { Helmet } from "react-helmet"
import { Toaster } from "react-hot-toast"; 

const Layouts = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"/>
          <meta name='description' content={description}/>
          <meta name='keyword' content={keywords} />
          <meta name='author' content={author}/>
          <title>{title}</title>
      </Helmet>
      <Headers/>
      <main style={{minHeight:"68vh"}}>
      <Toaster/>
      {children}
      </main> 
      <Footer/>
    </div>
  )
}

//passing default properties
Layouts.defaultProps ={
  title:"Ecommerce App",
  description: "This is an ecommerce app developed using MERN stack.",
  keywords: "ecommerce, shopping cart, nodejs, express, react, mongoose",
  author: "Anuj Bansal"
}

export default Layouts
