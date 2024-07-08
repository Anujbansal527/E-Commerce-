import React, { useState } from "react";

const CategoryForm = ({submitHandel,setValue,value}) => {


    

  return (
    <>
      <form onSubmit={submitHandel}>
        <div className="mb-3">
        <input
              placeholder="Enter New Category"
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }}
              required
            />
        </div>
     
       
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
