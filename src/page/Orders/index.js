import classNames from "classnames/bind";
import styles from './Orders.module.scss'

import axios from "axios";
import { useContext, useEffect, useLayoutEffect ,useMemo, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import {toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faAddressBook, faCircleXmark, faCreditCard, faCreditCardAlt, faSpinner, faTrashCan, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {formatPrice, limit, priceDiscount} from "../../common"
import { createAxios } from "../../createInstance";
import { CartContext } from "../../App";

const cx = classNames.bind(styles)
const axiosJWT = createAxios()

function Orders() {



    const [user, setUser] = useState({})


    const [orderItem, setOrderItem] = useState([])
    const [check, setCheck] = useState(false)
    const [loading, setLoading] = useState(true)

    const [show, setShow] = useState(false);
    const [optionPay, setOptionPay] = useState("cod")
    const [errQuantity, setErrQuantity] = useState([])
    
    const [urlVNP, setUrlVNP] = useState("")

    const handleChange_payMent = (event) => {
        setOptionPay(event.target.value)
        // console.log(event.target.value)
        if(event.target.value === "credit") {
            axios.post(process.env.REACT_APP_BACKEND_URL+"/create_payment_url", {
                "amount":total,
                "language":"vn"
            })
            .then(res => {
                // console.log(res.data)
                setUrlVNP(res.data)
            })
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
   



    useEffect(() => {
        
        let cart = JSON.parse(localStorage.getItem('cart'))
        let cart_prod_id = cart.map(i => i.id).toString()

        axios.get(process.env.REACT_APP_BACKEND_URL+"/shoesList/"+cart_prod_id)
        .then(res => {

            let newCart = cart.map(item => {
                return {
                    ...item,
                    "product": res.data.find(i => i.id === item.id)
                }
            })

            setOrderItem(newCart.sort(function(a, b){return a.id - b.id}))
            setLoading(false)
        })


    }, [check])

    const [trigger, setTrigger] = useState(false)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("tokens"));
        setUser(user)
        console.log(user)
    }, [trigger])


    const total = useMemo(() => {
        let result = orderItem.reduce((pre, cur) => {
            return pre + priceDiscount(cur?.product?.price, cur?.product?.discount_id) * cur.quantity
        }, 0)
        // console.log(result)
        return result
    })

    const total_reduce = useMemo(() => {
        let result = orderItem.reduce((pre, cur) => {
            return pre + cur?.product?.price * (cur?.product?.discount_id/100) * cur.quantity

        }, 0)
        // console.log(result)
        return result
    })

    // console.log({total,total_reduce})

    const handleOrder = (data) => {

        // ...loading
        // logic tài khoản bị khóa thì không thể đặt hàng

        if(!user.lock) {

            let checkQuantity = orderItem.every(i => i.quantity == 0)
            console.log(checkQuantity)
    
           if(!checkQuantity) {
                handleShow()
           }
        }
        else {
            alert("Tài khoản của bạn bị khóa không thể đặt hàng")
            console.log('block')
        }

        localStorage.setItem("tokens", JSON.stringify({...user, address:data.address, description:data.description}))
        

    }

    const schema = yup.object().shape({
        description: yup.string(),
        address: yup.string().required(),

    }).required();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const ComponentRequire = () => {
       return <span className={cx('err_messagge')}>bạn phải điền mục này</span>
    }

    const handlePay = (data) => {
        if(optionPay === "cod") {
            const user = JSON.parse(localStorage.getItem("tokens"))

            const order = {
                "client_id" : user.accName,
                "description": data.description,
                "address": data.address,
                "products": orderItem.filter(i => i.quantity!=0).map(prod => ({
                    "product_id": prod.id,
                    "size": prod.size,
                    "quantity": prod.quantity
                }))
            }

            axiosJWT.post(process.env.REACT_APP_BACKEND_URL+'/orders', order, {
                headers: {Authorization: user.accessToken}
            })
            .then(res => {
                if(res.data.status) {
                    toast("Đặt hàng thành công", {
                        theme: "light",
                        position: "top-center",
                    })
                }
                else {
                    setErrQuantity(res.data.message)
                    toast.error("Không đủ sản phẩm có sẵn, Vui lòng kiểm tra lại giỏ hàng", {
                        theme: "light",
                        position: "top-center",
                    })
                }
                console.log(res)
            })
            .catch(err => {
                toast("Đặt hàng thất bại", {
                    theme: "light",
                    position: "top-center",
                })
                console.log(err)
            })
    
            console.log(order)

        }
    }

    const [addressList, setAddressList] = useState([])

    useEffect(() => {
        const userInfor = JSON.parse(localStorage.getItem("tokens"))
        axios.get(process.env.REACT_APP_BACKEND_URL+`/addresses/${userInfor?.accName}`)
        .then(res => {
            setAddressList(res.data)
            console.log(res.data)
        
        })

        
    }, [trigger])

    

    


    //Add address

    const [addAddress, setAddaddress] = useState('');
   
   const [iconAddaddress, setIconAddaddress] = useState(false);
   const [loadIcon1, setLoadicon1] = useState(false);

   const [loadIcon2, setLoadicon2] = useState(false);


    const handleAddaddress = (value) => {
        setLoadicon1(true);
        setIconAddaddress(false);
        const userInfor = JSON.parse(localStorage.getItem("tokens"))
        refinputAddress.current.focus();
        axios.post(process.env.REACT_APP_BACKEND_URL+`/addresses` ,
        {
          
            addressName : value,
            accName: userInfor.accName
          
        }) 
        .then(()=>{
            setLoadicon1(false);
            setIconAddaddress(true);
            refinputAddress.current.value = ''
        })
      
        setTrigger(pre => !pre)
       
    }
    const refinputAddress=useRef();
    const refinputSelect = useRef();
    useLayoutEffect(() => {
        if (addAddress !== '') {
            setIconAddaddress(true);
        } else {
            setIconAddaddress(false);
        }
    }, [addAddress]);

    // console.log(addAddress)


    //Delete address
    const [iconDel, setIcondel] = useState(true)
    
    const handleDelAddress = (data) => {
        setLoadicon2(true);
        setIcondel(false);

        const idDel = data.address;
        
        axios.delete(process.env.REACT_APP_BACKEND_URL+`/addresses/${idDel}`)
        

        .then(() => {
        setLoadicon2(false);
        setIcondel(true);
       
      
        })
        setTrigger(pre => !pre)
            console.log(idDel)
  
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
                            <span>(<span className={cx("count_item")}> {orderItem.length} </span>sản phẩm)</span>
                        </div>

                        
                    {
                        !!errQuantity.length && 
                        <div className={cx("err_quantity_order")}>
                            <p>* Thông báo: không đủ số lượng để bạn đặt hàng</p>
                            <p>Bạn vui lòng kiểm tra thông tin giỏ hàng với những thông tin dưới đây</p>
                        {
                            errQuantity.map(mess => <p key={mess.message}>{orderItem.find(prod => prod.product.id===mess.product_id)?.product?.name} {mess.message}</p>)
                        }
                        </div>
                    }
                        

                        <div className={cx("content_description")}>
                            <div className={cx("content_production_left")}>
                               
                            {
                                loading ?
                                <PacmanLoader className="my-5" 
                                    color="#ebe261"
                                    size={70}
                                />
                                :
                                orderItem.map((item, index) => <Item_order setCheck={setCheck} order={item} key={item.id+item.size} index={index}/>)

                            }

                            </div>

                            <div className={cx("content_payment_right")}>
                                <div className={cx("content_payment_wrapper")}>
                                    <div className={cx("each_row")}>
                                        <div className={("box_stylcxe fee")}>
                                            <p className={cx("list_into_price")}>
                                                <span style={{fontWeight: 500, fontSize:14}}>Tạm tính: </span>
                                                <p className={cx("price_produccxt box_1")}>{formatPrice(total)}</p>
                                            </p>
                                        </div>
                                        <div className={cx("box_style")}>
                                            <p className={cx("list_into_price")}>
                                                <span style={{marginTop: 5, fontWeight:500, fontSize:14}}>Thành tiền :</span>
                                                <p className={cx(["price_product", "box_2"])}>{formatPrice(total)}</p>
                                            </p>
                                            <p>Tiết kiệm: {formatPrice(total_reduce)}</p>
                                        </div>
                                        <button className={cx("btn_payment")}
                                            onClick={(e) => {
                                                const user = JSON.parse(localStorage.getItem("tokens"))
                                                if(!user.status) {
                                                    alert("Hãy đăng nhập để mua hàng")
                                                    navigate("/signin")
                                                }

                                                handleSubmit(handleOrder)(e)
                                                
                                            }}
                                        >Thanh toán ngay</button>
                                        <Link to={`/shoes?_page=1&_limit=${limit}`} >
                                            <button className={cx("btn_continue_shopping")}>Tiếp tục mua hàng</button>
                                        </Link>
                                        
                                        {
                                            orderItem.some(i => i.quantity == 0) && <p className="text-danger">Vui lòng kiểm tra giỏ hàng. có sản phẩm với số lượng là 0</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('fillOut_infor')}>
                    <h1>thông tin người nhận</h1>
                    
                
                    <div className={cx('input_infor')}>
                        <label>địa chỉ:</label>
                        {/* <input id="input_5" {...register("address")}/> 
                        {
                            errors.address && <ComponentRequire/>
                        } */}
                        {/* <p>Tỉnh/Thành phố, Quận/Huyện, Phường/Xã</p> */}

                        <div style={{display:"flex", alignItems:"center", height:"42px", position:"relative"}}>
                            <select className={cx('select_address')} {...register("address")}>
                            {
                                addressList?.map(i => <option ref={refinputSelect}  key={i.id} value={i.id}>{i.addressName}</option>)
                            }
                            </select>
                            {iconDel && <button onClick={(e)=>{handleSubmit(handleDelAddress)(e)}}><FontAwesomeIcon style={{height:"24px", marginTop:5, color: "#8c8c8c"}} icon={faTrashCan} /></button>}
                             
                            {loadIcon2 && <FontAwesomeIcon className={cx("loading2")} icon = {faSpinner}/>}

                        </div>

                               
                        {/* <button onClick={(e)=>{handleSubmit(handleLogAddress)(e)}}>Test</button> */}

                       <div  style={{display:"flex", height:"80px", position:"relative"}}>
                           <div style={{display:"flex", flexDirection:"column",
                             marginRight:"8px",
                             gap:"4px",}}>
                               <label htmlFor="addAddress">Thêm địa chỉ:</label>
        
                               <input className={cx("input-add-address")} placeholder="Địa chỉ mới" style={{ 
                                paddingLeft:4,
                                paddingRight:4,
                                borderColor: "#cdcdcd",
                                value:{addAddress}
                                }}
                                ref={refinputAddress}
                                onChange={(e) => {
                                    setAddaddress(e.target.value)
                                    
                                }}
                                 id="addAddress"/>
                           </div>
    
                            {iconAddaddress && <button style={{ position:"relative", }} onClick={()=>{
                                handleAddaddress(addAddress)}}> <FontAwesomeIcon style={{ position:"absolute",bottom:"18px", height:'24px', color: "#8c8c8c"}} icon={faAddressBook} /> 
                              
                                 </button>}

                                  { loadIcon1 && <FontAwesomeIcon className={cx("loading1")} icon = {faSpinner}/>}
                       </div>

                       <div style={{display:"flex", flexDirection:"column", gap:"4px", width:"300px"}}>
                        <label htmlFor="input_4">Ghi Chú:</label>
                            <div>
                                <textarea style={{
                                    paddingLeft:4,
                                    paddingRight:4,
                                   
                                    }}  id="input_4"
                                {...register("description")}
                                />
                            </div>
                        
                    </div>
                                       
                    </div>

                    
                </div>

            </div>


            <Modal show={show} onHide={handleClose}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('modal_pay')}>
                        <div className={cx('option_pay')}>
                            <h2 >PHƯƠNG THỨC GIAO HÀNG</h2>
                            <div className={cx('inputPay')}>
                                <input type="radio" name="" checked="checked" onChange={()=>{}}/>
                                Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc)

                                <span className={cx('title')} title="Tuỳ vào địa chỉ giao hàng mà tốc độ giao hàng tiêu chuẩn sẽ khác nhau. Chúng tôi luôn cố gắng để đơn hàng đến tay bạn sớm nhất.">?</span>
                                <span>0 VNĐ</span>
                            </div>

                            <h2 >PHƯƠNG THỨC THANH TOÁN</h2>
                            <div className={cx('inputPay')}>
                                <input type="radio" name="option" 
                                    value="cod"
                                    checked={optionPay === 'cod'}
                                    onChange={handleChange_payMent}
                                    id="cod"
                                />
                                <label htmlFor="cod">Thanh toán trực tiếp khi giao hàng</label>
                                
                                <span  className={cx('title')} title="Là phương thức thanh toán bằng tiền mặt trực tiếp khi nhận hàng">?</span>
                                <FontAwesomeIcon className={cx('icon')} icon={faTruckFast}/>

                            </div>
                            <div className={cx('inputPay')}>
                                <input type="radio" name="option"
                                    value="credit"
                                    checked={optionPay === 'credit'}
                                    onChange={handleChange_payMent}
                                    id="credit"
                                />
                                <label htmlFor="credit">Thanh toán bằng Thẻ quốc tế / Thẻ nội địa / QR Code</label>
                                
                                <span className={cx('title')} title="Phương thức thanh toán sử dụng các loại thẻ quốc tế như Visa, Master, JCB,… hoặc các loại thẻ thanh toán nội địa (ATM) hoặc thanh toán bằng QR ngân hàng hoặc ví điện tử. Vui lòng đọc kĩ các cam kết thanh toán khi chọn phương thức này. Phí thanh toán đối với phương thức này hiện là 1% trên tổng giá trị giao dịch.">?</span>
                                <FontAwesomeIcon className={cx('icon')} icon={faCreditCard}/>

                            </div>
                            <div className={cx('inputPay')}>
                                <input type="radio" name="option"
                                    value="momo"
                                    checked={optionPay === 'momo'}
                                    onChange={handleChange_payMent}
                                    id="momo"
                                />
                                <label htmlFor="momo">Thanh toán bằng ví MoMo</label>
                                <span className={cx('title')} title="Phương thức dành cho khách hàng có tài khoản và lựa chọn thanh toán qua ví điện tử MoMo. Vui lòng đọc kĩ các cam kết về phương thức này trước khi quyết định. Phí thanh toán đang được áp dụng là 1% trên tổng thanh toán.">?</span>
                                <img src={require('./MoMo_Logo.png')}/>
                            </div>
                            <h3>Địa chỉ: {
                                addressList.find(address => address.id ==  JSON.parse(localStorage.getItem("tokens")).address)?.addressName ||  addressList[0].addressName
                             }</h3>
                            <p className='text-danger'>{optionPay === "momo" && <span>Hiện chưa có phương thức này</span>} </p>

                        </div>
                        <div className={cx('total')}>
                            <h1>ĐƠN HÀNG</h1>
                            <div className={cx('infor_fee')}>
                                <span>Đơn hàng</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div className={cx('infor_fee')}>
                                <span>Gỉam</span>
                                <span>-{formatPrice(total_reduce)}</span>
                            </div>
                            <div className={cx('infor_fee')}>
                                <span>Phí vận chuyển</span>
                                <span>0 VND</span>
                            </div>
                            <div className={cx('infor_fee')}>
                                <span>Phí thanh toán</span>
                                <span>0 VND</span>
                            </div>

                            <div className={cx(['infor_fee','end_col'])}>
                                <span>TỔNG CỘNG</span>
                                <span className={cx('final_price')}>{formatPrice(total)}</span>
                            </div>
                        {
                            optionPay === "credit" ?
                            <a className={cx('compleOrder_btn')} href={urlVNP}>HOÀN TẤT ĐẶT HÀNG (VNP)</a>
                            :
                            <button 
                                onClick={(e) => {
                                    handleSubmit(handlePay)(e)
                                    handleClose()
                                }}
                                className={cx('compleOrder_btn')}
                            >HOÀN TẤT ĐẶT HÀNG</button>
                        }

                           
                        </div>
                        
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
               
                </Modal.Footer>
            </Modal>

            
       
    </div>
    );
}


