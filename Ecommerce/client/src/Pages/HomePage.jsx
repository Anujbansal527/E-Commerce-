import React, { useEffect, useState } from "react";
import Layouts from "../Components/Layouts/Layouts";
import { useAuth } from "../Context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //getting total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {}
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProduct([...product, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //get categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getting filter products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/product/product-filter`,
        {
          checked,
          radio,
        }
      );

      setProduct(data?.products);
      console.log(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get allproducts
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/get-product`
      );
      setLoading(false);
      setProduct(data.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //filter categories
  const filterHandel = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.lenght || !radio.length) {
      getAllProducts();
    }
  }, [checked.lenght, radio.length]);

  useEffect(() => {
    if (checked.lenght || radio.length) {
      filterProducts();
    }
  }, [checked, radio]);

  return (
    <Layouts title={"All Products"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((data) => (
              <Checkbox
                key={data._id}
                onClick={(e) => filterHandel(e.target.checked, data._id)}
              >
                {data.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((data) => (
                <div key={data._id}>
                  <Radio value={data.array}>{data.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap">
            {product?.map((data) => (
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
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, data]);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        //storing data localy to avide data  loss on refresh or close of browser
                        toast.success("Added To Cart");
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="m-2 p-3 ">
            {product && product.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default HomePage;
