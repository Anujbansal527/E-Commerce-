import React, { useEffect, useState } from "react";
import Layouts from "../Components/Layouts/Layouts";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoriesPro = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  const params = useParams();


  useEffect(() => {
    if (params?.slug) getProducts();
  }, [params?.slug]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/categories-products/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layouts>
      <div className="container">
        <h1 className="text-center">Category - {category[0]?.name}</h1>
        <h3 className="text-center">
          {products?.length < 1
            ? products?.length + " Product Found"
            : products?.length + " Product Found"}
        </h3>

        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((data) => (
                <>
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:8000/api/v1/product/product-photo/${data._id}`}
                      className="card-img-top"
                      alt={data.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{data.name}</h5>
                      <p className="card-text">
                        {data.description.substring(0, 40)}...
                      </p>
                      <p className="card-text">Rs.{data.price}</p>
                      <button
                        className="btn btn-primary ms-1"
                        onClick={() => {
                          navigate(`/product/${data.slug}`);
                        }}
                      >
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
           
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CategoriesPro;
