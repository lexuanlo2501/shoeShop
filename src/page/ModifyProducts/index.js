import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from "classnames/bind"
// import styles from './modifyProducts.module.scss'
import styles from '../AddProducts/admin.module.scss'
import './modifyProducts.scss'
import 'bootstrap/dist/css/bootstrap.css';



// boostrap
import Modal from 'react-bootstrap/Modal';

import axios from "axios";
import { useEffect, useState } from "react";



import { faFileImage, faSearch } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';





const cx = classNames.bind(styles)

const createHistory = () => {
    let date = new Date()
    let splitDate = date.toJSON().slice(0, 10).split('-')
    let result = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return result
}
const createID = () => {
    let date = new Date()
    let id = `${date.toJSON().slice(0, 10).replace(/-/g,'')}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
    return Number(id)
}

function ModifyProducts() {

    const [loading, setLoading] = useState(true)
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


    const [showM_Quantity, setShowM_Quantity] = useState(false);
    const handleCloseM_Quantity = () => setShowM_Quantity(false);
    const handleShowM_Quantity = () => setShowM_Quantity(true);

    // ADMIN
    const [addmin, setAddmin] = useState({})
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("tokens"));
        setAddmin(user)
    }, [])


    useEffect(() => {
        const url = !brand ? 'http://localhost:4000/data' : `http://localhost:4000/products/${brand}/data`
        
        const controller = new AbortController()
        axios.get(url, {signal:controller.signal})
        .then(res => {
            console.log(res.data)
            setProducts(res.data)
            setLoading(false)
            setIsErrSearch(false)
        })
        .catch(err => {
            setLoading(true)

        })

        return () => controller.abort()
    }, [brand, checkUpd])

    useEffect(() => {
        // show data on input tag
        const initialValue_upd_module = () => {
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
        }

        showUpd && initialValue_upd_module()
        
    }, [showUpd])


    // func
    const handleDel = (id_product_v) => {


        axios.delete(`http://localhost:4000/data/${id_product_v}`)
        .then(res => {

            const history = {
                id: "hst"+createID(),
                id_admin : addmin._id,
                userName : addmin.fullName,
                email : addmin.email,
                date : createHistory().split(' - ')[0],
                time : createHistory().split(' - ')[1],
                active : 'delete',
                content: `Xóa sản phẩm mã ${id_product_v}`
           }

            axios.post(`http://localhost:4000/history`,history)


            const obj = products.find(i => i.id === id_product_v)
            axios.post(`http://localhost:4000/binRecycle`,obj)


            toast.success("xóa thành công")
        })
        .catch(() => {
            toast.error("SÚ")

        })


        
      
       

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
        .then(res => {
            console.log(res)
            toast.success("cập nhật thành công")
        })
        .catch(err => {
            console.log(err)
            toast.error("SÚ")

        })
    }

    const check2Array_equal = (arr1, arr2) => {
        
        if(arr1.length !== arr2.length) return false
        
        if(arr1.every((item, index) => {
            return item === arr2[index]
        })) return true
        else return false
        
    }


    const funcHandleShowInfor_upd = () => {
        let {productId,name, price, quantity, description, inventory} = product
        let listValue_product = [name, price, quantity,productId]
        let listInputValue = document.querySelectorAll('.inputClass')
        
        Array.from(listInputValue).map((item, index) => {
            item.value = listValue_product[index]
        })

        document.querySelector('.selectClass_value').value = productId 
        document.querySelector('#descriptionUpdate_value').value = description 
        
        // inventory
        let listInputQuantity = document.querySelectorAll('.quantityInventory_input')
        Array.from(listInputQuantity).map((item, index) => {
            item.value = inventory[index].quantity
        })
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
                            <option value="">tất cả</option>
                            <option value="nike">nike</option>
                            <option value="adidas">adidas</option>
                            <option value="converse">converse</option>
                            <option value="puma">puma</option>
                            <option value="vans">vans</option>
                        </select>
                    </div>
                    
                    <div className={cx('search_product_byID')}>
                        <label>mã SP</label>
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

                {
                loading ? 
                <SyncLoader color="rgba(54, 215, 183, 1)" /> 
                :
                <table className='table table-hover'>
                    <thead>
                        <tr className="table-primary">
                            <th scope="col" >mã SP</th>
                            <th scope="col"  className='product_name'>tên SP</th>
                            <th scope="col" >giá</th>
                            <th scope="col" >mô tả</th>
                            <th scope="col" >ảnh</th>
                            <th scope="col" >màu nền</th>
                            <th scope="col" >xóa</th>
                            <th scope="col" >sửa</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Boolean(products.length) && products.map((item, index) => 
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td >
                                    <div className='description'>
                                        {item.description}
                                    </div>
                                </td>

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
                                    <FontAwesomeIcon className={cx('btn_modify')} icon={faTrashCan}/>
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
                                    <FontAwesomeIcon className={cx('btn_modify')} icon={faPenToSquare}/>
                                </td>
                            </tr>
                        )
                    }


                    </tbody>
                    
                </table>
                }

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
                fullscreen={true}
            >
                <Modal.Header closeButton>
                <Modal.Title><h1>Sửa Sản Phẩm  -  ID: {product.id}</h1></Modal.Title>
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
                                            // console.log(e.target.files[0].name)
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
                                                    setInventory_upd([...tempInventory,{"size":item.size, "quantity":e.target.value}])
                                                }}
                                            />
                                            <QuantityModal addmin={addmin} idPro={product.id} size={item.size} quantity={item.quantity} inventory={product.inventory}/>


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

                        </div>
                    </div>



                    
                </Modal.Body>
                <Modal.Footer className="modal_footer_updateProd">
                    <button 
                        className={cx(['btnModal'])}
                        onClick={() => {
                            handleUpd()
                            setCheckUpd(pre => !pre)
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


// {/* SUBMODAL (ADD QUANTITY PRODUCT) */}

function QuantityModal({size, quantity, inventory, idPro, addmin}) {
    const [showM_Quantity, setShowM_Quantity] = useState(false);
    const handleCloseM_Quantity = () => setShowM_Quantity(false);
    const handleShowM_Quantity = () => setShowM_Quantity(true);
     
    const [quan_input, setQuan_input] = useState("")
    

    const handleSubmit = () => {
        console.log(inventory)
        let inventoryCp = inventory
        inventoryCp[inventoryCp.map(i => i.size).indexOf(size)] = {
            size:size, 
            quantity:Number(quan_input) +Number(quantity)
        }
        console.log(inventoryCp)
        axios.patch(`http://localhost:4000/data/${idPro}`,{"inventory": inventoryCp})
        
       const history = {
            id: "hst"+createID(),
            id_admin : addmin._id,
            userName : addmin.fullName,
            email : addmin.email,
            date : createHistory().split(' - ')[0],
            time : createHistory().split(' - ')[1],
            active : 'modify',
            content: `thêm ${quan_input} đôi vào mã sp: ${idPro}, size: ${size}`
       }
       console.log(history)
        axios.post(`http://localhost:4000/history`,history)
        .then(() => {
            toast.success("cập nhật thành công")
        })
        .catch(() => {
            toast.error("cập nhật thất bại")

        })

        

        
        handleCloseM_Quantity()
    }

    return (
        <>
           <button className={cx('addQuantity')}
                onClick={() => {
                    handleShowM_Quantity()
                }}
            >+</button>
            <Modal show={showM_Quantity} onHide={handleCloseM_Quantity}>
                <Modal.Header closeButton>
                <Modal.Title>NHẬP KHO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Size: {size}</p>
                        <p>Số lượng trong kho: {quantity}</p>

                        <span>Nhập số lượng cần thêm:</span>
                        <input className={cx('input_quantity')} placeholder='Số lượng' type='number' 
                            onChange={e => setQuan_input(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <button onClick={handleCloseM_Quantity} className={cx(['btnModal'])}>
                    Đóng
                </button>
                <button className={cx(['btnModal'])} onClick={handleSubmit}>
                    Lưu
                </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}






export default ModifyProducts