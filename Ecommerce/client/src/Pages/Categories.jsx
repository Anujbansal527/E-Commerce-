import React from 'react'
import Layouts from '../Components/Layouts/Layouts'
import useCategory from '../Hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {

    const categories = useCategory();


  return (
    <Layouts title={"Categories Page"}>
        <h1 className='text-center'>All Categories</h1>
        <div className="container">
            <div className='row'>

            {categories?.map((data)=> (
                <div className='col-md-6 mt-5 mb-3 gx-1 gy-1' key={data._id}>
                    <Link to={`/category/${data.slug}`} className='btn btn-secondary'>{data.name}</Link>
                </div>
            ))}
                
            </div>
        </div>
    </Layouts>
  )
}

export default Categories