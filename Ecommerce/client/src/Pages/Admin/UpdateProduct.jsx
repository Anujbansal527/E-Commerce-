import React, { useEffect, useState } from "react";
import Layouts from "../../Components/Layouts/Layouts";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();

  const params = useParams();

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/single-product/${params.slug}`
      );
      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

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

  //update product
  const updateHandel = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      photo && productData.append("photo",photo)
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `http://localhost:8000/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success(" Successfully Product Updated");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong While Creating Product");
    }
  };

  const deleteHandel =async () => {
    try {
        let answer = window.confirm("Are You Sure You Want To Delete This Product")
        if(!answer){ return; }
        const {data} = await axios.delete(`http://localhost:8000/api/v1/product/delete-product/${id}`)
        toast.success("Product Deleted Successfully")
        navigate("/dashboard/admin/products");
    } catch (error) {
        console.log(error)
        toast.error("Something Went Wrong")
    }
  }

  return (
    <Layouts>
      <div className="container-fluid  m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>

            <div className="m-1 w-75">
              <Select
                variant={false}
                placeholder="Select A Category"
                showSearch
                className="form-select mb-3 "
                value={category}
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((data) => (
                  <Option key={data._id} value={data._id}>
                    {data.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Product Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="textarea"
                  value={description}
                  placeholder="Enter Product Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Product Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write Product Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload  Images"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(new Blob([photo]))}
                      height={"200px"}
                      alt="image"
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                    <div className="text-center">
                    <img
                      src={`http://localhost:8000/api/v1/product/product-photo/${id}`}
                      height={"200px"}
                      alt="image"
                      className="img img-responsive"
                    />
                  </div>
                )
                }
              </div>

              <div className="mb-3">
                <Select
                  variant={false}
                  size="large"
                  slowSearch
                  placeholder="Select Product Shipping"
                  className="form-control mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={updateHandel}>
                  Update Product
                </button>
              </div>
              
              <div className="mb-3">
                <button className="btn btn-danger" onClick={deleteHandel}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default UpdateProduct;
