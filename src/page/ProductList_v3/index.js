import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState, CSSProperties, useMemo  } from 'react';
import styles from './ProductList.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faGrip, faList, faHeart as faHeartSolid, faCartShopping, faEye} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { Placeholder, Spinner } from 'react-bootstrap';
import { BeatLoader, FadeLoader, MoonLoader } from 'react-spinners';
import SearchItem from '../../components/SearchItem';
import {formatPrice, priceDiscount} from "../../common"
import { createAxios } from '../../createInstance';
import ConfirmModal_v2 from "../../components/ConfirmModal_v2"
import QuickProduct from '../../components/QuickProduct';
import DetailProduct_v2 from '../DetailProduct_v2';

import { TfiLayoutColumn4Alt, TfiLayoutColumn3Alt, TfiLayoutColumn2Alt, TfiLayoutListThumbAlt  } from "react-icons/tfi";
import { controllers } from 'chart.js';


const cx = classNames.bind(styles)
let axiosJWT = createAxios()



function ProductList_v3({ re_render, accNameSeller }) {
    // props accNameSeller mục đích là tận dụng logic để tạo trang saleHome (C2C)

    let currentUrl = window.location.href;
    let param = currentUrl.split("?")[1]
    let paramToObject = JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')

    const limit = paramToObject._limit

    const [products, setProducts] = useState([])
    const [pageChange, setPageChange] = useState(+paramToObject._page)
    const [loading, setLoading] = useState(true)
    const [loading_page, setLoading_page] = useState(false)
    const [numberOfPage, setNumberOfPage] = useState([])
    const [view, setView] = useState('grid-4')

    const arrPage = (n) => {
        let arr = Array(Math.ceil(n/limit)).fill(0).map((_, index) => index+1)
        return arr
    }

    
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const inforUser = JSON.parse(localStorage.getItem("tokens"));
        setLoading_page(true)

        let apiCall =   paramToObject._favorite === "true" ? 
        `${process.env.REACT_APP_BACKEND_URL}/shoesList/${inforUser.favorite.toString()}?${param}&_hideLock=true`
        :
        `${process.env.REACT_APP_BACKEND_URL}/shoes?${param}&_hideLock=true`

        if(accNameSeller) {
            apiCall =  `${process.env.REACT_APP_BACKEND_URL}/shoes?${param}&_sellerId=${accNameSeller}&_hideLock=true`
        }

        axios.get(apiCall, {signal:controller.signal})
        .then(res => {
            setProducts(res.data)
            setLoading(false)
            setLoading_page(false)

            const xTotalCount = res.headers['x-total-count']
            setNumberOfPage(arrPage(xTotalCount))

        })

        return () => controller.abort()
    }, [re_render, pageChange, trigger])

    const previousPage = () => {
        setPageChange(pre => pre>1 ? pre-1 : pre )
        handleClickScrollToTop()
    }

    const subsequentPage = () => {
        setPageChange(pre => pre<numberOfPage.length ? pre+1 : pre )
        handleClickScrollToTop()
    }

    const handleClickScrollToTop = () => {
        window.scrollTo(0, 0)
    }
    
    return ( 
        <div id='scrollTo' className={cx('wrapper')}>
            <div  className={cx('route')}>
                <div>
                    <span >sản phẩm </span>
                {
                    paramToObject._brand && <><span>&#8594; {paramToObject._brand}</span></>
                }
                {
                    paramToObject._isDiscount && <><span>&#8594; Giảm Giá</span> </>
                }
                {
                    paramToObject._favorite && <><span>&#8594; Yêu Thích</span> </>
                }
                </div>
                <SearchItem setTrigger={setTrigger}/>
                <div>
                    <TfiLayoutListThumbAlt className={cx(['viewProd_btn',{'active':view==="list"}])}
                        onClick = {() => {
                            setView("list")
                            console.log('list')
                        }}
                    />
                    <TfiLayoutColumn4Alt className={cx(['viewProd_btn','btn_grid4',{'active':view==="grid-4"}])}
                         onClick = {() => {
                            setView("grid-4")
                        }}
                    />
                    <TfiLayoutColumn3Alt className={cx(['viewProd_btn','btn_grid3',{'active':view==="grid-3"}])}
                        onClick = {() => {
                            setView("grid-3")
                            console.log('grip')
                        }}
                    />
                    <TfiLayoutColumn2Alt className={cx(['viewProd_btn',{'active':view==="grid-2"}])}
                         onClick = {() => {
                            setView("grid-2")
                        }}
                    />
                </div>
            </div>
            
            <div className={cx('container')}>
            {
                loading_page && <LoadingPage/>
            }
            {
                loading && 
                Array(16).fill(0).map((item, index) => <CardLoading key={index}/>)
            }
            {   
                products.map((item, index) => <Card  view={view} key={item.id} product={item}/>)
            }
            {
                loading === false && products.length === 0 && <div className={cx("not_found")}>Không tìm thấy sản phẩm</div>
            }
            </div>

            {/* pagination */}
            <div className={cx('pagination')}>
                <div className={cx('pagination_container')}>
                    <Link onClick={previousPage}
                        // Kết quả toán 3 ngôi y hệt nhau chỉ khác nếu "true" thì route là "/saleHome", nếu không thì "/shoes"
                        to={accNameSeller ? `/saleHome?${param?.replace(`page=${paramToObject._page}`,`page=${pageChange>1?pageChange-1:pageChange}`)}` : `/shoes?${param?.replace(`page=${paramToObject._page}`,`page=${pageChange>1?pageChange-1:pageChange}`)}`} 
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
                                    handleClickScrollToTop()
                                }}
                                className={cx(['page_number', active])}
                                // Kết quả toán 3 ngôi y hệt nhau chỉ khác nếu "true" thì route là "/saleHome", nếu không thì "/shoes"
                                to={accNameSeller ? `/saleHome?${param?.replace(`page=${paramToObject._page}`,`page=${item}`)}` : `/shoes?${param?.replace(`page=${paramToObject._page}`,`page=${item}`)}`} 
                            >
                                {item}
                            </Link>
                        )
                    })
                }

                    <Link onClick={subsequentPage}
                        // Kết quả toán 3 ngôi y hệt nhau chỉ khác nếu "true" thì route là "/saleHome", nếu không thì "/shoes"
                        to={accNameSeller ? `/saleHome?${param?.replace(`page=${paramToObject._page}`,`page=${pageChange<numberOfPage.length ? pageChange+1 : pageChange}`)}` : `/shoes?${param?.replace(`page=${paramToObject._page}`,`page=${pageChange<numberOfPage.length ? pageChange+1 : pageChange}`)}`} 
                    >
                        <FontAwesomeIcon className={cx('direction_Page')} icon={faArrowRight} />
                    </Link>

                </div>
            </div>

        </div>
    );
}

