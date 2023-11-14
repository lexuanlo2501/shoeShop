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
import {limit, formatPrice, priceDiscount} from "../../common"

const cx = classNames.bind(styles)



function ProductList_v3({ re_render }) {
    let currentUrl = window.location.href;
    let param = currentUrl.split("?")[1]
    let paramToObject = JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
    // console.log(currentUrl)

    const [products, setProducts] = useState([])
    const [pageChange, setPageChange] = useState(+paramToObject._page)
    const [loading, setLoading] = useState(true)
    const [numberOfPage, setNumberOfPage] = useState([])

    const [listView, setListView] = useState(false)

    const arrPage = (n) => {
        let arr = Array(Math.ceil(n/limit)).fill(0).map((_, index) => index+1)
        return arr
    }

    
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
       
        const inforUser = JSON.parse(localStorage.getItem("tokens"));


        // axios.get(`http://localhost:5000/shoes?${param}`)
        axios.get(
            paramToObject._favorite === "true" ? 
            `${process.env.REACT_APP_BACKEND_URL}/shoesList/${inforUser.favorite.toString()}?${param}`
            :
            `${process.env.REACT_APP_BACKEND_URL}/shoes?${param}`
        )
        .then(res => {
            setProducts(res.data)
            setLoading(false)

            const xTotalCount = res.headers['x-total-count']
            setNumberOfPage(arrPage(xTotalCount))


        })
        return () => {

        }
    }, [re_render, pageChange, trigger])

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

            {
                loading === false && products.length === 0 && <div className={cx("not_found")}>Không tìm thấy sản phẩm</div>
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
    const inforUser = JSON.parse(localStorage.getItem("tokens"));
    // const [like, setLike] = useState(false)
    const [like, setLike] = useState(inforUser?.favorite?.includes(product.id))
    const [token, setToken] = useState(inforUser)


    // useEffect(() => {
    //     setToken(JSON.parse(localStorage.getItem("tokens")))
    // }, [like])

    const checkSoldOut = [...product.inventory].every(i => i.quantity===0)



    return (
        <Link to={`/shoes/detail_product?_id=${product.id}`} className={cx(["card", {"active":listView}])}
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


                        axios.patch(process.env.REACT_APP_BACKEND_URL+"/favorite_list/"+token.accName,{product_id:product.id})
                        .then(res => {
                            console.log(res.data)
                            localStorage.setItem("tokens", JSON.stringify({...token, favorite:res.data}))
                        })
                        
                        setLike(pre => !pre)


                    }}
                />
            }
               
            </div>

            <div className={cx("card-data")}>
                <a href="" className={cx("card-button")}>Mua</a>
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