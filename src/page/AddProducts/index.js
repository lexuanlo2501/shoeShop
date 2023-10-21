import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./admin.module.scss"
import {toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';


import { faClose, faCross, faFileImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



import axios from "axios";
import ModifyQuantity from "../../components/ModifyQuantity";
import { useRef } from "react";
import ConfirmModal from "../../components/ConfirmModal";

const cx = classNames.bind(styles)


function AddProducts() {

   

    const [img, setImg] = useState("")
    const [imgs_v2, setImgs_v2] = useState([])

    const [price, setPrice] = useState("0")
    const [atri_prod, setAtri_prod] = useState({}) // {brands: [],types: [],discounts: []}
    



    const [show, setShow] = useState(false);
    const [atribName, setAtribName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [trigger_Atrib, setTrigger_Atrib] = useState(false)

    useEffect(() => {
        const handle_CallAIP = async () => {
            const brands_data = await axios(process.env.REACT_APP_BACKEND_URL+"/brands")
            const types_data = await axios(process.env.REACT_APP_BACKEND_URL+"/types")
            const discount_data = await axios(process.env.REACT_APP_BACKEND_URL+"/discounts")

            const combineData = {brands: brands_data.data,types: types_data.data,discounts: discount_data.data}
            console.log(combineData)
            setAtri_prod(combineData)
        }
        handle_CallAIP()


    }, [trigger_Atrib])

    
    // infor shoe

    const sizeValues = ['36', '37', '38', '39', '40', '41', '42', '43']
    const [inventory, setInventory] = useState(sizeValues.map((item, index) => {
        return {
            "size":item,
            "quantity": 0
        }
    }))

    
    const [colorBCImg_main, setColorBCImg_main] = useState("color_df")



    const listColorBC = ['color_1','color_19','color_2','color_20','color_3','color_7','color_4','color_5',
    'color_18','color_13','color_14',
    'color_6','color_21','color_9', 'color_8','color_17','color_10','color_11','color_12'
    ,'color_15','color_22','color_16'
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
        console.log(e.target.files[0])
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


    

    
    

    const onSubmit = (data) => {
        if(img && price && !isNaN(price)) {
            const infor = {
                "name": data.name,
                "brand_id": data.productId || "ADIDAS",
                "price": +price,
                "img": img && img.name,
                "imgs": imgs_v2.map(i => i.name),
                "description": data.description,
                "type": +data.type || 1,
                "discount_id": +data.discount_id,

                "inventory": inventory,
                "BC_color": colorBCImg_main
            }


            console.log(infor)
            console.log(imgs_v2)

    
            axios.post(process.env.REACT_APP_BACKEND_URL+"/shoes_add", infor)
            .then(res => {
                toast.success("Thêm thành công")
            })
            .catch(err =>  toast.error("ERRORRRRRRRRRRR"))

            // HANDLE IMG

            // imgs
            const formdata_imgs = new FormData()
            for (let i = 0; i < imgs_v2.length; i++) {
                formdata_imgs.append("files", imgs_v2[i])
            }
            axios.post(process.env.REACT_APP_BACKEND_URL+"/upload_imgs", formdata_imgs)
            .then(res => console.log(res))
            .catch(err => console.log(err))

            // img
            const formdata_img = new FormData()
            formdata_img.append('file', img)
            axios.post(process.env.REACT_APP_BACKEND_URL+"/upload_img", formdata_img)
            .then(res => console.log(res))
            .catch(err => console.log(err))



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

                Boolean(imgs_v2.length) && imgs_v2.map((item, index) =>
                    <div className={cx('img_sub')} key={index}>
                        <button 
                            onClick={() => {
                                URL.revokeObjectURL(imgs_v2[index])
                                setImgs_v2(e => {
                                    let arr = [...e]
                                    return arr.filter((item2, index2) => {
                                        return index2 !== index
                                    })
                                })
                            }}

                        >X</button>
                        <img src={item.preview}/>
                    </div>
                )
            }  
            </div>

            <input type="file"
                onChange={(e) => {
                    const file = e.target.files[0]
                    console.log(e.target.files[0].name)
                    file.preview = URL.createObjectURL(file)
                    setImgs_v2(pre => [...pre, file])
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
                {
                    atri_prod?.brands?.map(i => <option key={i.brand_id} value={i.brand_id}>{i.brand_id}</option>)
                }
                </select>
                <FontAwesomeIcon  className={cx('addAtribute_btn')} icon={faPlus}
                    onClick={() => {
                        setAtribName("brands")
                        handleShow()
                    }}  
                />
            </div>

            <div className={cx('input_product')}>
                <label className={cx('label-product')}>loại: </label>
                <select
                    {...register("type")}
                >
                {
                    atri_prod?.types?.map(i => <option key={i.id} value={i.id}>{i.type_name}</option>)
                }
                </select>
                <FontAwesomeIcon className={cx('addAtribute_btn')} icon={faPlus}
                    onClick={() => {
                        setAtribName("types")
                        handleShow()
                    }}  
                />
            </div>

            <div className={cx('input_product')}>
                <label className={cx('label-product')}>khuyến mãi: </label>
                <select
                    {...register("discount_id")}
                >
                {
                    atri_prod?.discounts?.map(i => <option key={i.id} value={i.id}>{i.per}%</option>)
                }
                </select>
                <FontAwesomeIcon className={cx('addAtribute_btn')} icon={faPlus}
                    onClick={() => {
                        setAtribName("discounts")
                        handleShow()
                    }} 
                />

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
                                        if(item === item2.size) return {...item2, "quantity" : +e.target.value}
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

      
    {
        show && <Modal_modify_atribute show={show} attrib_name={atribName}  handleClose={handleClose} atri_prod={atri_prod} setTrigger_Atrib={setTrigger_Atrib}/>

    }
       
    </div> );
}

const Modal_modify_atribute = ({show, handleClose, atri_prod, setTrigger_Atrib, attrib_name}) => {

    const [attrib, setAttrib] = useState(attrib_name)
    const input_add = useRef("");

    const attrib_list = [{id:"brands",name:"Thương hiệu"}, {id:"discounts",name:"Khuyến mãi"}, {id:"types",name:"loại"}]

    

    const handle_delete = (id) => {
        axios.delete(process.env.REACT_APP_BACKEND_URL+`/${attrib}/${id}`)
        setTrigger_Atrib(pre => !pre)

    }

    const handle_add = (value) => {
        setTrigger_Atrib(pre => !pre)
        if(attrib === "brands") {
            axios.post(process.env.REACT_APP_BACKEND_URL+`/${attrib}`, {brand_id:value})
        }
        else if (attrib === "discounts") {
            axios.post(process.env.REACT_APP_BACKEND_URL+`/${attrib}`, {per:+value})
        }
        else if (attrib === "types") {
            axios.post(process.env.REACT_APP_BACKEND_URL+`/${attrib}`, {type_name:value})
        }
        input_add.current.value = ""
    }
    
    return (
        <Modal
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx("modify_attrib")}>
                    <ul className={cx("navigate_attribProd")}>
                    {
                        attrib_list.map(i => (
                            <li key={i.id} className={cx({"active":i.id === attrib})}
                                onClick={() => {setAttrib(i.id)}}
                            >{i.name}</li>
                        ))
                    }
                    </ul>

                    <table className="table">
                        <thead className="table-secondary">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Gía trị</th>
                            <th scope="col">Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        attrib === "types" &&
                        atri_prod[attrib].map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{index}</th>
                                <td>{item.type_name}</td>
                                <td>
                                    <ConfirmModal className={cx("atrib_del_btn")} btnText="x" title="XÓA LOẠI SẢN PHẨM" body={<div>Bạn có muốn xóa loại <b>{item.type_name}</b> không ?</div>}
                                        accept={() => handle_delete(item.id)}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                    {
                        attrib === "brands" &&
                        atri_prod[attrib].map((item, index) => (
                            <tr key={item.brand_id}>
                                <th scope="row">{index}</th>
                                <td>{item.brand_id}</td>
                                <td>
                                    <ConfirmModal className={cx("atrib_del_btn")} btnText="x" title="XÓA HÃNG SẢN PHẨM" body={<div>Bạn có muốn xóa hãng <b>{item.brand_id}</b> ?</div>}
                                        accept={() => handle_delete(item.brand_id)}
                                    />
                                </td>

                            </tr>
                        ))
                    }
                    {
                        attrib === "discounts" &&
                        atri_prod[attrib].map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{index}</th>
                                <td>{item.per}</td>
                                <td>
                                    <ConfirmModal className={cx("atrib_del_btn")} btnText="x" title="XÓA KHUYẾN MÃI SẢN PHẨM" body={<div>Bạn có muốn xóa mã khuyến mãi <b>{item.per}%</b> này không?</div>}
                                        accept={() => handle_delete(item.id)}
                                    />
                                </td>

                            </tr>
                        ))
                    }
                            <tr >
                                <th scope="row"></th>
                                <td><input ref={input_add} className={cx("input_add")} placeholder="Nhập giá trị mới ..."/></td>
                                <td>
                                    <button className={cx("atrib_add_btn")}
                                        onClick={() => {
                                            console.log(input_add.current.value)
                                            handle_add(input_add.current.value)
                                        }}
                                    >+</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                

                
            </Modal.Body>
           
        </Modal>
    )
}

export default AddProducts;