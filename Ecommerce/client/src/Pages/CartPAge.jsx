import React, { useEffect, useState } from "react";
import Layouts from "../Components/Layouts/Layouts";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPAge = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const [clientToken, setClientToken] = useState("");

  //instance from api of payment gateway
  const [instance, setInstance] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  //remove cart item
  const removeItem = async (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);

      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getTooken = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/braintreepayment/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTooken();
  }, [auth?.token]);

  //payment handel
  const paymentHandel = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/product/braintreepayment/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layouts>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>

            <h4 className="text-center">
              {cart?.length > 0
                ? `You Have ${cart?.length} Items In Your Cart 
                        ${auth?.token ? "" : "Please Login To CheckOut"} `
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-6">
            {cart?.map((data) => (
              <div className="row  mb-2  card flex-row" key={data._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8000/api/v1/product/product-photo/${data._id}`}
                    className="card-img-top mt-1 card"
                    alt={data.name}
                    width={"100px"}
                    height={"100px"}
                  />
                </div>

                <div className="col-md-8">
                  <h4>{data.name}</h4>
                  <p>{data.description.substring(0, 30)}</p>
                  <p>Rs. {data.price}</p>
                  <button
                    className="btn btn-danger mb-1"
                    onClick={() => removeItem(data._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <hr />
            <h3>Total : Rs. {totalPrice()}.00 </h3>

            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address :</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/login")}
                      >
                        Please Login
                      </button>
                    </>
                  )}
                </div>
              </>
            )}

            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                " "
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => {
                      setInstance(instance);
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={paymentHandel}
                    disabled={!instance || loading || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment "}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CartPAge;
