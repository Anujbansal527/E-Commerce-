import React from 'react'
import Layouts from '../Components/Layouts/Layouts'
import { Link } from 'react-router-dom'

const ErrorPAge = () => {
  return (
    <Layouts title={"Error Page"}>
        <div className='error'>
          <h1 className='error-title'>404</h1>
          <h2 className='error-heading'>OOPS ! Page Not Found </h2>
          <Link to="/" className='error-btn'>Go Back</Link>
        </div>     
    </Layouts>
  )
}

export default ErrorPAge
 