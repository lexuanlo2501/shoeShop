import './App.css';
import DefaultLayout_Admin from './components/Layout/DefaultLayout_Admin';
import AddProducts from './page/AddProducts';
import ModifyProducts from './page/ModifyProducts';
import Home from './page/Home';


import {HashRouter as Router, Routes, Route } from 'react-router-dom';

import Confirming from './page/Confirming';

import DetailProduct_v2 from './page/DetailProduct_v2';


import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import DefaultLayout from './components/Layout/DefaultLayout';
import HeaderOnly from './components/Layout/HeaderOnly';
import Orders from './page/Orders';
import SignInSignUp from './components/Layout/SignInSignUp/SignInSignUp';
import SignIn from './components/Layout/SignInSignUp/SignIn';
import SignUp from './components/Layout/SignInSignUp/SignUp';
import ForgotPassword from './components/Layout/SignInSignUp/ForgotPassword';

import OverView from './page/OverView';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InforUser from './page/InforUser';
import PurchaseOrder from './page/PurchaseOrder';
import LayoutUserInfor from './components/LayoutUserInfor';
import History from './page/History';
import ListAccount from './page/ListAccount';
import ProductList_v3 from './page/ProductList_v3';
import SuccessPay from './page/SuccessPay';


function App() {
  const token =  JSON.parse(localStorage.getItem("tokens"));
  const cart = JSON.parse(localStorage.getItem("cart"))
  if(!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  
  // handle login
  const [login, setLogin] = useState("")
  useEffect(() => {
    if(!token) {
      localStorage.setItem("tokens", JSON.stringify({}));
      
    }
    // console.log( token )

    setLogin(token?.role)
  }, [login])




  // update CDIO 3 *********************************************************************************************
  const [brand_v2, setBrand_v2] = useState("")
  const [re_render, setRe_render] = useState(false)


  
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
            path="forgotPassword"
            element={<SignInSignUp><ForgotPassword/></SignInSignUp>}
          />
          

          <Route
            path={"home"}
            element={<HeaderOnly> <Home></Home> </HeaderOnly>}
          />
          <Route
            path={""}
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
                element={<DefaultLayout> <LayoutUserInfor><PurchaseOrder userID={token?.accName} /></LayoutUserInfor> </DefaultLayout>}
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
            element={<DefaultLayout setBrand_v2={setBrand_v2} setRe_render={setRe_render}><ProductList_v3 re_render={re_render} /></DefaultLayout>}

          />

         

          <Route
            path="successPay"
            DefaultLayout
            element={<DefaultLayout><SuccessPay/></DefaultLayout>}

          />

          

            
          

        </Routes>

      </Router>
      
     
    </div>
  );
}

export default App;
