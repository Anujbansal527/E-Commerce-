import React from "react";
import Layouts from "../../Components/Layouts/Layouts";
import AdminMenu from "../../Components/Layouts/AdminMenu";

const User = () => {
  return (
    <Layouts title={"Admin-Users"}>
      <div className="container-fluid  m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Users</h1>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default User;
