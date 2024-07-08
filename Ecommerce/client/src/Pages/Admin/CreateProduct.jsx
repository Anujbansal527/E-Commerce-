import React, { useEffect, useState } from "react";
import Layouts from "../../Components/Layouts/Layouts";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong While fetching Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  //create product
  const createHandel = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()

      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      productData.append("photo",photo);
      productData.append("category",category);

      const {data} = await axios.post(`http://localhost:8000/api/v1/product/create-product`,
      productData
      )

      if(data?.success){
        toast.success(" Successfully Product Created");
        navigate('/dashboard/admin/products');
      }
      else{
        toast.error(data?.message);
      }

    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong While Creating Product");
    }
  }

  return (
    <Layouts title={"Admin-Products"}>
      <div className="container-fluid  m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Products</h1>

            <div className="m-1 w-75">

              <Select
                variant={false}
                placeholder="Select A Category"
                showSearch
                className="form-select mb-3 "
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {
                  categories?.map((data) => (
                  <Option key={data._id} value={data._id}>
                    {data.name}
                  </Option>
                ))
                }
              </Select>
             
              <div className="mb-3">
                <input type="text" value={name} placeholder="Enter Product Name" className="form-control"  onChange={(e)=>setName(e.target.value)}/>
              </div>
             
              <div className="mb-3">
                <textarea type="textarea" value={description} placeholder="Enter Product Description" className="form-control"  onChange={(e)=>setDescription(e.target.value)}/>
              </div>

              <div className="mb-3">
                <input type="number" value={price} placeholder="Enter Product Price" className="form-control"  onChange={(e)=>setPrice(e.target.value)}/>
              </div>
             
              <div className="mb-3">
                <input type="number" value={quantity} placeholder="Write Product Quantity" className="form-control"  onChange={(e)=>setQuantity(e.target.value)}/>
              </div>

              <div className="mb-3">
                  <label  className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload  Images" } 
                  <input type="file" name="photo" accept="image/*" onChange={(e)=> setPhoto(e.target.files[0])} hidden />
                  </label>
              </div>

              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img src={URL.createObjectURL(new Blob([photo]))} height={"200px"}  alt="image" className="img img-responsive"/>
                  </div>
                )}
              </div>
              
              <div className="mb-3">
                <Select variant={false} size="large" slowSearch  placeholder="Select Product Shipping" className="form-control mb-3"  onChange={(value)=>setShipping(value)}>
                <Option value="0" >No</Option>
                <Option value="1" >Yes</Option>
                </Select>
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={createHandel}>Create Product</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CreateProduct;
