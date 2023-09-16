import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState, CSSProperties, useMemo  } from 'react';
import styles from './ProductList.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faGrip, faList, faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { Placeholder, Spinner } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import SearchItem from '../../components/SearchItem';
import {limit} from "../../common"

const cx = classNames.bind(styles)
const formatPrice = (price) => {
    return  price.toLocaleString('vi', {style : 'currency', currency : 'VND'})
}





function ProductList_v3({ brand_v2}) {
    let currentUrl = window.location.href;
    let param = currentUrl.split("?")[1]
    let paramToObject = JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
    console.log(currentUrl)

    const [products, setProducts] = useState([])
    const [pageChange, setPageChange] = useState(+paramToObject._page)
    const [loading, setLoading] = useState(true)
    const [numberOfPage, setNumberOfPage] = useState([])

    const [listView, setListView] = useState(false)

    const arrPage = (n) => {
        let arr = Array(Math.ceil(n/limit)).fill(0).map((_, index) => index+1)
        return arr
    }


    useEffect(() => {
        // const user = localStorage.getItem("tokens")
    }, [])

    useEffect(() => {
       
        axios.get(`http://localhost:5000/shoes?${param}`)
        .then(res => {
            setProducts(res.data)
            setLoading(false)

            const xTotalCount = res.headers['x-total-count']
            setNumberOfPage(arrPage(xTotalCount))


        })
        return () => {

        }
    }, [brand_v2, pageChange])

    const previousPage = () => {
        setPageChange(pre => pre>1 ? pre-1 : pre )

        handleClickScroll()
    }

    const subsequentPage = () => {
        setPageChange(pre => pre<numberOfPage.length ? pre+1 : pre )
        
        handleClickScroll()
    }

    const handleClickScroll = () => {
        const element = document.getElementById('scrollTo');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    return ( 
        <div id='scrollTo' className={cx('wrapper')}>
            <button
                onClick={() => {
                    // console.log(para_query_value)
                    console.log(param);
                    console.log(paramToObject)

                }}
            >show param</button>

            <div  className={cx('route')}>
                <div>
                    <span >sản phẩm</span>
                    {
                        Boolean(paramToObject._brand) && <span > &#8594; </span>
                    }
                    <span>{paramToObject._brand}</span>
                </div>

                <SearchItem/>

                <div>
                    <FontAwesomeIcon className={cx(['viewProd_btn', {'active':listView}])} icon={faList}
                        onClick = {() => {
                            setListView(true)
                            console.log('list')
                        }}
                    />
                    <FontAwesomeIcon className={cx(['viewProd_btn',{'active':!listView}])} icon={faGrip}
                        onClick = {() => {
                            setListView(false)
                            console.log('grip')
                        }}
                    />

                </div>
                

                
            </div>
            
            
            <div className={cx('container')}>
            {
                loading && 
                Array(limit).fill(0).map((item, index) => <CardLoading key={index}/>)
            }

            {   
                products.map((item, index) => <Card listView={listView} key={item.id} product={item}/>)
            }
            </div>

            {/* pagination */}
            <div className={cx('pagination')}>
                <div className={cx('pagination_container')}>
                    <Link
                        onClick={previousPage}
                        to={`/shoes?${param?.replace(`page=${paramToObject._page}`,`page=${pageChange>1?pageChange-1:pageChange}`)}`} 
                    >
                        <FontAwesomeIcon className={cx('direction_Page')} icon={faArrowLeft} />
                    </Link>

                {
                    numberOfPage.map((item, index) => 
                    {
                        let active = +paramToObject._page === item ? 'active' : ''
                        return (
                            <Link 
                                key={index} 
                                onClick={ () => { 
                                    setPageChange(item) 
                                    handleClickScroll()
                                }}
                                className={cx(['page_number', active])}
                                to={`/shoes?${param?.replace(`page=${paramToObject._page}`,`page=${item}`)}`} 
                            >
                                {item}
                            </Link>
                        )
                    })
                }

                    <Link
                        onClick={subsequentPage}
                        to={`/shoes?${param?.replace(`page=${paramToObject._page}`,`page=${pageChange<numberOfPage.length ? pageChange+1 : pageChange}`)}`} 
                    >
                        <FontAwesomeIcon className={cx('direction_Page')} icon={faArrowRight} />
                    </Link>

                </div>
            </div>

        </div>
    );
}

function Card({product, listView}) {
    const [like, setLike] = useState(false)

    return (
        <Link to={`/shoes/detail_product?_id=${product.id}`} className={cx(["card", {"active":listView}])}
            onClick={(e) => {window.scrollTo(0, 0)}}
        >
            <div className={cx(["card_thumnal", product.BC_color])}>
                <img src={`http://localhost:5000/imgs/${product.img}`} a lt="" className={cx(["card-img"])}/>
                <FontAwesomeIcon className={cx(['contact_product'], {"active":like})} icon={like ?faHeartSolid:faHeart}
                    onClick={(e) => {
                        e.preventDefault()

                        // sự kiện xủi bọt
                        e.stopPropagation()

                        console.log("heart logo")
                        setLike(pre => !pre)
                    }}
                />
            </div>

            <div className={cx("card-data")}>
                <a href="" className={cx("card-button")}>Mua</a>
            </div>
            <div className={cx("card-items")}>
                <div className={cx("card-title")}>{product.name}</div>
                <div className={cx("card-descr")}>{product.description}</div>
                <div className={cx("card-preci")}>{formatPrice(product.price)}</div>
            </div>
            {/* <div className={cx("icon")}>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-sharp fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
            </div> */}
        </Link>
    )
}

function CardLoading() {

    

    return (
        <div className={cx(['card', 'card_loading'])}>

            <div className={cx('card_thumna_loading')}>
                <BeatLoader
                    color="rgba(138, 138, 138, 1)"
                    size={20}
                />          
            </div>
            
            
            <Placeholder  as="p" animation="glow">
                <Placeholder className="rounded-4 mt-3" bg='dark' xs={12} size='lg'/>
            </Placeholder>
        </div>
    )
}

export default ProductList_v3;