import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { Link } from "react-router-dom";


import classNames from 'classnames/bind';
import styles from './Carousel.module.scss'

const cx = classNames.bind(styles)


const Carousel = ({brand, setTrigger, nameProd}) => {
  const [products, setProducts] = useState([])
  
  const handleDragStart = (e) => e.preventDefault();
  
  const responsive = {
      0: { items: 2 },
      568: { items: 3 },
      1024: { items: 4 },
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL+`/shoes?_limit=10&_page=1&_brand=${brand}&_string=${nameProd||""}`)
    .then(res => {
        setProducts(res.data)
    })
  }, [])
  
  const items = products.map((item, index) =>
    <Link 
      // to={`shoes/detail_product?_id=${item.id}`}
      to={`/shoes/detail_product?_id=${item.id}`}

      onClick={() => {
        setTrigger(pre => !pre)
        window.scrollTo(0, 0)
      }}
      replace
    >
      <img
        key={index}
        className={cx(['img_product', item.BC_color])}
        onDragStart={handleDragStart} 
        role="presentation"
        // src={require(`../../imgData/${item.img}`)}
        src={process.env.REACT_APP_BACKEND_URL+`/imgs/${item.img}`}
      />
    </Link>
  )

  return (
    <AliceCarousel 
        disableDotsControls='false' 
        infinite 
        mouseTracking 
        items={items} 
        // controlsStrategy="default" 
        responsive={responsive}
    />
  );
}

export default Carousel;