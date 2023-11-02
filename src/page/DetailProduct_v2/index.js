import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel';
import SelectActive from '../../components/SelectActive';
import Slider from '../../components/Slider';
import styles from './DetailProduct.module.scss'
import { toast } from 'react-toastify';
import axios from 'axios';
import {priceDiscount, formatPrice} from "../../common"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid  } from '@fortawesome/free-solid-svg-icons';



const cx = classNames.bind(styles)


function DetailProduct_v2() {
    const sizeValues = ['36', '37', '38', '39', '40', '41', '42', '43']
    const [product, setProduct] = useState({})
    const [trigger, setTrigger] = useState(false)
    
    const [quantity_Order, setQuantity_Order] = useState(1)
    // const [size_Order, setSize_Order] = useState(sizeValues[0])
    const [size_Order, setSize_Order] = useState("")
    

    let currentUrl = window.location.href;
    let param = currentUrl.split("?")[1]
    let paramToObject = JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')


    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+"/shoes/"+paramToObject._id)
        .then(res => {
            setProduct(res.data)
            console.log(res.data)
        })
        console.log(paramToObject)

    }, [trigger])



    const addCart = (id_product) => {
        let productAdd = {
            id: id_product,
            size: size_Order,
            quantity: quantity_Order
        }

        if(!Boolean(localStorage.getItem('cart'))) {
            localStorage.setItem('cart', JSON.stringify([]))
        }

        let product_list = JSON.parse(localStorage.getItem('cart'))

        // TÌM INDEX CỦA SẢN PHẨM ĐÓ MÀ CÙNG SIZE ĐÃ TỒN TẠI TRONG CART
        let indexProd = product_list?.findIndex(i => { return  i.size=== productAdd.size})
        
        let newCart = []
        if(indexProd !== -1) {
            // THÊM SỐ LƯỢNG VÀO SẢN PHẨM MÀ ĐÃ TỒN TẠI TRONG CART
            product_list[indexProd] = {...product_list[indexProd], quantity:product_list[indexProd].quantity+quantity_Order}
            console.log(product_list[indexProd])
            newCart = product_list
        }
        else {
            newCart = [...product_list, productAdd]
        }

        localStorage.setItem('cart', JSON.stringify(newCart));
        // console.log(JSON.parse(product_list))

    }

    const size_quantiry_select = product?.inventory?.find(i => i.size === size_Order)?.quantity
    
    let user = JSON.parse(localStorage.getItem('tokens')) || {}

    
    return (
        <div >
            <div className={cx("container")}>
                <div className={cx("container_rounter")}>
                    <ul className={cx("rounter")}>
                        <li><a href="#">Home</a></li>
                        <span> &#62; </span>
                        <li><a href="#">Shoes</a></li>
                        <span> &#62; </span>
                        <li><a href="#"><strong>{product.name}</strong></a></li>
                    </ul>
                </div>

                <div className={cx("row")}>
                    <div className={cx("row_grp1")}>
                        <div className={cx("container_imgs_shoe")}>
                            <img className={cx(["shoe_img", "_shoe"])} src={process.env.REACT_APP_BACKEND_URL+`/imgs/${product.img}`} alt="shoe image"/>
                        </div>
                    </div>

                    <div className={cx("row_grp2")}>
                        <div className={cx("container_details_shoe")}>
                            <div className={cx("information_product")}>
                                <p className={cx("shoe_name")}
                                >{product.name}</p>
                                <div className={cx("status")} style={{margin: "13px 0px"}}>
                                    <p className={cx("id")}>Mã sản phẩm: <strong>{product.id}</strong></p>
                                    <p className={cx("avalable")}>Tình trạng: <strong>Còn hàng</strong></p>

                                </div>
                                {
                                    !!product.price && 
                                    (
                                        product?.discount_id ?
                                        <>
                                            <p className={cx("shoe_price_old")}>{formatPrice(product.price)}</p>
                                            <p className={cx("shoe_price")}>{formatPrice(priceDiscount(product.price, product.discount_id))}</p>
                                            <span className={cx("discount_tag")}>-{product.discount_id}%</span>
                                        </>
                                        :
                                        <p className={cx("shoe_price")}>{formatPrice(product.price)}</p>
                                    )
                                    
                                }

                                {/* <p className={cx("shoe_price")}>{product.price}</p> */}
                            
                            </div>

                            <div className={cx(["line", "line2"])}></div>

                            <div id="description_shoes">
                                <p className={cx("description")}>{product.description}</p>
                            </div>

                            <div className={cx("line")}></div>
                            <div className={cx("option")}>
                                <div className={cx("size_product")}>
                                    <p className={cx("select")}>Size: </p>
                                    <ul className={cx("button_size")}>
                                        <SelectActive>
                                        {
                                            sizeValues.map((item, index) => {
                                                let quantitySize_select = product?.inventory?.find(i => i.size===item)

                                                return (
                                                    Number(quantitySize_select?.quantity) ?
                                                    <span key={index}
                                                        className={cx("btn_size")}
                                                        onClick={() => {
                                                            console.log(quantitySize_select)
                                                            setSize_Order(item)
                                                        }}
                                                    >
                                                        {item}
                                                    </span>
                                                    :
                                                    <span noActive className={cx(["btn_size", "noActive"])} onClick={() => {}}><span>x</span></span>
                                                )
                                                

                                            })
                                        }
                                        </SelectActive>
                                    </ul>
                                </div>
                                <div className={cx("quantity_product")}>
                                    <p className={cx("quantity")}>Số Lượng: </p>
                                    <div className={cx("wrapper")}>
                                        <span className={cx("minus")}
                                            onClick={() => {
                                                setQuantity_Order(pre => 
                                                    Boolean(pre===1) ? pre : pre-1
                                                )
                                            }}
                                        >-</span>
                                        <span className={cx("num")}>{quantity_Order}</span>
                                        <span className={cx("plus")}
                                            onClick={() => {
                                                setQuantity_Order(pre => {
                                                    
                                                    if(pre+1>size_quantiry_select) {
                                                        alert(`Không thể tăng thêm vì chỉ còn ${size_quantiry_select} sản phẩm của size này`)
                                                    }
                                                    return pre<size_quantiry_select ? pre+1 : pre

                                                })
                                                console.log(product.inventory.find(i => i.size === size_Order))
                                            }}
                                        >+</span>
                                    </div>

                                    <p className={cx("mess_quantity_prod")}>{size_quantiry_select < quantity_Order ? `Size của sản phẩm này không đủ số lượng mà bạn cần. Hiện có ${product?.inventory?.find(i => i.size === size_Order).quantity} sản phẩm` : ""}</p>

                                </div>
                            </div>

                            <div id="btn_grp">
                                <div className={cx("buy_btn_grp")}>
                                    <h2 className={cx("buy")}>MUA HÀNG</h2>
                                </div>

                                <div className={cx("buy_btn_grp")}>
                                    <h2 className={cx("buy")}>
                                        YÊU THÍCH {user?.favorite?.includes(product?.id) ?<FontAwesomeIcon icon={faHeartSolid}/>:<FontAwesomeIcon icon={faHeart}/>}
                                    </h2>
                                </div>
                
                                <div className={cx("add_btn_grp")}
                                    onClick={() =>{
                                        if(size_quantiry_select<quantity_Order) {
                                            toast.error("Sản phẩm không đủ số lượng", {
                                                autoClose: 2000,
                                                // theme: "colored",
                                                theme: "light",
                                                position: "bottom-right",
                                            })
                                        }
                                        else if(size_Order) {
                                            addCart(product.id)
                                            toast.success("Đã thêm vào gỏi hàng", {
                                                autoClose: 2000,
                                                theme: "colored",
                                                position: "bottom-right",
                                            })
                                        }
                                        else {
                                            toast.error("Vui lòng chọn size", {
                                                autoClose: 2000,
                                                theme: "colored",
                                                position: "bottom-right",
                                            })
                                        }
                                       
                                    }}

                                >
                                    <h2 className={cx("add")}>THÊM VÀO GIỎ HÀNG</h2>
                                </div>

                              
                            </div>
                        </div>
                    </div>
                </div>
                
                {
                    product.imgs && <Slider imgs={product?.imgs}/>
                }
                
                <div className={cx("line")}></div>
                <img className={cx('choose_size')} src={require('../../imgData/howto.png')} alt="shoe image"/>
                <img className={cx('choose_size')} src={require('../../imgData/chart_size.png')} alt="shoe image"/>
                <Carousel brand={product.brand_id} setTrigger={setTrigger}/>

            </div>




        </div>
    )
}

export default DetailProduct_v2;