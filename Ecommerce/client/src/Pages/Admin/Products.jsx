import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layouts from "../../Components/Layouts/Layouts";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/get-product`
      );
      setProduct(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layouts>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Product List</h1>

          <div className="d-flex flex-wrap">
            {product?.map((data) => (
              <>
                <Link
                  key={data._id}
                  to={`/dashboard/admin/product/${data.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:8000/api/v1/product/product-photo/${data._id}`}
                      className="card-img-top"
                      alt={data.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{data.name}</h5>
                      <p className="card-text">{data.description}</p>
                     
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Products;
