import React, { useEffect, useState } from "react";
import Layouts from "../Components/Layouts/Layouts";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {

  const [products, setProducts] = useState({});
  const [simProducts, setSimProducts] = useState([]);

  const params = useParams();

    const navigate = useNavigate();
  //get one project details
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/single-product/${params.slug}`
      );
      setProducts(data?.product);
      getSimilarProduct(data?.product._id,data?.product.category._id)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProducts();
  }, [params?.slug]);

  //get similar projects
  const  getSimilarProduct = async (pid,cid) => {
    try {
      const {data} = await axios.get(`http://localhost:8000/api/v1/product/similar-products/${pid}/${cid}`)
      setSimProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layouts title={""}>
      <div className="row container mt-2">

        <div className="col-md-6">
          <img
            src={`http://localhost:8000/api/v1/product/product-photo/${products._id}`}
            className="card-img-top"
            alt={products.name}
            height={"300"}
            width={"300"}
          />
        </div>

        <div className="col-md-6">
          <h1>Product Details</h1>
          <h4>Name: {products.name}</h4>
          <h6>Description: {products.description}</h6>
          <h6>Price: {products.price}</h6>
          <h5>Category: {products.category?.name}</h5>
          <p>Quantity: {products.quantity}</p>
          <button className="btn btn-secondary ms-1">Add To Cart</button>
        </div>  
      </div>

  <hr/>

      <div className="row container">
            <h1>Similar Products</h1>

            {simProducts.length< 1 && <p className="text-center">No Similar Products Found</p>}
            {simProducts?.map((data) => (
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
                      <button className="btn btn-primary ms-1" onClick={()=>{navigate(`/product/${data.slug}`)}}>More Details</button>
                      <button className="btn btn-secondary ms-1">Add To Cart</button>
                    </div>
                  </div>
              
              </>
            ))}
        
      </div>
    </Layouts>
  );
};

export default ProductDetails;
