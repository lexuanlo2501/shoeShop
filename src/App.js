import './App.css';
import DefaultLayout_Admin from './components/Layout/DefaultLayout_Admin';
import AddProducts from './page/AddProducts';
import ModifyProducts from './page/ModifyProducts';
import Home from './page/Home';


import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Confirming from './page/Confirming';
import ProductList from './page/ProductList';
import DetailProduct from './page/DetailProduct';

import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import DefaultLayout from './components/Layout/DefaultLayout';
import HeaderOnly from './components/Layout/HeaderOnly';
import Orders from './page/Orders';


function App() {

  const [products, setProducts] = useState([])
  const [numberOfPage, setNumberOfPage] = useState([])
  const [Page_, setPage_] = useState(0)

  const [type, setType] = useState([])

  const [productBrand_page, setProductBrand_page] = useState([])

  
  let itemOnePage = 15


  // make array have form [1,2,3,...]
  const arrPage = (m) => {
    let arr = []
    let page = m/itemOnePage
    if(page < parseInt(page)+0.5) {page += 0.5}
    let n = Number(page.toFixed(0))
    setPage_(n)
    for(let i = 1; i <=n; i++) {
      arr.push(i)
    }
    return arr
  }

  useEffect(() => {

    const handle = async () => {
      // get id brand
      let res_1 = await axios.get('http://localhost:4000/products')
      setType(res_1.data)

      // get all product 
      let res_2 = await axios.get('http://localhost:4000/data')
      setProducts(res_2.data)
      setNumberOfPage(arrPage(res_2.data.length))

      const numberPage_brand = res_1.data.map((item, index) => {
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


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='admin'
            element={
              <DefaultLayout_Admin><Home /> </DefaultLayout_Admin>
            }
          />
          <Route
            path='admin/addProducts'
            element={<DefaultLayout_Admin> <AddProducts /> </DefaultLayout_Admin>}
          />
          <Route
            path='admin/modifyProducts'
            element={<DefaultLayout_Admin> <ModifyProducts /> </DefaultLayout_Admin>}
          />
          <Route
            path='admin/comfirming'
            element={<DefaultLayout_Admin> <Confirming /> </DefaultLayout_Admin>}
          />



          {
            products.map((item, index) => {
              let route_name = `detail_product_${item.id}`

              return <Route key={index}
                path={route_name}
                element={<HeaderOnly> <DetailProduct product={item} /> </HeaderOnly>}
              />
            })
          }

          <Route
            path='order'
            element={<HeaderOnly> <Orders/> </HeaderOnly>}
          />


          {/* /////// */}

          <Route
            path='test'
            element={<DefaultLayout><div>lxnu</div></DefaultLayout>}
          />

          {/* // filter product into brand */}
          {
            productBrand_page.map((item, index) => {

              return item.quantity_product.map((item1, index1) => {
                let route = `productList/${item.brand}/page${item1}`
              
                return <Route
                  key={index1}
                  path={route}
                  element={<DefaultLayout><ProductList page={item1} limit={itemOnePage} numberOfPage={item.quantity_product} brand={item.brand}/></DefaultLayout>}
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
