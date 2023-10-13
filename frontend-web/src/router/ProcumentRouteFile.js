import React from 'react'
import { Routes, Route } from 'react-router-dom';
import SupplierList from '../pages/SupplierList';
import ProductDetails from '../pages/ProductDetails';
import UpdateSupplier from '../pages/UpdateSupplier';
import AddSupplier from '../pages/AddSupplier';
import DashBoard from '../pages/DashBoard';

const RouteFile = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/dashboard/allSuppliers" element={<SupplierList/>}/>
        <Route path='/dashboard/updateSupplier/:id' element={<UpdateSupplier/>}/>
        <Route path='/dashboard/addSupplier' element={<AddSupplier/>}/>
        <Route path="/product" element={<ProductDetails/>}/>
    </Routes>
  )
}

export default RouteFile