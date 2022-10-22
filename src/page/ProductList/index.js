import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ProductList.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

function ProductList({page, limit, numberOfPage, brand}) {

    const [products, setProducts] = useState([])


    useEffect(() => {

        let route_ =  brand ? `products/${brand}/` : ''
        // http://localhost:4000/products/adidas/data?_page=1&_limit=2
        // axios.get(`http://localhost:4000/data?_page=${page}&_limit=${limit}`)
        axios.get(`http://localhost:4000/${route_}data?_page=${page}&_limit=${limit}`)
        .then(res => {
            setProducts(res.data)
        })
    }, [])

   

    
    return ( 
        <div className={cx('wrapper')}> 
            <div className={cx('route')}>
                <a >sản phẩm</a>  &#8594;  <span>{brand}</span>
            </div>
            
            <div className={cx('container')}>
            {
                products.map((item, index) => <Card key={index} product={item}/>)
            }
            </div>

            <div className={cx('pagination')}>
                <div className={cx('pagination_container')}>
                <a href={page>1 && brand ? `/productList/${brand}/page${page-1}` : `/productList/page${page-1}`} >
                    <FontAwesomeIcon className={cx('direction_Page')} icon={faArrowLeft} />
                </a>
                {
                    numberOfPage.map((item, index) => 
                        {
                            let active = page === index+1 ? 'active' : ''
                            return <a className={cx(['page_number', active])} key={index} href={brand ? `/productList/${brand}/page${item}` : `/productList/page${item}`} >
                                {item}
                            </a>
                        }
                    )
                }
                <a href={page<numberOfPage.length && brand ? `/productList/${brand}/page${page+1}` : `/productList/page${page+1}`} >
                    <FontAwesomeIcon className={cx('direction_Page')} icon={faArrowRight} />
                </a>

                </div>
            </div>
            
        </div>
    );
}

function Card({product}) {
    return (
        <a href={`/detail_product_${product.id}`} className={cx("card")}>
            <div className={cx(["card_thumnal", product.BC_color])}>
                <img src={require(`../../imgData/${product.img}`)} alt="" className={cx(["card-img"])}/>
            </div>

            <div className={cx("card-data")}>
                <a href="" className={cx("card-button")}>Mua</a>
            </div>
            <div className={cx("card-items")}>
                <div className={cx("card-title")}>{product.name}</div>
                <div className={cx("card-preci")}>{product.price}</div>
            </div>
            <div className={cx("icon")}>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
            </div>
        </a>
    )
}

export default ProductList;