function Item_order({order, setCheck}) {
    const cart_context = useContext(CartContext);

    const [quantity, setQuantity] = useState(order.quantity)

    const modifyQuantity = (add) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        // tìm ra sản phẩm đang select
        let tmp = cart.find(i => i.id === order.id && i.size === order.size)

        // lấy ra array mà k có sản phẩm đang select
        cart = cart.filter(i => i.id + i.size !== order.id + order.size)
        
        // console.log(tmp)
        // console.log(cart)

        let quantityUpdate = order.quantity
        if(add) {
            setQuantity(pre =>{ 
                return pre+1
            })
            quantityUpdate +=1 
        }
        else {
            if(quantity>=1) {
                setQuantity(pre => pre-1)
                quantityUpdate -=1 
            }
        }
        // console.log(quantityUpdate)

        let newCart = [...cart, {...tmp, "quantity":quantityUpdate}].sort(
            function(a, b){
                return a.id*Number(a.size) - b.id*Number(b.size)
                //  lấy id x size để cố định số index trên item component khi thay đổi số lượng sản phẩm
                //  việc thay đổi số lượng làm set lại card bằng toán tử ..., các phầm tử array sẽ thay đổi vị trí

            }
        )
        localStorage.setItem('cart', JSON.stringify(newCart))
        console.log(newCart)

        setCheck(pre => !pre)
        
    }

    const [size, setSize] = useState(order?.size)

    const handleChangeSize = (product, size) => {
        let cart = JSON.parse(localStorage.getItem('cart'))

       

        // tìm ra sản phẩm đang select
        let tmp = cart.find(i => i.id === product.id && i.size === product.size)

        // lấy ra array mà k có sản phẩm đang select
        cart = cart.filter(i => i.id + i.size !== product.id + product.size)
        cart.push({...tmp, size:size})

        let cart_sort = [...cart].sort(
            function(a, b){
                return a.id*Number(a.size) - b.id*Number(b.size)
                //  lấy id x size để cố định số index trên item component khi thay đổi số lượng sản phẩm
                //  việc thay đổi số lượng làm set lại card bằng toán tử ..., các phầm tử array sẽ thay đổi vị trí

            }
        )
        localStorage.setItem('cart', JSON.stringify(cart_sort))
        setCheck(pre => !pre)


    }

    const sizeValues = ['36', '37', '38', '39', '40', '41', '42', '43']

    
    return (
        <div className={cx("content_description_wrapper")}>
            {/* <i className="ti-close remove_product"></i> */}
            <Link to={`/shoes/detail_product?_id=${order?.product?.id}`} className={cx("content_description_left")}>
                <img src={process.env.REACT_APP_BACKEND_URL+`/imgs/${order?.product?.img}`} alt="" className={cx("content_product")}/>
            {
                order?.product?.inventory?.find(i => i.size === order.size).quantity === 0 
                && 
                <div className={cx("soldOut_mess")}><span>HẾT HÀNG</span></div>
            }
            </Link>
            <div className={cx("content_description_right")}>
                <div className={cx("product_name_and_remove")}>
                    <Link to={`/shoes/detail_product?_id=${order?.product?.id}`}>
                        <p className={cx("content_description_name")}>{order?.product?.name}</p>
                    </Link>
                    
                    {/* <p>Size {order.size}</p> */}
                    <span>Size: </span>
                    <select
                        value={size}
                        onChange={(e) => {
                            let cart = JSON.parse(localStorage.getItem('cart'))

                             // xử lý nếu trùng size với cùng là 1 sản phẩm (giỏ hàng có 2 sản phẩm mã giống nhưng khác size)
                            if( cart.map(i=>i.id+i.size).includes(order?.id+e.target.value) ) {
                                toast.error(`Sản phẩm ${order?.product?.name} size ${e.target.value} đã tồn tại trong giỏ hàng`, {
                                    position: "top-center",
                                })
                            }
                            else {
                                setSize(e.target.value)
                                handleChangeSize(order, e.target.value)
                            }
                           
                        }}
                    >
                    {
                        sizeValues.map(i => <option key={i} value={i}>{i}</option>)
                    }
                    </select>
                </div>
            {
                order?.product?.discount_id ?
                <div>
                    <p className={cx("shoe_price_old")}>{formatPrice(order?.product?.price)}</p>
                    <p className={cx("shoe_price_new")}>{formatPrice(priceDiscount(order?.product?.price, order?.product?.discount_id))}</p>
                    <span className={cx("discount_tag")}>-{order?.product?.discount_id}%</span>
                </div>

                :
                <p className={cx("content_description_cost")}>{formatPrice(order?.product?.price)}</p>
            }

                {/* <p className={cx("content_description_cost")}>{formatPrice(order?.product?.price)}</p> */}
                
                <div id={styles["content_quantity_product_3"]} className={cx('quantity_delete')}>
                    <div className={cx("wrapper")}>
                        <span className={cx("minus")}
                            onClick={() => {
                                modifyQuantity()
                            }}
                        >-</span>
                        <span className={cx("num")}>{quantity}</span>
                        <span className={cx("plus")}
                            onClick={() => {
                                modifyQuantity(true)
                            }}
                        >+</span>
                    </div>
                    <button className={cx('delete_btn')}
                        onClick={() => {
                            let cart = JSON.parse(localStorage.getItem('cart'))
                            cart = cart.filter(i => i.id + i.size !== order.id + order.size)
                            localStorage.setItem('cart', JSON.stringify(cart))
                            cart_context.setCart_context(pre => !pre)
                            setCheck(pre => !pre)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </button>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Orders;