import classNames from "classnames/bind";
import styles from './Orders.module.scss'

import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const cx = classNames.bind(styles)

function Orders() {

    const [orderItem, setOrderItem] = useState([])
    const [check, setCheck] = useState(false)

    const [name_customer, setName_customer] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')






    useEffect(() => {
        
        axios.get("http://localhost:4000/data")
        .then(res => {
            let cart = JSON.parse(localStorage.getItem('cart'))
            let newCart = cart.map(item => {
                return {
                    ...item,
                    "product": res.data.filter(i => item.id === i.id)[0]
                }
            })
            setOrderItem(newCart.sort(function(a, b){return a.id - b.id}))
            // console.log(newCart)
        })

    }, [check])

    const toNumber = (str) => {
        let tmp = ""
        for(let i of str) {
            if(Number(i) || Number(i)===0) tmp += i
        }

        return Number(tmp)
    }

    const total = useMemo(() => {
        let result = orderItem.reduce((pre, cur) => {
            return pre + toNumber(cur.product.price) * cur.quantity
        }, 0)

        return Number(result).toLocaleString('vi', {style : 'currency', currency : 'VND'})
    })

    const handleOrder = () => {
        const order = {
            "status": false,
            "name": name_customer,
            "phone_number": phoneNumber,
            "email": email,
            "description": description,
            "address": address,
            "date_order": handleDate(new Date()),
            "amount": total,
            "products": orderItem
        }


        console.log(order)
        axios.post('http://localhost:4000/orders', order)

    }

    const handleDate = (d,type) => {

        let today = d;
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        // let date = 
        if(type==="not")
            return dd+mm+yyyy
        if(type==="mdy")
            return mm + '/' + dd + '/' + yyyy

        return dd + '/' + mm + '/' + yyyy
    }


    return ( 
        <div id={styles["wrapper"]}>
                       
            <div className={cx("content")}>
                <div className={cx("content_container")}>
                    <div className={cx("content_nav")}>
                        <a href="" className={cx("content_home_page")}>Trang chủ</a>
                        <i className="ti-angle-right content_nav_icon"> - </i>
                        <p className={cx("content_home_page_name")}>Giỏ hàng</p>
                    </div>
                    <div className={cx("content_main_shopping_cart")}>
                        <div className={cx("content_header")}>
                            <h1 className={cx("lbl_shopping_cart")}>
                            Giỏ hàng     
                            </h1>
                            <span>
                                (
                                    <span className={cx("count_item")}> {orderItem.length} </span>
                                sản phẩm)
                            </span>
                        </div>
                        <div className={cx("content_description")}>
                            <div className={cx("content_production_left")}>
                                {/* <Item_order order={orderItem[0]}/> */}
                                {/* <Item_order/>
                                <Item_order/> */}
                            {
                                orderItem.map((item, index) => <Item_order setCheck={setCheck} order={item} key={index}/>)
                            }

                            </div>

                            <div className={cx("content_payment_right")}>
                                <div className={cx("content_payment_wrapper")}>
                                    <div className={cx("each_row")}>
                                        <div className={("box_stylcxe fee")}>
                                            <p className={cx("list_into_price")}>
                                                <span style={{fontWeight: 500, fontSize:14}}>Tạm tính: </span>
                                                <p className={cx("price_produccxt box_1")}>
                                                {
                                                    total
                                                }
                                                </p>
                                            </p>
                                        </div>
                                        <div className={cx("box_style")}>
                                            <p className={cx("list_into_price")}>
                                                <span style={{marginTop: 5, fontWeight:500, fontSize:14}}>Thành tiền:  </span>
                                                <p className={cx(["price_product", "box_2"])}>{total}</p>
                                            </p>
                                        </div>
                                        <button className={cx("btn_payment")}
                                            onClick={handleOrder}
                                        >Thanh toán ngay</button>
                                        <a href="/productList/page1" >
                                            <button className={cx("btn_continue_shopping")}>Tiếp tục mua hàng</button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className={cx('fillOut_infor')}>
                <h1>thông tin người nhận</h1>
                <div className={cx('input_infor')}>
                    <label htmlFor="input_1">họ tên</label><span>:</span>
                    <input id="input_1"
                        onChange={(e) => setName_customer(e.target.value)}
                    />
                </div>
                <div className={cx('input_infor')}>
                    <label htmlFor="input_3">email</label><span>:</span>
                    <input id="input_3"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cx('input_infor')}>
                    <label htmlFor="input_2">số điện thoại</label><span>:</span>
                    <input id="input_2"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className={cx('input_infor')}>
                    <label htmlFor="input_5">địa chỉ</label><span>:</span>
                    <input id="input_5"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className={cx('input_infor')}>
                    <label htmlFor="input_4">ghi chú</label><span>:</span>
                    <textarea id="input_4"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
       
    </div>
    );
}


function Item_order({order, setCheck}) {

    const [quantity, setQuantity] = useState(order.quantity)

    const modifyQuantity = (add) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let tmp = cart.find(i => i.id === order.id)
        cart = cart.filter(i => i.id !== order.id)
        
        let para_add = add ? 1 : -1
        let newCart = [...cart, {...tmp, "quantity":quantity+para_add}].sort(function(a, b){return a.id - b.id})
        console.log(newCart)
        console.log(tmp)

        localStorage.setItem('cart', JSON.stringify(newCart))
        setCheck(pre => !pre)
    }

    useEffect(() => {
    }, [])
    
    return (
        <div className={cx("content_description_wrapper")}>
            <i className="ti-close remove_product"></i>
            <a href="" className={cx("content_description_left")}>
                <img src={require(`../../imgData/${order.product.img}`)} alt="" className={cx("content_product")}/>
                {/* <img src={require('../../imgData/shoe-removebg-preview.png')} alt="" className={cx("content_product")}/> */}
            </a>
            <div className={cx("content_description_right")}>
                <div className={cx("product_name_and_remove")}>
                    <p className={cx("content_description_name")}>{order.product.name}</p>
                    <p className={cx("remove_product_item")}
                        onClick={() => {
                            let cart = JSON.parse(localStorage.getItem('cart'))
                            cart = cart.filter(i => i.id !== order.id)
                            localStorage.setItem('cart', JSON.stringify(cart))
                            setCheck(pre => !pre)
                        }}
                    >Xóa</p>
                </div>
                <p className={cx("content_description_cost")}>{order.product.price}</p>
                <div id={styles["content_quantity_product_3"]}>
                    <div className={cx("wrapper")}>
                        <span className={cx("minus")}
                            onClick={() => {
                                if(quantity>1)
                                    setQuantity(pre => pre-1)
                                modifyQuantity()
                            }}
                        >-</span>
                        <span className={cx("num")}>{quantity}</span>
                        <span className={cx("plus")}
                            onClick={() => {
                                setQuantity(pre => pre+1)
                                modifyQuantity(true)
                                
                            }}
                        >+</span>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Orders;