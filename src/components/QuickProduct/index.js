import classNames from "classnames/bind";
import styles from "./quickProduct.module.scss"
import { formatPrice, priceDiscount } from "../../common";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useState } from "react";


const cx = classNames.bind(styles)

function QuickProduct({product}) {
    const [imgMain, setImgMain] = useState(product?.img)


    return (
        <div className={cx("wrapper_quickDetail")}>
            <div className={cx("img_gallery")}>
                <img className={cx("img_main")} src={`${process.env.REACT_APP_BACKEND_URL}/imgs/${imgMain}`}/>

                <Swiper
                    style={{
                        '--swiper-navigation-color': '#333',
                        '--swiper-pagination-color': '#fff',
                    }}
                    modules={[Pagination, Navigation]}
                    navigation={true}
                    slidesPerView={3}
                    spaceBetween={5}
                    pagination={{
                        clickable: true,
                    }}
                    className="mySwiper"
                >
                {
                    [product.img,...product?.imgs].map(img => (
                        <SwiperSlide key={img} onClick={() => setImgMain(img)}>
                            <img className={cx("img_sub_slide")}
                                src={process.env.REACT_APP_BACKEND_URL+`/imgs/${img}`} alt="shoe image"
                            />
                        </SwiperSlide>
                    ))
                }
                </Swiper>

            </div>

            <div className={cx("infor")}>

                <h1>{product.name}</h1>
            {/* PRICE */}
            {
                !!product.price && 
                (
                    product?.discount_id ?
                    <>
                        <p className={cx("shoe_price_old")}>{formatPrice(product.price)}</p>
                        <p className={cx("shoe_price")}>{formatPrice(priceDiscount(product?.price, product?.discount_id))}</p>
                        <span className={cx("discount_tag")}>-{product.discount_id}%</span>
                    </>
                    :
                    <p className={cx("shoe_price")}>{formatPrice(product.price)}</p>
                )
                
            }
            </div>
        </div>
    );
}

export default QuickProduct;