function Card({product, view}) {
    const inforUser = JSON.parse(localStorage.getItem("tokens"));
    const [like, setLike] = useState(inforUser?.favorite?.includes(product.id))
    const [token, setToken] = useState(inforUser)

    const checkSoldOut = [...product.inventory].every(i => i.quantity===0)

    return (
        <Link to={`/shoes/detail_product?_id=${product.id}`} className={cx(["card", {"list":view==="list","grid-4":view==="grid-4","grid-3":view==="grid-3","grid-2":view==="grid-2"}])}
            onClick={(e) => {window.scrollTo(0, 0)}}
        >
            <div className={cx(["card_thumnal", product.BC_color, checkSoldOut && "sold_out"])}>
                <img src={`${process.env.REACT_APP_BACKEND_URL}/imgs/${product.img}`} a lt="" className={cx(["card-img"])}/>
            {
                token?.status &&
                <FontAwesomeIcon className={cx(['contact_product'], {"active":like})} icon={like ?faHeartSolid:faHeart}
                    onClick={(e) => {
                        e.preventDefault()
                        // sự kiện xủi bọt
                        e.stopPropagation()

                        console.log(token)

                        const handleFavorite = (arr, id) => {
                            let result = arr.includes(id) ? arr.filter(i => i!==id):[...arr, id]
                            return result
                        }

                        axiosJWT.patch(process.env.REACT_APP_BACKEND_URL+"/favorite_list/"+token.accName,{product_id:product.id}, {
                            headers: {Authorization: inforUser.accessToken}
                        })
                        .then(res => {
                            console.log(res.data)

                            localStorage.setItem("tokens", JSON.stringify({...token, favorite:res.data}))
                        })
                        
                        setLike(pre => !pre)
                    }}
                />
            }
            </div>
            {/* listView */}
            <div className={cx("card-data", {"listView": view ==="list"})}>

                <div href="" className={cx("card-button")} onClick={(e) => {e.preventDefault()}}>
                    <Link to={`/shoes/detail_product?_id=${product.id}`} className={cx("detail_vew_btn")} >
                        <FontAwesomeIcon icon={faCartShopping}/>
                    </Link>
                    <ConfirmModal_v2
                        size="lg"
                        body={<DetailProduct_v2 product_prop={product}/>}
                        // accept = {() => {console.log("click")}}
                    >
                        <button className={cx("prev_vew_btn")}>
                            <FontAwesomeIcon icon={faEye}/>
                        </button>
                    </ConfirmModal_v2>
                </div>
            </div>
            <div className={cx("card-items")}>
                <div className={cx("card-title")}>{product.name}</div>
                <div className={cx("card-descr")}>{product.description}</div>
            {
                product.discount_id ?
                <div className={cx("price_discount")}>
                    <span className={cx("shoe_price_old")}>{formatPrice(product.price)}</span>
                    <span className={cx("shoe_price")}>{formatPrice(priceDiscount(product.price, product.discount_id))}</span>
                    <span className={cx("discount_tag")}>-{product.discount_id}%</span>
                </div>
                :
                <div className={cx("card-preci")}>{formatPrice(product.price)}</div>
            }
            </div>
        </Link>
    )
}

function CardLoading() {

    return (
        <div className={cx(['card', 'card_loading'])}>
            <div className={cx('card_thumna_loading')}>
                <BeatLoader color="rgba(138, 138, 138, 1)" size={20} />          
            </div>
            <Placeholder  as="p" animation="glow">
                <Placeholder className="rounded-4 mt-3" bg='dark' xs={12} size='lg'/>
            </Placeholder>
        </div>
    )
}

const LoadingPage = () => {
    return (
        <div className={cx("wrapper_LoadingPage")}>
            <div className={cx("loading")}>
                <MoonLoader  size={120} color="rgba(109, 246, 236, 1)" />
            </div>
        </div>
    )
}

export default ProductList_v3;