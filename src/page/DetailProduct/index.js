import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel';
import SelectActive from '../../components/SelectActive';
import Slider from '../../components/Slider';
import styles from './DetailProduct.module.scss'
import { toast } from 'react-toastify';

const cx = classNames.bind(styles)

function DetailProduct({product}) {
    const sizeValues = ['36', '37', '38', '39', '40', '41', '42', '43']

    
    const [quantity_Order, setQuantity_Order] = useState(1)
    const [size_Order, setSize_Order] = useState(sizeValues[0])
    const [avalable, setAvalable] = useState(1)


    useEffect(() => {
    }, [])



    const addCart = (id_product) => {
        let product = {
            id: id_product,
            size: size_Order,
            quantity: quantity_Order
        }

        if(!Boolean(localStorage.getItem('cart'))) {
            localStorage.setItem('cart', JSON.stringify([]))
            console.log('check')
        }

        let product_list = localStorage.getItem('cart')
        let json = [...JSON.parse(product_list), product]

        localStorage.setItem('cart', JSON.stringify(json));
        console.log(JSON.parse(product_list))



        // let product_list = localStorage.getItem('cart').split(',')
        // let product_list_add = [...product_list, id_product]
        // localStorage.setItem('cart', product_list_add);
        // console.log(product_list.filter(i => i))
    }
    
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
                            <img className={cx(["shoe_img", "_shoe"])} src={require('../../imgData/'+product.img)} alt="shoe image"/>
                        </div>
                    </div>

                    <div className={cx("row_grp2")}>
                        <div className={cx("container_details_shoe")}>
                            <div className={cx("information_product")}>
                                <p className={cx("shoe_name")}
                                >{product.name}</p>
                                <div className={cx("status")} style={{margin: "13px 0px"}}>
                                    <p className={cx("id")}>Mã sản phẩm: <strong>{product.id}</strong></p>
                                    <p className={cx("avalable")}>Tình trạng: <strong>{avalable ? "còn hàng" : "hết hàng"}</strong></p>
                                </div>
                                <p className={cx("shoe_price")}>{product.price} ₫</p>
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
                                            sizeValues.map((item, index) =>
                                                <span key={index}
                                                    className={"btn_size"}
                                                    onClick={() => {
                                                        let quantitySize_select = product.inventory.find(i => i.size===item)
                                                        // console.log(quantitySize_select)
                                                        setAvalable(quantitySize_select.quantity)
                                                        setSize_Order(item)
                                                    }}
                                                >
                                                    {item}
                                                </span>

                                            )
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
                                            onClick={() => setQuantity_Order(pre => pre+1)}
                                        >+</span>
                                    </div>
                                </div>
                            </div>

                            <div id="btn_grp">
                                <div className={cx("buy_btn_grp")}>
                                    <h2 className={cx("buy")}>MUA HÀNG</h2>
                                </div>
                
                                <div className={cx("add_btn_grp")}
                                    onClick={() =>{ 
                                        if(avalable) {
                                            addCart(product.id)
                                            toast.success("Đã thêm vào gỏi hàng", {
                                                autoClose: 1,
                                                theme: "colored",
                                                position: "bottom-right",
                                            })
                                        }
                                        else {
                                            toast.error("size này tạm hết hàng", {
                                                autoClose: 2,
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

                <Slider imgs={product.imgs}/>
                <div className={cx("line")}></div>
                <img className={cx('choose_size')} src={require('../../imgData/howto.png')} alt="shoe image"/>
                <img className={cx('choose_size')} src={require('../../imgData/chart_size.png')} alt="shoe image"/>

                <Carousel brand={product.productId}/>

            </div>




        </div>
    )
}

export default DetailProduct;