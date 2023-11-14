import classNames from "classnames/bind";
import styles from './Header.module.scss'

import axios from "axios";
import { useState, useEffect, useMemo, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch, faBars, faClose, faUser, faRightFromBracket, faHeart, faHome, faPercent, faBell } from "@fortawesome/free-solid-svg-icons";
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css'; // optional

import Tippy from '@tippyjs/react/headless';
import { formatPrice, limit } from "../../../../common";
import { faShopify } from "@fortawesome/free-brands-svg-icons";




const cx = classNames.bind(styles)

function Header({setRe_render}) {

    const [orderItem, setOrderItem] = useState([])
    const [notify, setNotify] = useState([])

    const [check, setCheck] = useState(false)
    const [login, setLogin] = useState("")

    const token = localStorage.getItem("tokens");

    const navigate = useNavigate();


    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let cart_prod_id = cart.map(i => i.id).toString()

        axios.get(process.env.REACT_APP_BACKEND_URL+"/shoesList/"+cart_prod_id)
        .then(res => {
            let newCart = cart.map(item => {
                return {
                    ...item,
                    "product": res.data.find(i => item.id === i.id)
                }
            })
            setOrderItem(newCart.sort(function(a, b){return a.id - b.id}))
        })

        if(JSON.parse(token).status) {
            axios.get(process.env.REACT_APP_BACKEND_URL+"/notify?_accName="+JSON.parse(token).accName)
            .then(res => {
                setNotify(res.data)
                console.log(res.data)
            })
        }
        else {
            axios.get(process.env.REACT_APP_BACKEND_URL+"/notify?_accName=all")
            .then(res => {
                setNotify(res.data)
                console.log(res.data)
            })
        }

        



    }, [])

    useEffect(() => {
        if(!token) {
            localStorage.setItem("tokens", JSON.stringify({}));
        }
        console.log( (JSON.parse(token)) )
        setLogin(JSON.parse(token)?.role)
    }, [])



    return ( 
        <div className={cx('wrapper')}>
           


            <ul className={cx(["nav_dropdown"])} id={styles["nav-menu"]} >
                

                <li className={cx("box_logo")} >
                    <img className={cx('logo')} src={require('./logoDT-70.png')}/>
                    <span className={cx('logo_title')}>
                        <span className={cx('L_1')}>C</span>
                        <span className={cx('L_2')}>D</span>
                        <span className={cx('L_3')}>I</span>
                        <span className={cx('L_4')}>O</span>
                    </span>
                </li>

                <li className={cx(["men","menu"])}>
                    <Link to="/home" onClick={() => {window.scrollTo(0, 0)}}>
                        <span className={cx("nav_desktop")}>trang chủ</span><span className={cx("nav_mobile")}><FontAwesomeIcon icon={faHome}/></span>
                    </Link>
                </li>

                <li className={cx(["men","menu"])}>
                    <Link 
                        to={`/shoes?_page=1&_limit=${limit}`} 
                        onClick={() => {
                            window.scrollTo(0, 0)
                            setRe_render(pre => !pre)
                        }}
                    >
                        <span className={cx("nav_desktop")}>sản phẩm</span><span className={cx("nav_mobile")}><FontAwesomeIcon icon={faShopify}/></span>
                        
                    </Link>
                   
                </li>

                <li className={cx(["men","menu"])}>
                    <Link to={`/shoes?_page=1&_limit=${limit}&_isDiscount=true`} 
                        onClick={() => {
                            window.scrollTo(0, 0)
                            setRe_render(pre => !pre)
                            
                        }}
                    >
                        <span className={cx("nav_desktop")}>giảm giá</span><span className={cx("nav_mobile")}><FontAwesomeIcon icon={faPercent}/></span>
                    </Link>
                </li>
                

              
            </ul>


            <ul id={styles["nav"]}>
                <li>
                    <Tippy
                        trigger="click"
                        interactive
                        placement="bottom-end"	
                        render={attrs => (
                            <div className={cx("wapper_notify")}  tabIndex="-1" {...attrs}>
                            {
                                notify.map(i => (
                                    <div className={cx("notify_item")}>
                                        <div>
                                            <h3>{i.name}</h3>
                                            <p>{i.date}</p>
                                        </div>
                                        <p>{i.content}</p>
                                    </div>
                                ))
                            }
                               
                            </div>
                        )}
                    >
                        <button>
                            <FontAwesomeIcon icon={faBell} className={cx(["notify_btn","btn_header"])}/>
                        </button>
                    </Tippy>
                {
                    !!notify.length && <span className={cx("header_cart-notice")}></span>
                }
                    
                </li>
                {
                    login ?
                    <>
                        
                        <li className={cx(['favorite',"btn_header"])}>
                            <Link to={`/shoes?_favorite=true&_page=1&_limit=${limit}`}
                                onClick={() => {
                                    window.scrollTo(0, 0)
                                    setRe_render(pre => !pre)
                                    
                                }}
                            >
                                <FontAwesomeIcon icon={faHeart}/>
                            </Link>
                        </li>
                        <li className={cx(['avatar',"btn_header"])}>
                            <Tippy
                                trigger="click"
                                interactive
                                placement="bottom-end"	
                                render={attrs => (
                                    <div className={cx('menu_avatar')} tabIndex="-1" {...attrs}>
                                        <ul>
                                            <li onClick={(e) => {window.scrollTo(0, 0)}}>
                                                <Link to='/infor' >Thông tin cá nhân</Link>
                                            </li>
                                            <li onClick={(e) => {window.scrollTo(0, 0)}}>
                                                <Link to='/purchaseOrder'>Đơn mua</Link>
                                            </li>
                                            <li
                                                onClick={() => {
                                                    localStorage.setItem("tokens", JSON.stringify({}));
                                                    navigate("/signin")
                                                }}
                                            >
                                                Đăng xuất
                                                <FontAwesomeIcon className={cx('logout_icon')}  icon={faRightFromBracket}/>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            >
                                <button >
                                    <FontAwesomeIcon className={cx('avatar_icon')}  icon={faUser}/>
                                </button>
                            </Tippy>
                        </li>
                    </>
                    :
                    <li className={cx("login")}>
                        <span  >
                            TÀI KHOẢN
                        </span>
                        <ul className={cx(["sub_nav","the_first"])}>
                            <li><Link to="/signIn">ĐĂNG NHẬP</Link></li>
                            <li><Link to="/signUp">ĐĂNG KÝ</Link></li>
                        </ul>
                    </li>
                }
                

                <li className={cx(["cart_btn", "btn_header"])}>
                    <div className={cx("header_cart-wrap")}>
                        <Link to="/order" className={cx("header_cart")}>
                            <FontAwesomeIcon className={cx('header_cart-icon')} icon={faCartShopping}/>
                        </Link>
                        {/* <span className={cx("header_cart-notice")}>{orderItem.length}</span> */}
                    {
                        Boolean(orderItem.length) && <span className={cx("header_cart-notice")}></span>
                    }
                        {/* <span className={cx("header_cart-notice")}></span> */}

                        
                        <div className={cx("header_cart-list")}>
                            <img src="./assets/img/no-cart.png" alt="" className={cx("header_cart-no-cart-img")}/>
                            
                        {
                            !Boolean(orderItem.length) && <p className={cx("header_cart-list-no-cart-msg")}>
                                <p>Chưa có sản phẩm</p>
                                <p>¯\_( ͡❛ ͜ʖ ͡❛)_/¯</p>
                            </p>
                        }
                            
                            
                            <ul className={cx("header_cart-list-item")}>
                                
                            {
                                orderItem.map((item, index) => 
                                    <CartItem_subnav key={index} order={item}/>
                                )
                            }
                                
                                
                            </ul>
                        </div>


                    </div>

                </li>

            </ul>

            

        </div>
    );
}

function CartItem_subnav({order}) {
    return (
        <li className={cx("header_cart-item")}>
            {/* <img src={require(`../../../../imgData/${order.product.img}`)} alt="dd" className={cx("header_cart-img")}/> */}
            <img src={`http://localhost:5000/imgs/${order?.product?.img}`} alt="dd" className={cx("header_cart-img")}/>
            
            
            <i className={cx("header_cart-icon-close")}>x</i>
            <div className={cx("header_cart-item-infor")}>
                <a href="" className={cx("header_cart-item-name")}>{order?.product?.name}</a>
                <span className={cx("header_cart-item-price")}>{formatPrice(order?.product?.price)}</span>
                <div id={styles["quantity_product_1"]}>
                    <p className={cx("quantity")}>Số Lượng: {order?.quantity}</p>
                </div>
            </div>
        </li>
    )
}

export default Header;




    