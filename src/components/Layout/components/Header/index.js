import classNames from "classnames/bind";
import styles from './Header.module.scss'

import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function Header() {

    const [orderItem, setOrderItem] = useState([])
    const [check, setCheck] = useState(false)

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

    return ( 
        <div className={cx('wrapper')}>
            <ul id={styles["nav-menu"]}>
        
                <li id={styles["img-logo"]}>
                    {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAaVBMVEX///8AAADl5eX29vb5+fm8vLzs7OzKyspOTk7g4ODY2Nj8/PySkpKMjIyenp6bm5saGhrQ0NBcXFx1dXWnp6dtbW07Ozuurq7CwsIyMjJoaGh8fHxTU1MVFRUsLCwjIyNHR0eEhIQNDQ20t47jAAACCElEQVRoge3XyZaDIBAF0C6N4DzHKWpM/v8jWzO0RhHB4KLPqbsN+CJQCD8/CCGEEEIIIYQQQgj9O9phT9Z1zo8GPSZUK1Kbk0trR32mbrvVOeK1sKFQHUryJASPP3sEypPKTId6GUCbb41hC4G6UNuPoRdvL5i+HVGTqeVneLgJlEcAYCrIJIXXPkOvPq9y3mjf0v0yU4/8LnyGgmkIrRUy/MmvitcyqhLeqkiwIKuh9e7VTOjN/MuE8GKJdswfHXZl6lYQX8dQKAPx1ak1Q49MPpQYlxKmOrFpfXmUmnQu9Uz4JFCtU8Wz112ii5VWMCdSrR/e0yO4BvvBXWRC6Et/UtJ3X2O7rU7dbBkKtUDXOWecno2Gdl6HjFA42/Kpk9flvrBmJKwX7Qd44yu3qpk8hP3HSeSZDTMUsnTvt4ROH3NffPj1fuW27MxhExbZ+tmS+VyN69LpVy57cB8q7uFly3LobnlkW7YRrEzoy95pfaG8Z69q5Kt1xt2Raio4/iXbMTOJ8FeOJ5YLvbtqzmBOLZPapfvrZkbifeNC4fFadH6bZNcmvCoQSg1d1RdFSyC1zZXeX564m9LAPOZuurFhiZ9JZS0PSiNXWd0wrJVwvXmD/NKNEdq5hw3wKPoc62vsWwesYBYrr7qsbLPOTFJb0TVY1ImQI5cRQgghhBBCCCGEEELifgEUhRRaGyMaJgAAAABJRU5ErkJggg==" 
                    alt="Nike" height="30px" width="50px" className={cx("nike-img")}/> */}
                    <img className={cx('logo')} src={require('./logoDT-70.png')}/>
                    <span className={cx('logo_title')}>
                        <span className={cx('L_1')}>C</span>
                        <span className={cx('L_2')}>D</span>
                        <span className={cx('L_3')}>I</span>
                        <span className={cx('L_4')}>O</span>
                    </span>

                </li>

                <li className={cx(["border", "padding", "menu"])}><a href="#">men</a></li>
                <li className={cx(["men","menu"])}><a href="#">women</a></li>
                <li className={cx("menu")}><a href="/productList/page1">sản phẩm</a></li>
                <li className={cx(["kids","menu"])}><a href="#">safe off</a></li>
                <li className={cx("menu")}><a href="#">customize</a></li>
                <li className={cx(["favorites","menu"])}><a href="#">favorites</a></li>
                <li className={cx("input-search")}> 
                    <label className={cx("search-label")} for="search">
                        <i className="ti-search"></i>
                    </label>  
                    <input  id={styles["search"]} type="text" className={cx("search-input")}  placeholder="Search"/>
                </li>
                    
                <li>
                    <button className={cx("user")}>
                    <i className="icon-user ti-user"></i>
                    </button>
                </li>

                <li>
                    <button className={cx("bag")}>
                    <i className="icon-bag ti-bag"></i></button>
                </li>
            </ul>


            <ul id={styles["nav"]}>
                <li className={cx("login")}>
                    <a href="" >
                        TÀI KHOẢN
                    </a>
                    <ul className={cx(["sub_nav","the_first"])}>
                        <li><a href="">ĐĂNG NHẬP</a></li>
                        <li><a href="">ĐĂNG KÝ</a></li>
                    </ul>
                </li>

                <li className={cx("cart_btn")}>
                    <div className={cx("header_cart-wrap")}>
                        <a href="/order" className={cx("header_cart")}>
                            GIỎ HÀNG
                            <FontAwesomeIcon className={cx('header_cart-icon')} icon={faCartShopping}/>
                        </a>
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




    