import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState, CSSProperties  } from 'react';
import styles from './ProductList.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faGrip, faList, faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { Placeholder, Spinner } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import SearchItem from '../../components/SearchItem';

const cx = classNames.bind(styles)

function ProductList({page, limit, numberOfPage, brand, brand_v2}) {

    const [products, setProducts] = useState([])
    const [pageChange, setPageChange] = useState("")
    const [loading, setLoading] = useState(true)

    const [listView, setListView] = useState(false)

    useEffect(() => {
        const user = localStorage.getItem("tokens")
        console.log(JSON.parse(user))
    }, [])

    useEffect(() => {

        let route_ =  brand ? `products/${brand}/` : ''
        // http://localhost:4000/products/adidas/data?_page=1&_limit=2
        // axios.get(`http://localhost:4000/data?_page=${page}&_limit=${limit}`)
        axios.get(`http://localhost:4000/${route_}data?_page=${page}&_limit=${limit}`)
        .then(res => {
            setProducts(res.data)
            setLoading(false)
        })
        

        return () => {

        }
        

    }, [brand_v2, pageChange])

    const previousPage = () => {
        setPageChange(pre => pre>1 ? pre-1 : pre )
    }

    const subsequentPage = () => {
        setPageChange(pre => pre<numberOfPage.length ? pre+1 : pre )

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
                    <span >sản phẩm</span>
                    {
                        Boolean(brand) && <span > &#8594; </span>
                    }
                    <span>{brand}</span>
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
            {
                brand ? 
                <Link to={page>1 ? `/productList/${brand}/page${page-1}` : `/productList/${brand}/page${page}`} 
                    onClick={previousPage}
                >
                    <FontAwesomeIcon className={cx('direction_Page')} icon={faArrowLeft} />
                </Link>
                :
                <Link to={page>1 ? `/productList/page${page-1}` : `/productList/page${page}`} 
                    onClick={previousPage}
                >
                    <FontAwesomeIcon className={cx('direction_Page')} icon={faArrowLeft} />
                </Link>
            }

            {
                numberOfPage.map((item, index) => 
                {
                    let active = page === index+1 ? 'active' : ''
                    return (
                        <Link 
                            onClick={ () => { 
                                setPageChange(item) 
                                handleClickScroll()
                            }}
                            className={cx(['page_number', active])} key={index} to={brand ? `/productList/${brand}/page${item}` : `/productList/page${item}`} 
                        >
                            {item}
                        </Link>
                    )
                }
                )
            }

            {
                brand ? 
                <Link to={page<numberOfPage.length ? `/productList/${brand}/page${page+1}` : `/productList/${brand}/page${page}`} 
                    onClick={subsequentPage}
                >
                    <FontAwesomeIcon className={cx('direction_Page')} icon={faArrowRight} />
                </Link>
                :
                <Link to={page<numberOfPage.length ? `/productList/page${page+1}` : `/productList/page${page}`} 
                    onClick={subsequentPage}
                >
                    <FontAwesomeIcon className={cx('direction_Page')} icon={faArrowRight} />
                </Link>
            }


                </div>
            </div>

        </div>
    );
}

function Card({product, listView}) {
    const [like, setLike] = useState(false)

    return (
        <Link to={`/detail_product_${product.id}`} className={cx(["card", {"active":listView}])}
            onClick={(e) => {window.scrollTo(0, 0)}}
        >
            <div className={cx(["card_thumnal", product.BC_color])}>
                <img src={require(`../../imgData/${product.img}`)} a lt="" className={cx(["card-img"])}/>
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
                <div className={cx("card-preci")}>{product.price} ₫</div>
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

export default ProductList;