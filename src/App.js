import './App.css';
import DefaultLayout_Admin from './components/Layout/DefaultLayout_Admin';
import AddProducts from './page/AddProducts';
import ModifyProducts from './page/ModifyProducts';
import Home from './page/Home';


import {BrowserRouter as Router, Routes, Route, Navigate, json } from 'react-router-dom';

import Confirming from './page/Confirming';
import ProductList from './page/ProductList';
import ProductList_v2 from './page/ProductList_v2';

import DetailProduct from './page/DetailProduct';
import DetailProduct_v2 from './page/DetailProduct_v2';


import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import DefaultLayout from './components/Layout/DefaultLayout';
import HeaderOnly from './components/Layout/HeaderOnly';
import Orders from './page/Orders';
import SignInSignUp from './components/Layout/SignInSignUp/SignInSignUp';
import SignIn from './components/Layout/SignInSignUp/SignIn';
import SignUp from './components/Layout/SignInSignUp/SignUp';
import OverView from './page/OverView';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InforUser from './page/InforUser';
import PurchaseOrder from './page/PurchaseOrder';
import LayoutUserInfor from './components/LayoutUserInfor';
import History from './page/History';
import ListAccount from './page/ListAccount';
import ProductList_v3 from './page/ProductList_v3';


function App() {

  // handle login
  const [login, setLogin] = useState("")
  useEffect(() => {
    const token = localStorage.getItem("tokens");
    if(!token) {
      localStorage.setItem("tokens", JSON.stringify({}));
      
    }
    console.log( (JSON.parse(token)) )

    setLogin(JSON.parse(token).role)
    console.log(login)
  }, [login])




  // update CDIO 3 *********************************************************************************************
  const [brand_v2, setBrand_v2] = useState("")

  
  // previous version above
  

  // end update ********************************************************************************************************



  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          {
            login === "admin" &&
            <Route
              path='admin'
              element={
                <DefaultLayout_Admin><OverView /> </DefaultLayout_Admin>
              }
            />
          }
          {
            login === "admin" &&
            <Route
              path='admin/addProducts'
              element={<DefaultLayout_Admin> <AddProducts /> </DefaultLayout_Admin>}
            />
          }
          {
            login === "admin" &&
            <Route
              path='admin/modifyProducts'
              element={<DefaultLayout_Admin> <ModifyProducts /> </DefaultLayout_Admin>}
            />
          }
          {
            login === "admin" &&
            <Route
              path='admin/comfirming'
              element={<DefaultLayout_Admin> <Confirming /> </DefaultLayout_Admin>}
            />
          }
          {
            login === "admin" &&
            <Route
              path='admin/history'
              element={<DefaultLayout_Admin> <History /> </DefaultLayout_Admin>}
            />
          }
          {
            login === "admin" &&
            <Route
              path='admin/accounts'
              element={<DefaultLayout_Admin> <ListAccount /> </DefaultLayout_Admin>}
            />
          }
          


          <Route
            path="signIn"
            element={<SignInSignUp><SignIn setLogin={setLogin}/></SignInSignUp>}
          />
          <Route
            path="signUp"
            element={<SignInSignUp><SignUp/></SignInSignUp>}
          />

          <Route
            path="home"
            element={<HeaderOnly> <Home></Home> </HeaderOnly>}
          />

         

          {
             Boolean(login) &&
            <Route
              path="infor"
              element={<DefaultLayout> <LayoutUserInfor><InforUser/></LayoutUserInfor>  </DefaultLayout>}
            />
          }

          {
            login === "client" &&
              <Route
                path="PurchaseOrder"
                element={<DefaultLayout> <LayoutUserInfor><PurchaseOrder/></LayoutUserInfor> </DefaultLayout>}
              />
          }
          
            {/* DETAIL PRODUCT */}
          { 
            <Route
              path='order'
              element={ <HeaderOnly> <Orders/> </HeaderOnly>}
            />
          }


          <Route
            path="shoes/detail_product"
            element={<HeaderOnly> <DetailProduct_v2/> </HeaderOnly>}

          />

          <Route
            path="shoes"
            element={<DefaultLayout setBrand_v2={setBrand_v2}><ProductList_v3 brand_v2={brand_v2}  /></DefaultLayout>}

          />


          

            
          

        </Routes>

      </Router>
      
     
    </div>
  );
}

export default App;
