import classNames from "classnames/bind";
import styles from './Header.module.scss'

import axios from "axios";
import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch, faBars, faClose, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css'; // optional

import Tippy from '@tippyjs/react/headless';




const cx = classNames.bind(styles)

function Header() {

    const [orderItem, setOrderItem] = useState([])
    const [check, setCheck] = useState(false)
    const [showBar, setShowBar] = useState(false)

    const refInputSearch = useRef(null)

    const navigate = useNavigate();

    // const quantityChange = useMemo(() => {
    //     return JSON.parse(localStorage.getItem('cart')).length
    // })



    useEffect(() => {
        
        axios.get("http://localhost:4000/data")
        .then(res => {
            let cart = JSON.parse(localStorage.getItem('cart'))
            let newCart = cart.map(item => {
                return {
                    ...item,
                    "product": res.data.find(i => item.id === i.id)
                }
            })
            setOrderItem(newCart.sort(function(a, b){return a.id - b.id}))
        })

    }, [])

    const [login, setLogin] = useState("")
    useEffect(() => {
        const token = localStorage.getItem("tokens");
        if(!token) {
        localStorage.setItem("tokens", JSON.stringify({}));
        
        }
        console.log( (JSON.parse(token)) )

        setLogin(JSON.parse(token).role)
    }, [])



    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('menubarAndSearMB_btn')}>
                <button className={cx("show_bar_btn")}
                    onClick={() => {
                        setShowBar(pre => !pre)
                    }}
                >
                    <FontAwesomeIcon icon={faBars}/>
                </button>
                <button className={cx("search_btn_mb")}
                    onClick={() => {
                        setShowBar(true)
                        refInputSearch.current.focus()

                    }}
                >
                    <FontAwesomeIcon  icon={faSearch}/>
                </button>

            </div>


            <ul className={cx(["nav_dropdown", {"show_bar":showBar}])} id={styles["nav-menu"]} >
                <button className={cx("close_bar_btn")}
                    onClick={() => {
                        setShowBar(pre => !pre)
                    }}
                >
                    <FontAwesomeIcon icon={faClose}/>
                </button>

                <li className={cx("box_logo")} id={styles["img-logo"]}>
                 
                
                    <img className={cx('logo')} src={require('./logoDT-70.png')}/>
                    <span className={cx('logo_title')}>
                        <span className={cx('L_1')}>C</span>
                        <span className={cx('L_2')}>D</span>
                        <span className={cx('L_3')}>I</span>
                        <span className={cx('L_4')}>O</span>
                    </span>

                </li>

                <li className={cx(["men","menu"])}><a href="#">trang chủ</a></li>
                <li className={cx(["men","menu"])}>
                    <Link to='/productList/page1' href="#">sản phẩm</Link>
                    <ul className={cx("sub_nav_prod")}>
                        <li><Link to="">NIKE</Link></li>
                        <li><Link to="">ADIDAS</Link></li>
                        <li><Link to="">CONVERSE</Link></li>
                        <li><Link to="">VANS</Link></li>
                        <li><Link to="">PUMA</Link></li>

                    </ul>
                </li>
                <li className={cx(["kids","menu"])}><a href="#">safe off</a></li>
                

                <li className={cx("input-search")}> 
                    <input  id={styles["search"]} type="text" className={cx("search-input")}  placeholder="Search"
                        ref={refInputSearch}
                    />
                    <button className={cx('search_btn')}>
                        <FontAwesomeIcon  icon={faSearch}/>
                    </button>
                </li>
            </ul>


            <ul id={styles["nav"]}>
                {
                    login ?
                    <li className={cx('avatar')}>
                        <Tippy
                            trigger="click"
                            interactive
                            placement="bottom-end"	
                            render={attrs => (
                                <div className={cx('menu_avatar')} tabIndex="-1" {...attrs}>
                                    <ul>
                                        <li>
                                            <Link to='/infor'>Thông tin cá nhân</Link>
                                        </li>
                                        <li>
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
                    :
                    <li className={cx("login")}>
                        <span href="" >
                            TÀI KHOẢN
                        </span>
                        <ul className={cx(["sub_nav","the_first"])}>
                            <li><Link to="/signIn">ĐĂNG NHẬP</Link></li>
                            <li><Link to="/signUp">ĐĂNG KÝ</Link></li>
                        </ul>
                    </li>
                }
                

                <li className={cx("cart_btn")}>
                    <div className={cx("header_cart-wrap")}>
                        <Link to="/order" className={cx("header_cart")}>
                            <FontAwesomeIcon className={cx('header_cart-icon')} icon={faCartShopping}/>
                        </Link>
                        <span className={cx("header_cart-notice")}>{orderItem.length}</span>
                        
                        <div className={cx("header_cart-list")}>
                            <img src="./assets/img/no-cart.png" alt="" className={cx("header_cart-no-cart-img")}/>
                            
                        {
                            !Boolean(orderItem.length) && <p className={cx("header_cart-list-no-cart-msg")}>
                                Chưa có sản phẩm
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
            <img src={require(`../../../../imgData/${order.product.img}`)} alt="dd" className={cx("header_cart-img")}/>
            
            <i className={cx("header_cart-icon-close")}>x</i>
            <div className={cx("header_cart-item-infor")}>
                <a href="" className={cx("header_cart-item-name")}>{order.product.name}</a>
                <span className={cx("header_cart-item-price")}>{order.product.price}</span>
                <div id={styles["quantity_product_1"]}>
                    <p className={cx("quantity")}>Số Lượng: {order.quantity}</p>
                </div>
            </div>
        </li>
    )
}

export default Header;




    