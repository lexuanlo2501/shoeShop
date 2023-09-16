import Carousel from 'react-bootstrap/Carousel';
import './sliderHome.scss'
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

function SliderHome({}) {
  return (
    <Carousel className='bg-dark'>
       <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 vh-100 "
          src={require('./img/chuoi-cung-ung-nike.jpg')}
          
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Shop Nike chính hãng ở Việt Nam</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 vh-100 "
          src={require('./img/Reuters.jpg')}
          alt="First slide"
        />

        <Carousel.Caption>
          <h3>SALE</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 vh-100 "
          src={require('./img/yeezys.webp')}
          
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Yezzy</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
     

  );
}

export default SliderHome;