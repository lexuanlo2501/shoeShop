import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

export default function Slider({imgs = []}) {

  // console.log(imgs)
  return (
    <MDBCarousel showControls dark> 
      {/* <MDBCarouselItem
        className='vh-100 mx-auto d-block'
        itemId={1}
        src={require('../../imgData/shoe-removebg-preview.png')}
        alt='...'
      />
      <MDBCarouselItem
        className='vh-100 mx-auto d-block'
        itemId={2}
        src={require('../../imgData/air-max-alpha-trainer-5-training-shoes-r0bxqt-removebg-preview.png')}
        alt='...'
      />
      <MDBCarouselItem
        className='vh-100 mx-auto d-block'
        itemId={3}
        src={require('../../imgData/4896bd57f0894845b5c0ae8300eec549_9366-removebg-preview.png')}
        alt='...'
      /> */}



      {
        imgs.map((item, index) => 
          <MDBCarouselItem 
              key={index}
              className='vh-100 mx-auto d-block'
              itemId={index+1}
              // src={require('../../imgData/'+item)}
              src={process.env.REACT_APP_BACKEND_URL+`/imgs/${item}`}
              alt='...'
          />
        )
      }


    </MDBCarousel>
  );
}