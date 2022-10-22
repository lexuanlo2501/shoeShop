import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./admin.module.scss"

import Button from 'react-bootstrap/Button';




import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import axios from "axios";
import ModifyQuantity from "../../components/ModifyQuantity";

const cx = classNames.bind(styles)

function AddProducts() {

    const [img, setImg] = useState()
    const [imgs, setImgs] = useState([])
    const [imgURLs, setImgURLs] = useState([])

    
    // infor shoe
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState("")
    const [brand, setBrand] = useState("nike")

    const sizeValues = ['36', '37', '38', '39', '40', '41', '42', '43']
    const [inventory, setInventory] = useState(sizeValues.map((item, index) => {
        
        return {
            "size":item,
            "quantity": 0
        }
    }))

    
    const [colorBCImg_main, setColorBCImg_main] = useState("color_df")

    const [quantity_input, setQuantity_input] = useState(0)


    const listColorBC = ['color_1','color_2','color_3','color_4','color_5',
    'color_6','color_7','color_8','color_9', 'color_10','color_11','color_12'
    ,'color_13','color_14','color_15'
    ]

    const [quantity_size, setQuantity_size] = useState([])

    useEffect(() => {
        return () => {
            img && URL.revokeObjectURL(img.preview)
        }
    }, [img])

    const handlePreviewImg_main = (e) => {
        const file = e.target.files[0]
        console.log(e.target.files[0].name)
        file.preview = URL.createObjectURL(file)
        setImg(file)
        
    }

    

    return ( <div className={cx('wrapper')}>

        <div className={cx('left_side')}>

            <input type="file"
                onChange={handlePreviewImg_main}
                id="file"
                className={cx('add_imgSub_btn-off')}
            />

            <div className={cx('backGround_color_imgMain')}>
                
                <div className={cx(['backGround_list'])}>
                    {
                        listColorBC.map((item, index) => 
                            <span key={index} className={cx(['backGround_item', item])}
                                onClick={() => {
                                    setColorBCImg_main(item)
                                }}
                            ></span>
                        )
                    }
                </div>
            </div>

            <div className={cx(['product_img', colorBCImg_main])}>
                <label className={cx(['add_btn-on', 'img_main__add'])} htmlFor="file">
                    <FontAwesomeIcon icon={faFileImage}/>
                </label> 
                {img && <img className={cx('img')} src={img.preview}/>}
                
            </div>

            <div className={cx('product_img--sub')}>
                {
                    Boolean(imgURLs.length) && imgURLs.map((item, index) =>
                        <div className={cx('img_sub')} key={index}>
                            <button 
                                onClick={() => {
                                    URL.revokeObjectURL(imgURLs[index])
                                    setImgURLs(e => {
                                        let arr = [...e]
                                        return arr.filter((item2, index2) => {
                                            return index2 !== index
                                        })
                                    })
                                }}

                            >X</button>
                            <img src={item}/>
                        </div>
                    )
                }  
            </div>

            <input type="file"
                onChange={(e) => {
                    const file = e.target.files[0]
                    console.log(e.target.files[0].name)
                    file.preview = URL.createObjectURL(file)
                    setImgs(pre => [...pre, e.target.files[0].name])
                    setImgURLs(pre => [...pre,file.preview])
                }}
                id="file2"
                className={cx('add_imgSub_btn-off')}
            />
            <div >
                <label className={cx(['add_btn-on', 'img_sub__add'])} htmlFor="file2">
                    <FontAwesomeIcon icon={faFileImage}/>
                </label>       
            </div> 


            {/* <img  src={require('../../imgData/shoe-removebg-preview.png')}/>
            <img  src={require('../../imgData/A02095C_A_107X1-removebg-preview.png')}/> */}

        </div>

        <div className={cx('line-vertical')}></div>

        <div className={cx('right_side')}>

            <div className={cx('input_product')}>
                <label className={cx('label-product')}>hãng: </label>
                <select
                    onChange={e => setBrand(e.target.value)}
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
                <input placeholder="..." 
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className={cx('input_product')}>
                <label className={cx('label-product')}>giá: </label>
                <input placeholder="..." 
                    onChange={e => setPrice(e.target.value)}
                />
            </div>

            <div className={cx('input_product')}>
                <label className={cx('label-product')}>size: </label>
                <select
                    onChange={e => {
                        if(!quantity_size.includes(e.target.value)) {
                            setQuantity_size(pre => [...pre, e.target.value])
                        }
                    }}
                >
                {
                    sizeValues.map((item, index) => 
                        <option value={item} key={index}>{item}</option>
                    )
                }
                </select>
                <div>
                    {
                        quantity_size.map((item, index) => 
                            <div key={index} className={cx('quantity_size')}>
                                <span>{item}</span>
                                <input placeholder="Số lượng"
                                    onChange={(e) => {

                                        let tmpList = [...inventory]
                                        let newList = tmpList.map((item2, index2) => {
                                            if(item === item2.size) return {...item2, "quantity" : e.target.value}
                                            return item2

                                        })
                                        setInventory(newList)

                                        console.log(newList)
                                    }}  
                                />
                            </div>
                        )
                    }
                </div>
            </div>


            {/* QUANTITY */}
            {/* <div className={cx('input_product')}>
                <label className={cx('label-product')}>số lượng: </label>
                <input placeholder="..."  type="number"
                    onChange={e => setQuantity(e.target.value)}
                />
            </div> */}

            <div className={cx('input_product')}>
                <label style={{display:'block'}} className={cx('label-product')}>mô tả: </label>
                <textarea className={cx('input_textarea')}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
            </div>

            <a
                href="http://localhost:3000/admin/addProducts"
                className={cx('addShoe_btn')}
                onClick={() => {

                    const infor = {
                        "name": name,
                        "productId": brand,
                        "price": Number(price).toLocaleString('vi', {style : 'currency', currency : 'VND'}),
                        "img": img && img.name,
                        "imgs": imgs,
                        "description": description,
                        "quantity": JSON.stringify(quantity),
                        "productId": brand,
                        "inventory": inventory,
                        "BC_color": colorBCImg_main
                    }

                    axios.post(`http://localhost:4000/products/${brand}/data`,infor)
                    .then(res => {
                        console.log(res.data)
                        alert('thêm sản phẩm thành công')
                    })

                    console.log(infor)
                }}
            >thêm</a>

        </div>
        
       
    </div> );
}

export default AddProducts;