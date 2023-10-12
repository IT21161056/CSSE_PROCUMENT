import React from 'react'
import { Routes, Route } from 'react-router-dom';
import SupplierList from '../pages/SupplierList';
import ProductDetails from '../pages/ProductDetails';
import UpdateSupplier from '../pages/UpdateSupplier';
import SupplierReg from '../pages/SupplierReg';

const RouteFile = () => {
  return (
    <Routes>
        <Route path="/" element={<SupplierList/>}/>
        <Route path='/updateSupplier' element={<UpdateSupplier/>}/>
        <Route path='/regSupplier' element={<SupplierReg/>}/>
        <Route path="/product" element={<ProductDetails/>}/>
    </Routes>
  )
}

export default RouteFile