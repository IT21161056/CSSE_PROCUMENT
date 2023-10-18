import React from "react";
import { Routes, Route } from "react-router-dom";
import SupplierList from "../pages/SupplierList";
import UpdateSupplier from "../pages/UpdateSupplier";
import ReportList from "../pages/ReportList";
import Requests from "../pages/Requests";
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

      <Route path="/dashboard/reportlist" element={<ReportList />}></Route>
      <Route path="/requestlists/:id" element={<Requests />}></Route>
    </Routes>
  );
};

export default RouteFile;
