import React, { useEffect, useState } from "react";
import Layouts from "../../Components/Layouts/Layouts";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../Components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState(null);

  const [updateName, setUpdateName] = useState("");

  const [name, setName] = useState("");

  const submitHandel = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/category/create-category`,
        {
          name,
        }
      );

      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong In Input Form");
    }
  };

  //get category
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
      toast.error("Something Went Wrong WHile fetching Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update categorie
  const updateHandel = async (e) => {
    e.preventDefault();
    const id = selected._id
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/v1/category/update-category/${id}`,
        { name: updateName }
      );

      if (data.success) {
        toast.success(`${updateName} is updated`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong WHile fetching Category");
    }
  };

  //delete
  const deleteHandel = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/category/delete-category/${id}`,
      );

      if (data.success) {
        toast.success(`Category is Deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong WHile fetching Category");
    }
  };

  return (
    <Layouts title={"Admin-Category"}>
      <div className="container-fluid  m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                submitHandel={submitHandel}
                setValue={setName}
                value={name}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((data) => (
                    <>
                      <tr>
                        <td key={data._id}>{data.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(data.name);
                              setSelected(data)
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2"
                          onClick={()=>{deleteHandel(data._id)}}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => 
              setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updateName}
                setValue={setUpdateName}
                submitHandel={updateHandel}
              ></CategoryForm>
            </Modal>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CreateCategory;
