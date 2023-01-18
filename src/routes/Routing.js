import React,{useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from '../DashboardComponent/header'
import LoginPage from "../components/Login/login";
import PrivateRoutes from "./PrivateRoute";
import { AuthContext } from "../context/AuthContext";
import Home from "../DashboardComponent/home";
import Order from '../DashboardComponent/Order'
const Routing = () => {
    const {client,isAuthenticated}=useContext(AuthContext)

  return (
    <div>
        <Routes>
          //Private Routing
          <Route  element={<PrivateRoutes />}>
            <Route path="/dashboard/home" element={<Home />} /> 
            <Route path="/dashboard/order" element={<Order />} />
          </Route> 
          //other Routes
          <Route  path="/login" element={<LoginPage />} exact />
        </Routes>
    </div>
  );
};

export default Routing;
