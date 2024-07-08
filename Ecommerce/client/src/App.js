import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage";
import AboutPAge from "./Pages/AboutPAge";
import ContactPAge from "./Pages/ContactPAge";
import PolicyPAge from "./Pages/PolicyPAge";
import ErrorPAge from "./Pages/ErrorPAge";
import Login from "./Pages/Auth/Login";
import Singup from "./Pages/Auth/Singup";
import Dashboard from "./Pages/User/Dashboard";
import PrivateRoute from "./Components/Routes/Private";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminRoute from "./Components/Routes/Admin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import User from "./Pages/Admin/User";
import Orders from "./Pages/User/Orders";
import Profile from "./Pages/User/Profile";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
import Categories from "./Pages/Categories";
import CategoriesPro from "./Pages/CategoriesPro";
import CartPAge from "./Pages/CartPAge";
import AdminOrders from "./Pages/Admin/AdminOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/product/:slug" element={<ProductDetails/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/category/:slug" element={<CategoriesPro/>}/>
        <Route path="/cart" element={<CartPAge/>}/>
     
        {/* private route*/}
        <Route path="/dashboard" element={<PrivateRoute/>}>
            <Route path="user" element={<Dashboard/>}/>
            <Route path="user/orders" element={<Orders/>}/>
            <Route path="user/profile" element={<Profile/>}/>
        </Route>
     
        {/* Admin routes */}
        <Route path="/dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>}/>
            <Route path="admin/create-category" element={<CreateCategory/>}/>
            <Route path="admin/create-product" element={<CreateProduct/>}/>
            <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
            <Route path="admin/products" element={<Products/>}/>
            <Route path="admin/users" element={<User/>}/>
            <Route path="admin/orders" element={<AdminOrders/>}/>
        </Route>

        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Singup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/register" element={<Singup/>}/>
        <Route path="/about" element={<AboutPAge/>}/>
        <Route path="/contact" element={<ContactPAge/>}/>
        <Route path="/policy" element={<PolicyPAge/>}/>
        <Route path="*" element={<ErrorPAge/>}/>
      </Routes>
    </>
  );
}

export default App;
