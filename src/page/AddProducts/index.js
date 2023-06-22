import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./admin.module.scss"
import {toast } from 'react-toastify';


import { faClose, faFileImage } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



import axios from "axios";
import ModifyQuantity from "../../components/ModifyQuantity";

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

function AddProducts() {

    const [img, setImg] = useState()
    const [imgs, setImgs] = useState([])
    const [imgURLs, setImgURLs] = useState([])
    const [price, setPrice] = useState("0")

    const [addmin, setAddmin] = useState({})
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("tokens"));
        setAddmin(user)
    }, [])

    
    // infor shoe

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
    ,'color_13','color_14','color_15','color_16'
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

    const formatCurr = (number) => {
        let curr = Number(number.replaceAll('.', '')).toLocaleString('vi', {style : 'currency', currency : 'VND'})
        return curr.slice(0, curr.length-2)
    }
    const formatNum = (str) => {
        return str.replaceAll('.', '')
    }
    

    // handle react form
    const schema = yup.object().shape({
        name: yup.string().required(),
        // price: yup.number().required(),
        description: yup.string().required()
    }).required();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const createID = () => {
        let date = new Date()
        let id = `${date.toJSON().slice(0, 10).replace(/-/g,'')}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`
        return Number(id)
    }

    const onSubmit = (data) => {
        if(img && price && !isNaN(price)) {
            const infor = {
                "id": createID(),
                "name": data.name,
                "productId": data.productId,
                "price": formatCurr(price),
                "img": img && img.name,
                "imgs": imgs,
                "description": data.description,
                "inventory": inventory,
                "BC_color": colorBCImg_main
            }
    
            axios.post(`http://localhost:4000/products/${infor.productId}/data`,infor)
            .then(res => {
                console.log(res.data)

                const history = {
                    id: "hst"+createID(),
                    id_admin : addmin._id,
                    userName : addmin.fullName,
                    email : addmin.email,
                    date : createHistory().split(' - ')[0],
                    time : createHistory().split(' - ')[1],
                    active : 'add',
                    content: `Thêm sản phẩm mã ${infor.id}`
               }
                axios.post(`http://localhost:4000/history`,history)
                
                toast.success("Thêm thành công")
            })
            .catch(err => {
                toast.error("ERRORRRRRRRRRRR")
            })

            console.log(infor)
        } 


       

       
        
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
                {img === "" && <span className="text-danger m-3 d-inline-block ">không được bỏ trống mục này</span> }
                
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
                    {...register("productId")}
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
                    {...register("name", { required: true })}

                />
            {
                errors.name && <span className={cx('message_err')}>không được bỏ trống mục này</span>
            }
            </div>

            <div className={cx('input_product')}>
                <label className={cx('label-product')}>giá: </label>
                <input placeholder="..."
                    value={formatCurr(price)}
                    onChange={(e) => {
                        if(typeof e.target.value !== "number") {
                            setPrice(formatNum(e.target.value))
                        } 
                        console.log(price)

                    }}  
                    // {...register("price", { required: true })}
                />
                {
                    !!price &&
                    <FontAwesomeIcon onClick={() => {setPrice("")}} className={cx('delPrice_btn')} icon={faClose}/>
                }
                {
                    isNaN(price) && <span className={cx('message_err')}>vui lòng nhập số</span>
                }
                {
                    price === "" && <span className={cx('message_err')}>không bỏ trống mục này</span>
                }
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
                <textarea className={cx('input_textarea') }
                    {...register("description", { required: true })}
                ></textarea>
                {
                    errors.description && <span className={cx('message_err')}>không được bỏ trống mục này</span>
                }
            </div>

            <button
                href="http://localhost:3000/admin/addProducts"
                className={cx('button-54')}
                role="button"

                onClick={(e) => {
                  
                    handleSubmit(onSubmit)(e)
                    if(img == undefined) {
                        setImg("")
                    }
                    if(price === "0") {
                        setPrice("")
                    }

                }}
            >thêm</button>

        </div>

        
       
    </div> );
}

export default AddProducts;