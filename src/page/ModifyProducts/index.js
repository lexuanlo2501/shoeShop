import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from "classnames/bind"
// import styles from './modifyProducts.module.scss'
import styles from '../AddProducts/admin.module.scss'
import './modifyProducts.scss'


// boostrap
import Modal from 'react-bootstrap/Modal';

import axios from "axios";
import { useEffect, useState } from "react";



import { faFileImage, faSearch } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";




const cx = classNames.bind(styles)

function ModifyProducts() {

    const [brand, setBrand] = useState("")
    const [products, setProducts] = useState([])
    const [id_product, setId_product] = useState("")
    const [product, setProduct] = useState({})


    // data update
    const [img_upd, setImg_upd] = useState("")
    const [imgs_upd, setImgs_upd] = useState([])

    const [name_upd, setName_upd] = useState("")
    const [price_upd, setPrice_upd] = useState("")
    const [quantity_upd, setQuantity_upd] = useState("")
    const [description_upd, setDescription_upd] = useState("")
    const [productId_upd, setProductId_upd] = useState("")
    const [inventory_upd, setInventory_upd] = useState([])

    const [checkUpd, setCheckUpd] = useState(true)
    const [isErrSearch, setIsErrSearch] = useState(false)

    

    const [showDel, setShowDel] = useState(false);
    const [showUpd, setShowUpd] = useState(false);


    const handleClose = () => setShowDel(false);
    const handleShow = () => setShowDel(true);

    const handleClose_upd = () => setShowUpd(false);
    const handleShow_upd = () => setShowUpd(true);

    useEffect(() => {
        brand && 
        axios.get(`http://localhost:4000/products/${brand}/data`)
        .then(res => {
            console.log(res.data)
            setProducts(res.data)
            setIsErrSearch(false)

        })
    }, [brand, checkUpd])


    // func
    const handleDel = (id_product_v) => {
        console.log('del')

        axios.delete(`http://localhost:4000/data/${id_product_v}`)
        .then(res => console.log(res))
    }

    const handleUpd = () => {
        const inforUpdate = {
            'img': img_upd,
            'imgs': imgs_upd,
            'name': name_upd,
            'price': price_upd,
            'description': description_upd,
            'quantity': quantity_upd,
            'productId': productId_upd,
            'inventory': inventory_upd

        }
        console.log(inforUpdate)

        const data_patch = {}

        Object.keys(inforUpdate).forEach((key, index) => {
            if( Array.isArray(inforUpdate[key]) && !check2Array_equal(inforUpdate[key],product[key]) ) {
                data_patch[key] = inforUpdate[key]
            }
            else if(inforUpdate[key] !== product[key]) {
                data_patch[key] = inforUpdate[key]
            }
        })

        console.log('data_patch:',data_patch)

        axios.patch(`http://localhost:4000/data/${product.id}`,data_patch)
        .then(res => console.log(res))
    }

    const check2Array_equal = (arr1, arr2) => {
        
        if(arr1.length !== arr2.length) return false
        
        if(arr1.every((item, index) => {
            return item === arr2[index]
        })) return true
        else return false
        
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list_product')}>
                <div className={cx('search_bar')}>
                    <div>
                        <label>hãng</label>
                        <br/>
                        <select
                            className={cx('search_products')}
                            onChange={e => setBrand(e.target.value)}
                        >
                            <option value="nike">nike</option>
                            <option value="adidas">adidas</option>
                            <option value="converse">converse</option>
                            <option value="puma">puma</option>
                            <option value="vans">vans</option>
                        </select>
                    </div>
                    
                    <div className={cx('search_product_byID')}>
                        <label>mã SP</label>
                        <br/>
                        <div >
                            <input type='text' className='getID_search'/>
                            <button
                                onClick={() => {
                                    let id = document.querySelector('.getID_search').value
                                    id = id.replace(/ /gi, "")
                                    id &&
                                    axios.get(`http://localhost:4000/data/${id}`)
                                    .then(res => {
                                        setProducts([res.data])
                                        setIsErrSearch(false)
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        setIsErrSearch(true)
                                    })
                                }}
                                
                            >
                                <FontAwesomeIcon icon={faSearch}/>
                            </button>
                        </div>
                        {
                            isErrSearch && <p className={cx('error_message')}>Mã sản phẩm không tồn tại</p>
                        }
                    </div>

                </div>
                
                <table>
                    <tr>
                        <th>mã SP</th>
                        <th className='product_name'>tên SP</th>
                        <th>giá</th>
                        <th>ảnh</th>
                        <th>màu nền</th>
                        <th>xóa</th>
                        <th>sửa</th>

                    </tr>
                    {
                        products.length && products.map((item, index) => 
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>

                                <td>
                                    <img src={require('../../imgData/'+item.img)} alt="error"/>
                                </td>
                                
                                <td className={cx('tdClass_BCcolor')}>
                                    <span className={cx(item.BC_color)}></span>
                                </td>
                                <td className={cx(['btn_modify','del'])}
                                    onClick={() => {
                                        handleShow()
                                        setId_product(item.id)
                                    }}

                                >
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </td>
                                <td className={cx(['btn_modify','upd'])}
                                    onClick={() => {
                                        handleShow_upd()
                                        setProduct(item)
                                        console.log('product:', item)

                                        setImg_upd(item.img)
                                        setImgs_upd(item.imgs)
                                        setName_upd(item.name)
                                        setPrice_upd(item.price)
                                        setQuantity_upd(item.quantity)
                                        setDescription_upd(item.description)
                                        setProductId_upd(item.productId)
                                        setInventory_upd(item.inventory)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare}/>
                                </td>
                            </tr>
                        )
                    }
                    
                </table>
            </div>



            <Modal show={showDel} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                    <h1>xóa sản phẩm</h1>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{fontSize:"18px"}}>bạn có muốn xóa sản phẩm này</div>
                </Modal.Body>
                <Modal.Footer>
                <button
                    className={cx(['btnModal','del'])}
                    onClick={() => {
                        handleDel(id_product)
                        handleClose()
                        setCheckUpd(pre => !pre)
                    }}
                >
                    xóa
                </button>
                <button
                    className={cx(['btnModal'])}
                    onClick={() => {
                        handleClose()
                    }}
                >
                    đóng
                </button>
                </Modal.Footer>
            </Modal>

            <Modal show={showUpd} onHide={handleClose_upd} centered
                size="lg"
            > 
                <Modal.Header closeButton>
                <Modal.Title><h1>sửa sản phẩm</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('wrapper_modal_update')}>
                        <div className={cx('modal_update__leftSide')}>
                            <div className={cx(['product_img', product.BC_color, 'img_update'])}>
                                <label htmlFor="img_update">
                                    <FontAwesomeIcon icon={faFileImage}/>
                                    <input type='file'
                                        id="img_update"
                                        onChange={(e) => {
                                            console.log(e.target.files[0].name)
                                            setImg_upd(e.target.files[0].name)
                                        }}
                                    />
                                </label>
                                
                                {product.img && <img className={cx('img')} src={require('../../imgData/'+img_upd)} alt="error"/>}
                            </div>

                            <div className={cx('container_imgSub_update')}>
                                {Boolean(imgs_upd.length) && imgs_upd.map((item, index) => 
                                    <div key={index} className={cx('imgsSub_update_modal')}>
                                        <img src={require('../../imgData/'+item)} alt="error"/>
                                        <button
                                            onClick={() => {
                                                let preImgs = [...imgs_upd]

                                                setImgs_upd(preImgs.filter((item,index2) => index2 !== index ))
                                            }}
                                        >x</button>
                                    </div>
                                )}
                                <input type="file"
                                    onChange={(e) => {
                                        console.log(e.target.files[0].name)
                                        setImgs_upd(pre => [...pre, e.target.files[0].name])
                                    }}
                                    id="imgs_update"
                                    className={cx('add_imgSub_btn-off')}
                                />
                                <div >
                                    <label className={cx(['add_btn-on', 'img_sub__add'])} htmlFor="imgs_update">
                                        <FontAwesomeIcon icon={faFileImage}/>
                                    </label>       
                                </div> 
                                

                            </div>
                            
                        </div>


                        <div className={cx('modal_update__rightSide')}>
                            <div className={cx('input_product')}>
                            <label className={cx('label-product')}>hãng: </label>
                            <select className='selectClass_value'
                                onChange={e => setProductId_upd(e.target.value)}
                            >
                                <option value="nike">nike</option>
                                <option value="adidas">adidas</option>
                                <option value="converse">converse</option>
                                <option value="puma">puma</option>
                                <option value="vans">vans</option>
                            </select>
                            </div>
                            <div className={cx('input_product')}>
                                <label className={cx('label-product')}>tên SP: </label>
                                <input className='inputClass' placeholder={product.name} 
                                    onChange={e => setName_upd(e.target.value)}
                                />
                            </div>

                            <div className={cx('input_product')}>
                                <label className={cx('label-product')}>giá: </label>
                                <input className='inputClass' placeholder={product.price} 
                                    onChange={e => setPrice_upd(e.target.value)}
                                />
                            </div>

                            {/* <div className={cx('input_product')}>
                                <label className={cx('label-product')}>số lượng: </label>
                                <input className='inputClass' placeholder={product.quantity}  type="number"
                                    onChange={e => setQuantity_upd(e.target.value)}
                                />
                            </div> */}

                            <div className={cx('input_product')}>
                                <label className={cx('label-product')}>số lượng: </label>
                                <div >
                                {
                                    product.inventory &&
                                    product.inventory.map((item, index) => 
                                        <div key={index} className={cx(['quantity_size', 'itemUpdInventory_input'])}>
                                            <span>{item.size}</span>
                                            <input className='quantityInventory_input' placeholder={item.quantity}
                                                onChange={(e) => {
                                                    let tempInventory = [...inventory_upd].filter(i => {
                                                        return i.size !== item.size
                                                    })
                                                    setInventory_upd([...tempInventory,{"size":item.size, "quantity":Number(e.target.value)}])
                                                }}
                                            />
                                        </div>
                                    )
                                }
                                </div>
                                
                            </div>

                            <div className={cx('input_product')}>
                                <label style={{display:'block'}} className={cx('label-product')}>mô tả: </label>
                                <textarea id='descriptionUpdate_value' placeholder={product.description} className={cx('input_textarea')}
                                    onChange={e => setDescription_upd(e.target.value)}
                                ></textarea>
                            </div>

                            <button
                                className={cx('btn_showInfor_upd')}
                                onClick={() => {
                                    // render value of product to input value
                                    let {productId,name, price, quantity, description, inventory} = product
                                    let listValue_product = [name, price, quantity,productId]
                                    let listInputValue = document.querySelectorAll('.inputClass')
                                    Array.from(listInputValue).map((item, index) => {
                                        item.value = listValue_product[index]
                                    })

                                    document.querySelector('.selectClass_value').value = productId 
                                    document.querySelector('#descriptionUpdate_value').value = description 
                                    
                                    let listInputQuantity = document.querySelectorAll('.quantityInventory_input')
                                    Array.from(listInputQuantity).map((item, index) => {
                                        item.value = inventory[index].quantity
                                    })
                                




                                    
                                }}
                            >hiển thị</button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <button 
                    className={cx(['btnModal'])}
                    onClick={() => {
                        handleUpd()
                        setCheckUpd(pre => !pre)
                        alert('cập nhật thành công')
                        handleClose_upd()
                    }}
                >
                    cập nhật
                </button>
                <button 
                    className={cx(['btnModal'])}
                    onClick={handleClose_upd}
                >
                    đóng
                </button>
                </Modal.Footer>
                
            </Modal>
        </div>
    )
}

export default ModifyProducts