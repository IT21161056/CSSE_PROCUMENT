import React from "react";
import { Routes, Route } from "react-router-dom";
import SupplierList from "../pages/SupplierList";
import UpdateSupplier from "../pages/UpdateSupplier";
import ReportList from "../pages/ReportList";
import Requests from "../pages/Requests";
import Recommends from "../pages/Recommends";
import RecommendList from "../pages/RecommendList";
import UpdateRecommends from "../pages/UpdateRecommends";
import DashBoard from "../pages/DashBoard";
import AddSupplier from "../pages/AddSupplier";
import Login from "../pages/Login";

const RouteFile = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/dashboard/allSuppliers" element={<SupplierList />} />
      <Route
        path="/dashboard/updateSupplier/:id"
        element={<UpdateSupplier />}
      />
      <Route path="/dashboard/addSupplier" element={<AddSupplier />} />

      <Route path="/reportlist" element={<ReportList />}></Route>
      <Route path="/requestlists/:id" element={<Requests />}></Route>
      <Route path="/recommends" element={<Recommends />}></Route>
      <Route path="/recommendlist" element={<RecommendList />}></Route>
      <Route path="/updaterecommendst" element={<UpdateRecommends />}></Route>
    </Routes>
  );
};

export default RouteFile;
