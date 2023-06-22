import './App.css';
import DefaultLayout_Admin from './components/Layout/DefaultLayout_Admin';
import AddProducts from './page/AddProducts';
import ModifyProducts from './page/ModifyProducts';
import Home from './page/Home';


import {BrowserRouter as Router, Routes, Route, Navigate, json } from 'react-router-dom';

import Confirming from './page/Confirming';
import ProductList from './page/ProductList';
import DetailProduct from './page/DetailProduct';

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


function App() {
  const itemOnePage = 15


  const [products, setProducts] = useState([])
  const [numberOfPage, setNumberOfPage] = useState([])
  const [productBrand_page, setProductBrand_page] = useState([])


  // make array have form [1,2,3,...]
  const arrPage = (m) => {
    let arr = []
    let page = m/itemOnePage
    if(page < parseInt(page)+0.5) {page += 0.5}
    let n = Number(page.toFixed(0))
    for(let i = 1; i <=n; i++) {
      arr.push(i)
    }
    return arr
  }
  // const arrPage_v2 = (n) => {
  //   let arr = Array(n).fill(0).map((_, index) => index+1)
  //   return arr
  // }

  

  useEffect(() => {

    const handle = async () => {
      // get id brand
      let res_1 = await axios.get('http://localhost:4000/products')

      // get all product 
      let res_2 = await axios.get('http://localhost:4000/data')
      setProducts(res_2.data)
      setNumberOfPage(arrPage(res_2.data.length))

      const numberPage_brand = res_1.data.map(item => {
        return {
          "brand": item.id,
  
          // filter product of brand then create array number page
          "quantity_product": arrPage(res_2.data.filter(i => i.productId === item.id).length)
        }
      })
  
      setProductBrand_page(numberPage_brand)
      console.log(numberPage_brand)

    }
    handle()

  }, [])

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
             login === "client" &&
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
            products.map((item, index) => {
              let route_name = `detail_product_${item.id}`

              return <Route key={index}
                path={route_name}
                element={<HeaderOnly> <DetailProduct product={item} /> </HeaderOnly>}
              />
            })
          }

          { 
            <Route
              path='order'
              element={ <HeaderOnly> <Orders/> </HeaderOnly>}
            />
          }
         


          {/* /////// */}


          {/* // filter product into brand */}
          {
            productBrand_page.map((item, index) => {

              return item.quantity_product.map((item1, index1) => {
                let route = `productList/${item.brand}/page${item1}`
              
                return <Route
                  key={index1}
                  path={route}
                  element={<DefaultLayout setBrand_v2={setBrand_v2}><ProductList brand_v2={brand_v2} page={item1} limit={itemOnePage} numberOfPage={item.quantity_product} brand={item.brand}/></DefaultLayout>}
                />
              })

            })
          }


          {/* page all products */}
          {
            numberOfPage.map((item, index) => {
              let route = `productList/page${item}`
              
              return <Route
                key={index}
                path={route}
                element={<DefaultLayout><ProductList page={item} limit={itemOnePage} numberOfPage={numberOfPage}/></DefaultLayout>}
              />
            })
          }

            
          

        </Routes>

      </Router>
      
     
    </div>
  );
}

export default App;
