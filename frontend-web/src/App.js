import React from 'react'
import { BrowserRouter} from "react-router-dom";
import Layout from './layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
        <Layout/>
        <ToastContainer />
    </BrowserRouter>
  )
}

export default App