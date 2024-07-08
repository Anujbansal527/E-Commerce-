import React from 'react'
import {BiMailSend, BiPhoneCall} from "react-icons/bi"
import Layouts from '../Components/Layouts/Layouts'

const ContactPAge = () => {
  return (
    <Layouts title={"Contact Page"}>
          <div className='raw contactus'>
            <div className='col-md-6'>
              <img srv="" alt="" style={{width:"100%"}}/>
            </div>
            <div className='col-md-4'>
              <h1 className='bg-dark p-2 text-white text-center'>Contact Us</h1>
              <p className='text-justify mt-2'>
                Any Query And Info Product  Feel To Contact Any Time 24X7 
              </p>
              <p className='mt-3'>
                <BiMailSend/> : anujbansal527@gmail.com
              </p>
              <p className='mt-3'>
                <BiPhoneCall/> : +91 9399174123
              </p>
              
            </div>
          </div>
    </Layouts>
  )
}

export default ContactPAge
 