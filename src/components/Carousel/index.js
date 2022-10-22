import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './Carousel.module.scss'

const cx = classNames.bind(styles)


const Carousel = ({brand}) => {
  const [products, setProducts] = useState([])

  const handleDragStart = (e) => e.preventDefault();
  
  const responsive = {
      0: { items: 1 },
      568: { items: 3 },
      1024: { items: 4 },
  };

  useEffect(() => {
    let route_ =  brand ? `products/${brand}/` : ''
        // http://localhost:4000/products/adidas/data?_page=1&_limit=2
        // axios.get(`http://localhost:4000/data?_page=${page}&_limit=${limit}`)
        axios.get(`http://localhost:4000/${route_}data?_page=1&_limit=8`)
        .then(res => {
            setProducts(res.data)
        })
  }, [])
  
  
  // const items = [
  //   <img className={cx('img_product')} src={require('../../imgData/shoe-removebg-preview.png')} onDragStart={handleDragStart} role="presentation" />,
  //   <img className={cx('img_product')} src={require('../../imgData/air-max-alpha-trainer-5-training-shoes-r0bxqt-removebg-preview.png')} onDragStart={handleDragStart} role="presentation" />,
  //   <img className={cx('img_product')} src={require('../../imgData/4896bd57f0894845b5c0ae8300eec549_9366-removebg-preview.png')} onDragStart={handleDragStart} role="presentation" />,
  //   <img className={cx('img_product')} src={require('../../imgData/4896bd57f0894845b5c0ae8300eec549_9366-removebg-preview.png')} onDragStart={handleDragStart} role="presentation" />,
  //   <img className={cx('img_product')} src={require('../../imgData/4896bd57f0894845b5c0ae8300eec549_9366-removebg-preview.png')} onDragStart={handleDragStart} role="presentation" />,
  //   <img className={cx('img_product')} src={require('../../imgData/4896bd57f0894845b5c0ae8300eec549_9366-removebg-preview.png')} onDragStart={handleDragStart} role="presentation" />,
  //   <img className={cx('img_product')} src={require('../../imgData/4896bd57f0894845b5c0ae8300eec549_9366-removebg-preview.png')} onDragStart={handleDragStart} role="presentation" />,
  //   <img className={cx('img_product')} src={require('../../imgData/4896bd57f0894845b5c0ae8300eec549_9366-removebg-preview.png')} onDragStart={handleDragStart} role="presentation" />,
  
  // ];

  const items = products.map((item, index) =>
    <a href={`detail_product_${item.id}`}>
      <img
        key={index}
        className={cx(['img_product', item.BC_color])}
        onDragStart={handleDragStart} 
        role="presentation"
        src={require(`../../imgData/${item.img}`)}
  
      />
    </a>
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