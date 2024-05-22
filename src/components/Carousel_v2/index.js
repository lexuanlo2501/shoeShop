import classNames from 'classnames/bind';
import styles from "./Carousel_v2.module.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import "./styleCarousel.scss"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatPrice, priceDiscount } from '../../common';

const cx = classNames.bind(styles)

function Carousel_v2({brand="", setTrigger, nameProd, categoryID, accID}) {
    // accID
    const [products, setProducts] = useState([])
    const [showLabelRecommend,setShowLabelRecommend] = useState(false)

  
    const handleDragStart = (e) => e.preventDefault();
    
    const paramCategory = categoryID ? `&_category=${categoryID}` : ""

    useEffect(() => {
        const controller = new AbortController()
        const apiCall = !accID ?
        process.env.REACT_APP_BACKEND_URL+`/shoes?_limit=10&_page=1&_brand=${brand}&_string=${nameProd||""}&_random=true${paramCategory}`
        :
        process.env.REACT_APP_BACKEND_URL+"/recommendProd/"+accID
        axios.get(apiCall, {signal:controller.signal})
        .then(res => {
            console.log({res:res.data})
            setProducts(res.data)
            if(accID && res.data.length !== 0) {
                setShowLabelRecommend(true)
            }
        })
        .catch(err => console.log(err))

        return () => controller.abort()
    }, [])

    return (
        <div className={cx("carousel_wrapper")}>
        {
            showLabelRecommend && <h1>Gợi ý Theo Đánh Gía Của Bạn</h1>
        }
            <Swiper
                style={{
                    // '--swiper-navigation-color': '#333',
                    '--swiper-pagination-color': '#8d8989',
                }}
                modules={[Pagination, Navigation]}
                navigation={true}
               
                nextEl=".next"
                slidesPerView={4}
                spaceBetween={15}
                pagination={{
                    clickable: true,
                }}
                className="mySwiper"

                breakpoints={{
                  360:{slidesPerView:2},
                  375:{slidesPerView:2},
                  400:{slidesPerView:2},
                  639:{slidesPerView:3},
                  865:{slidesPerView:3},
                  1000:{slidesPerView:4},
                  1500:{slidesPerView:4},
                  1700:{slidesPerView:4}
                }}
            >
            {
                products?.map(item => (
                    <SwiperSlide key={item.id} className={cx("link")}>
                        <Link
                            key={item.id}
                            to={`/shoes/detail_product?_id=${item.id}`}
                            onClick={() => {
                                window.scrollTo(0, 0)
                                setTrigger && setTrigger(pre => !pre)
                            }}
                            replace
                            
                        >
                        {
                            !!item.discount_id && <span className={cx("discount_tag")}>- {item.discount_id}%</span>
                        }
                            <img className={cx(["img_product", item.BC_color])} src={process.env.REACT_APP_BACKEND_URL+`/imgs/${item.img}`}/>
                            <div className={cx("priceAndName")}>
                                <p>{item.name}</p>
                            { 
                                item?.discount_id ?
                                <div className={cx("is_discount")}>
                                    <p className={cx("shoe_price_old")}>{formatPrice(item.price)}</p>
                                    <p className={cx("shoe_price")}>{formatPrice(priceDiscount(item?.price, item?.discount_id))}</p>
                                </div>
                                :
                                <p className={cx("shoe_price")}>{formatPrice(item.price)}</p>
                            }               
                            </div>
                            <div className={cx("fake_padding")}></div>

                        </Link>
                    </SwiperSlide>

                ))
            }
            </Swiper>
            {
                products.length === 0 && !accID && <h2 className={cx("empty_prod")}>CHƯA CÓ SẢN PHẨM CHO MỤC NÀY</h2>
            }
        </div>
    );
}
// src={process.env.REACT_APP_BACKEND_URL+`/imgs/${item.img}`}

export default Carousel_v2;