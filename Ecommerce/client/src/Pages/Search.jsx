import React from 'react'
import Layouts from '../Components/Layouts/Layouts'
import { useSearch } from '../Context/Search'

const Search = () => {
  
    const [value,setValue] = useSearch()
   
    return (
    <Layouts title={"Search Results"}>
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                <h6>{value?.result.length < 1 ? "No Product Is Found" : `Found ${value?.result.length}`}</h6>

                <div className='d-flex flex-wrap mt-4'>
            
            {value?.result.map((data) => (
              <>
              
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:8000/api/v1/product/product-photo/${data._id}`}
                      className="card-img-top"
                      alt={data.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{data.name}</h5>
                      <p className="card-text">{data.description.substring(0,40)}...</p>
                      <p className="card-text">Rs.{data.price}</p>
                      <button className="btn btn-primary ms-1">More Details</button>
                      <button className="btn btn-secondary ms-1">Add To Cart</button>
                    </div>
                  </div>
              
              </>
            ))}
          
            </div>

            </div>
        </div>
    </Layouts>
  )
}

export default Search