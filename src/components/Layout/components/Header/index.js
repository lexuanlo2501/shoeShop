import classNames from "classnames/bind";
import styles from './Header.module.scss'

import axios from "axios";
import { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch, faBars, faClose, faUser, faRightFromBracket, faHeart, faHome, faPercent, faBell, faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css'; // optional

import Tippy from '@tippyjs/react/headless';
import { formatPrice, limit } from "../../../../common";
import { faShopify } from "@fortawesome/free-brands-svg-icons";
import { createAxios } from "../../../../createInstance";
import { CartContext } from "../../../../App";




const cx = classNames.bind(styles)

function Header({setRe_render}) {
    //Category
    const [apiCategory, setApicategory] = useState([]);
useEffect(()=> {
    axios.get('http://localhost:5000/category')

    .then((data) => {
            if(data.status === 200) {
                setApicategory(data.data);
                console.log(apiCategory);
            }
       
    })
},[])
 
       
 
    const [orderItem, setOrderItem] = useState([])
    const [notify, setNotify] = useState([])

    const [trigger, setTrigger] = useState(false)
    const [login, setLogin] = useState("")

    const token = localStorage.getItem("tokens");

    const navigate = useNavigate();


    const cart_123 = useContext(CartContext);

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

        
    }, [cart_123.cart_context])

    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let cart_prod_id = cart.map(i => i.id).toString()
        if(JSON.parse(token).status) {
            axios.get(process.env.REACT_APP_BACKEND_URL+"/notify?_accName="+JSON.parse(token).accName)
            .then(res => {
                setNotify(res.data)
            })
        }
        else {
            axios.get(process.env.REACT_APP_BACKEND_URL+"/notify?_accName=all")
            .then(res => {
                setNotify(res.data)
            })
        }
    }, [trigger])

    useEffect(() => {
        if(!token) {
            localStorage.setItem("tokens", JSON.stringify({}));
        }
        // console.log( (JSON.parse(token)) )
        setLogin(JSON.parse(token)?.role)
    }, [])

    const handleDelete_notify = (id) => {
        axios.delete(process.env.REACT_APP_BACKEND_URL+"/notify/"+id)
    }


    let axiosJWT = createAxios()

    const handleLogout = async () => {
        try {
            const infor_user = JSON.parse(localStorage.getItem("tokens"))
            await axiosJWT.post(process.env.REACT_APP_BACKEND_URL+"/logout/"+ infor_user.accName, 25,{
                headers: {Authorization: infor_user.accessToken}
            })
    
            localStorage.setItem("tokens", JSON.stringify({}));
            navigate("/signin")

    
        }
        catch(err) {
            console.log(err)
        }

    }

    return ( 
        <div className={cx('wrapper')}>

           <div className={cx('above')}>
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
                            trigger="click" interactive placement="bottom-end"	
                            render={attrs => (
                                <div className={cx(["wapper_notify", "shape_Tippy"])}  tabIndex="-1" {...attrs}>
                                {!notify.length && <h2 className="text-center">Không có thông báo nào</h2>}
                                {
                                    notify.map(i => (
                                        <div className={cx("notify_item")} key={i.id}>
                                            <div>
                                                <h3>{i.name}</h3>
                                                <p>{i.date}</p>
                                                <button
                                                    onClick={() => {
                                                        handleDelete_notify(i.id)
                                                        setTrigger(pre => !pre)
                                                        console.log("delete")
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faClose}/>
                                                </button>
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
                            
                            <li className={cx(['favorite'])}>
                                <Link to={`/shoes?_favorite=true&_page=1&_limit=${limit}`}
                                    onClick={() => {
                                        window.scrollTo(0, 0)
                                        setRe_render(pre => !pre)
                                        
                                    }}
                                >
                                    <FontAwesomeIcon className={cx("btn_header")} icon={faHeart}/>
                                </Link>
                            </li>
                            <li className={cx(['avatar'])}>
                                <Tippy
                                    trigger="click"
                                    interactive
                                    placement="bottom-end"	
                                    render={attrs => (
                                        <div className={cx(['menu_avatar', "shape_Tippy"])} tabIndex="-1" {...attrs}>
                                            <ul>
                                                <li onClick={(e) => {window.scrollTo(0, 0)}}>
                                                    <Link to='/infor' >Thông tin cá nhân</Link>
                                                </li>
                                                <li onClick={(e) => {window.scrollTo(0, 0)}}>
                                                    <Link to='/purchaseOrder'>Đơn mua</Link>
                                                </li>
                                                {/* <li
                                                    onClick={() => {
                                                        localStorage.setItem("tokens", JSON.stringify({}));
                                                        navigate("/signin")
                                                    }}
                                                >
                                                    Đăng xuất
                                                    <FontAwesomeIcon className={cx('logout_icon')}  icon={faRightFromBracket}/>
                                                </li> */}
    
                                                <li onClick={handleLogout}>
                                                    Đăng xuất
                                                    <FontAwesomeIcon className={cx('logout_icon')}  icon={faRightFromBracket}/>
                                                </li>
    
                                            </ul>
                                        </div>
                                    )}
                                >
                                    <button >
                                        <FontAwesomeIcon className={cx(["btn_header"])}  icon={faUser}/>
                                    </button>
                                </Tippy>
                            </li>
                        </>
                        :
                        <li className={cx("login")}>
                            <span  >
                                TÀI KHOẢN
                            </span>
                            <ul className={cx(["sub_nav","the_first","shape_Tippy"])}>
                                <li><Link to="/signIn">ĐĂNG NHẬP</Link></li>
                                <li><Link to="/signUp">ĐĂNG KÝ</Link></li>
                            </ul>
                        </li>
                    }
                    
    
                    <li className={cx(["cart_btn"])}>
                        <div className={cx("header_cart-wrap")}>
                            <Link to="/order" className={cx("header_cart")}>
                                <FontAwesomeIcon className={cx(["btn_header"])} icon={faCartShopping}/>
                            </Link>
                            {/* <span className={cx("header_cart-notice")}>{orderItem.length}</span> */}
                            <span className={cx("header_cart_quantity")}><span>{orderItem.length}</span></span>
    
                        {/* {
                            Boolean(orderItem.length) && <span className={cx("header_cart-notice")}></span>
                        } */}
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

           <div className={cx('category')}>
              <div className={cx('category_items')}>
              {apiCategory.map((item) =>(
                     <button className={cx('category_button')} key={item.id}>{item.name} <FontAwesomeIcon icon={faCaretDown}/>
                      <div className={cx('category_menu')}>
           
                               <div className={cx('category_list')}>
                               {item.name === 'Giày' && (<ul>
                                <Link to={`/shoes?_page=1&_limit=16&_category=${item.id}`} className={cx('link_btn_view_all')}  
                                onClick={() => {
                                window.scrollTo(0, 0)
                                setRe_render(pre => !pre)
                                
                            }}>Xem tất cả</Link>{ item.detail.map(item => (<li><Link to={`/shoes?_page=1&_limit=16&_type=${item.id}`} className={cx('category_item_button')} 
                            onClick={() => {
                                window.scrollTo(0, 0)
                                setRe_render(pre => !pre)
                                
                            }} >{item.type_name} </Link></li>))}</ul>) }
                               
                                {item.name==='Quần Áo' &&  
                                <div className={cx('block_clothes')}>
                                    <ul>
                                    <h2 className={cx('block_clothes_header')}>Áo</h2>
                                    
                                            {item.detail.map(item =>item.type_name.startsWith('Áo') && (
                                            <div>
                                                <li><Link to={`/shoes?_page=1&_limit=16&_type=${item.id}`} onClick={() => {
                                        window.scrollTo(0, 0)
                                        setRe_render(pre => !pre)
                                        
                                    }}  className={cx('category_item_button')}>{item.type_name} </Link></li></div>))}
                                    </ul>
                                    
                                    <ul>
                                    <h2 className={cx('block_clothes_header')}>Quần</h2>
                                
                                    {item.detail.map(item =>item.type_name.startsWith('Quần') &&  
                                        <li><Link to={`/shoes?_page=1&_limit=16&_type=${item.id}`}
                                        onClick={() => {
                                            window.scrollTo(0, 0)
                                            setRe_render(pre => !pre)
                                            
                                        }}
                                         className={cx('category_item_button')}>            
                                            { item.type_name}
                                            </Link></li>
                                    )}
                                    </ul>
                              
                                    <ul>
                                        <li><Link to={`/shoes?_page=1&_limit=16&_category=${item.id}`}
                                    onClick={() => {
                                        window.scrollTo(0, 0)
                                        setRe_render(pre => !pre)
                                        
                                    }}  className={cx('link_btn_view_all')}>Xem tất cả</Link ></li>
                                    </ul>
                             </div>}

                               {item.name==='Phụ Kiện'  && (
                                <ul>
                                    <Link to={`/shoes?_page=1&_limit=16&_category=${item.id}`} onClick={() => {
                                        window.scrollTo(0, 0)
                                        setRe_render(pre => !pre)
                                        
                                    }}  className={cx('link_btn_view_all')}>Xem tất cả </Link>
                               {item.detail.map(item => (<li><Link
                               to={`/shoes?_page=1&_limit=16&_type=${item.id}`} onClick={() => {
                                window.scrollTo(0, 0)
                                setRe_render(pre => !pre)
                                
                            }}  className={cx('category_item_button')}>{item.category_id===3 && item.type_name}</Link></li>))}
                                </ul>
                               )}
                               </div>
                      </div>
              </button>
              ))}
             
              </div>
           </div>
           
            

        </div>
    );
}

function CartItem_subnav({order}) {
    return (
        <li className={cx("header_cart-item")}>
            {/* <img src={require(`../../../../imgData/${order.product.img}`)} alt="dd" className={cx("header_cart-img")}/> */}
            <img src={process.env.REACT_APP_BACKEND_URL+`/imgs/${order?.product?.img}`} alt="img" className={cx("header_cart-img")}/>
            
            
            {/* <i className={cx("header_cart-icon-close")}>x</i> */}
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




    