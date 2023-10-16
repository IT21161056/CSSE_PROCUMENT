import React from 'react'
import { Routes, Route } from 'react-router-dom';
import SupplierList from '../pages/SupplierList';
import ProductDetails from '../pages/ProductDetails';
import UpdateSupplier from '../pages/UpdateSupplier';
import SupplierReg from '../pages/SupplierReg';
import ReportList from '../pages/ReportList';
import Requests from '../pages/Requests';
import Recommends from '../pages/Recommends';
import RecommendList from '../pages/RecommendList';
import UpdateRecommends from '../pages/UpdateRecommends';
import DashBoard from '../pages/DashBoard';

const RouteFile = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/dashboard/allSuppliers" element={<SupplierList/>}/>
        <Route path='/dashboard/updateSupplier/:id' element={<UpdateSupplier/>}/>
        <Route path='/dashboard/addSupplier' element={<SupplierReg/>}/>
        <Route path="/product" element={<ProductDetails/>}/>


        <Route path="/reportlist" element={<ReportList />}></Route>
        <Route path="/requestlists" element={<Requests />}></Route>
        <Route path="/recommends" element={<Recommends />}></Route>
        <Route path="/recommendlist" element={<RecommendList/>}></Route>
        <Route path="/updaterecommendst" element={<UpdateRecommends/>}></Route>
    </Routes>
  )
}

export default RouteFile