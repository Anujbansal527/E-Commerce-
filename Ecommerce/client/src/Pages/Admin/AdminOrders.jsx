import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layouts from "../../Components/Layouts/Layouts";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import moment from "moment";
import { Select } from "antd";
const {Option} = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);

  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const changeHandel = async (id,value) =>{
    try {
        const {data} = await axios.put(`http://localhost:8000/api/v1/auth/order-status/${id}`,
        {status:value})
        getOrders();
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Layouts>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>

        <div className="col-md-9">
          <h1 className="text-center"> All Orders </h1>
          {orders?.map((data, index) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{
                        <Select variant={false} onChange={(value) => changeHandel(data._id,value)} defaultValue={data?.status}>
                            {status.map((sta,index) => (
                                
                              <Option key={index} value={sta}>
                                {sta}
                            </Option>
                            ))}
                        </Select>
                      }</td>
                      <td>{data?.buyers?.name}</td>
                      <td>{moment(data?.createAt).fromNow()}</td>
                      <td>{data?.payment.success ? "Success" : "Falied"}</td>
                      <td>{data?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="container">
                  {data?.products.map((data, index) => (
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layouts>
  );
};

export default AdminOrders;
