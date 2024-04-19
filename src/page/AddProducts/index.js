import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./admin.module.scss"
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';

import { faClose, faFileCircleXmark, faFileImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {listColorBC} from "../../common"


import axios from "axios";
import { useRef } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import { createAxios } from '../../createInstance';

const axiosJWT = createAxios()
const cx = classNames.bind(styles)
const checkObj = (obj) => {
    let keys = Object.keys(obj)
    return !!keys.length
}

// TẬN DỤNG CÁC FORM VÀ VALIDATE Ở COMPONENT NÀY CHO UPDATE SẢN PHẨM
// CUSTOM COMPONENT NÀY ĐỂ PHÙ HỢP CHO CHỨC NĂNG THÊM VÀ SỬA SẢN PHẨM
function AddProducts({default_value={}, atri_prod_, isUpdateForm, trigger=()=>{}}) {
    // atri_prod_ truyền từ ModifyProduct: mục đích khi update sản phẩm đã gọi API(brands,types,discounts) không gọi lại lần nữa
    // trigger để re-render lại cho đồng nhất với dữ liệu vừa thay đổi

    let infor_user = JSON.parse(localStorage.getItem("tokens"))

    const [trigger_Atrib, setTrigger_Atrib] = useState(false)

    const [img, setImg] = useState(default_value?.img || "")
    const [imgs_v2, setImgs_v2] = useState([])

    const [price, setPrice] = useState((default_value?.price)?.toString() || "0")
    const [atri_prod, setAtri_prod] = useState(atri_prod_ || {}) // {brands: [],types: [],discounts: [], category: []}
    const [atribName, setAtribName] = useState("");

    const [categorySelect_id, setCategorySelect_id] = useState(1);


    const quantity_product_size = atri_prod?.category?.map(i => ({category_id: i.id, size: i.sizes_value}))

    const sizeValues = ['36', '37', '38', '39', '40', '41', '42', '43']
    const [inventory, setInventory] = useState( default_value?.inventory || sizeValues.map((item, index) => {
        return {
            "size": item,
            "quantity": 0
        }
    }))
    const [quantity_size, setQuantity_size] = useState(default_value?.inventory?.map(i => i.size) || [])
    
    const [colorBCImg_main, setColorBCImg_main] = useState(default_value?.BC_color || "color_df")


    // img, imgs update
    const [imgs_upd, setImgs_upd] = useState(default_value?.imgs || [])
    const [imgs_upd_del, setImgs_upd_del] = useState([])


    const [show, setShow] = useState(false);
   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


     // handle react form
     const schema = yup.object().shape({
        name: yup.string().required(),
        // price: yup.number().required(),
        description: yup.string().required()
    }).required();

    const { register, handleSubmit, watch, setValue,formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    useEffect(() => {
        const handle_CallAIP = async () => {
            if(!atri_prod_) {
                console.log("call api atribute")
                const brands_data = await axios(process.env.REACT_APP_BACKEND_URL+"/brands")
                const discount_data = await axios(process.env.REACT_APP_BACKEND_URL+"/discounts")
                const sizesType = await axios.get(process.env.REACT_APP_BACKEND_URL+"/sizesType")
                const caregory = await axios.get(process.env.REACT_APP_BACKEND_URL+"/category")

                const types_data = caregory?.data?.reduce((acc, curr) => ([...acc, ...curr.detail]),[])
    
                const combineData = {brands: brands_data.data,types: types_data,discounts: discount_data.data, category: caregory.data, sizesType:sizesType.data}
                console.log(combineData)
                setAtri_prod(combineData)
            }
        }
        handle_CallAIP()


    }, [trigger_Atrib])



    useEffect(() => {
    // set default value cho các form nhập
        if(checkObj(default_value)) {
            setValue('name', default_value.name || '');
            setValue('description', default_value.description || '');
            setValue('brand_id', default_value.brand_id || '');
            

            // PHƯƠNG ÁN TẠM THỜI. ĐỢI FIX VALUE Ở SELECT HOÀN TẤT
            setValue('type', atri_prod?.types?.find(i => i.type_name === default_value.type)?.id || '');
            setValue('discount_id', atri_prod?.discounts?.find(i => i.per === default_value.discount_id)?.id ?? ''); 
            /*ở discount_id dùng "??"" vì kết quả ở trc dấu "??" có thể trả về số 0 là falsy nên dùng ?? để chỉ áp dụng nullish */ 
            

        }
        
        // console.log(default_value)
    // }, [setValue, default_value])
    }, [])


    useEffect(() => {
        return () => {
            img && URL.revokeObjectURL(img.preview)
        }
    }, [img])

    useEffect(() => {
        // console.log(atri_prod_)
        // console.log(default_value)
    }, [])



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

    const validateFileImg = (file) => {
    // type của file là chuỗi dùng trong trường hợp đây là form update SP (vì default value có thuộc tính img là chuỗi tên ảnh vd:abv.png)
    // hàm validate này chấp nhận file là kiểu chuỗi 
        if(typeof file === "string") return true

        if (file) {
          const fileType = file?.type?.split('/')[0];
          if (fileType !== 'image') {
            return false;
          }
        }
        return true;
    };
    

    const handleAdd = (data) => {
            // value: sneaker, boot, sandal, ... => type id
        const default_type = (atri_prod.category.find(i => i.id === categorySelect_id).detail)[0]
        if(img && price && !isNaN(price) && validateFileImg(img) && price !== NaN) {
            const infor = {
                "name": data.name,
                "brand_id": data.brand_id || "ADIDAS",
                "price": +price,
                "img": img && img.name,
                "imgs": imgs_v2.map(i => i.name),
                "description": data.description,
                "type": +data.type || default_type?.id || 1,
                "discount_id": +data.discount_id,
                "inventory": inventory,
                "BC_color": colorBCImg_main
            }

            // account seller will have seller_id
            if(infor_user.role === "seller") {
                infor.seller_id = infor_user.accName
            }

            console.log(infor)
            
            console.log(imgs_v2)

    
            axiosJWT.post(process.env.REACT_APP_BACKEND_URL+"/shoes_add", infor, {
                headers: {Authorization: infor_user.accessToken}
                
            })
            .then(res => {
                toast.success("Thêm thành công")
            })
            .catch(err =>  toast.error("ERRORRRRRRRRRRR"))

            // HANDLE IMG POST

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

    const handleUpdate = (data) => {
        // console.log(data)
        if(!!parseInt(price)) {
            let data_update = {
                ...data,
                img: img.name || img,
                imgs: [...imgs_upd, ...imgs_v2.map(i => i.name)],
                price: +price,
                brand_id:data.brand_id,
                type: +data.type ,
                discount_id: +data.discount_id,
                inventory: inventory,
                BC_color: colorBCImg_main
            }

            // console.log({imgs_v2,imgs_upd,imgs_upd_del})
            // console.log(data_update)
    
            //  --update infor shoes
            axiosJWT.patch(process.env.REACT_APP_BACKEND_URL+`/shoes_update/${default_value.id}`,data_update,{
                headers: {Authorization: infor_user.accessToken}})
            .then(res => {
                console.log(res)
                trigger()
                toast.success("Sửa sản phẩm thành công")
    
            })
            .catch(err => {
                console.log(err)
                toast.error("SÚ")
            })
            //--------------------------- 

            // upload img (file)
            if(typeof img !== "string") {
                // check nếu img là giá trị mặc định (default_value img mang giá trị string)
                console.log({"img_add":img})
                const formdata_img = new FormData()
                formdata_img.append('file', img)
                axios.post(process.env.REACT_APP_BACKEND_URL+"/upload_img", formdata_img)
                .then(res => console.log(res))
                .catch(err => console.log(err))
                //  xóa ảnh img cũ
                axios.delete(process.env.REACT_APP_BACKEND_URL+"/delete_img/"+default_value.img)
            }
    
            // upload imgs (files)
            if(imgs_v2.length) {
                const formdata_imgs = new FormData()
                console.log({"imgs_add": imgs_v2})
                for (let i = 0; i < imgs_v2.length; i++) {
                    formdata_imgs.append("files", imgs_v2[i])
                }
                axios.post(process.env.REACT_APP_BACKEND_URL+"/upload_imgs", formdata_imgs)
                .then(res => console.log(res))
                .catch(err => console.log(err))
    
            }
    
            // delete imgs (files)
            if(imgs_upd_del.length) {
                console.log({"imgs_delete":imgs_upd_del})
                imgs_upd_del.forEach(i => {
                    axios.delete(process.env.REACT_APP_BACKEND_URL+"/delete_img/"+i)
                })
            }
        
        
        }
    
    }

    return ( <div className={cx(['wrapper', "add_product"])}>

        <div className={cx('left_side')}>

            <input type="file"
                onChange={handlePreviewImg_main}
                id="file"
                className={cx('add_imgSub_btn-off')}
                accept=".jpg, .jpeg, .png, .webp"

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
            {
                img && validateFileImg(img) === false ?  
                <FontAwesomeIcon className={cx("errFile_img")} icon={faFileCircleXmark}/> 
                : 
                // <img className={cx('img')} src={img.preview}/>
                img!=="" && <img className={cx('img')} src={  typeof img === 'string'  ? process.env.REACT_APP_BACKEND_URL+`/imgs/${img}`: img.preview }  alt="error"/>

            }

                {img === "" && <span className="text-danger m-3 d-inline-block ">không được bỏ trống mục này</span>}
                {validateFileImg(img) === false && <span className="text-danger m-3 d-inline-block ">Chỉ chấp nhận file ảnh</span> }
            
             
            </div>

            <div className={cx('product_img--sub')}>
            {
                Boolean(imgs_upd.length) && imgs_upd.map((item, index) => 
                    <div key={item} className={cx('imgsSub_update_modal')}>
                        <img src={process.env.REACT_APP_BACKEND_URL+'/imgs/'+item} alt="error"/>
                        <button
                            onClick={() => {
                                let preImgs = [...imgs_upd]
                                // setImgs_upd(preImgs.filter((item2,index2) => index2 !== index ))
                                setImgs_upd(preImgs.filter((item2,index2) => item2 !== item ))
                                setImgs_upd_del(pre => [...pre, item])
                            }}
                        >x</button>
                    </div>
                )
            }

            {
                Boolean(imgs_v2.length) && imgs_v2.map((item, index) =>
                    <div className={cx('img_sub')} key={index}>
                        <img src={item.preview}/>
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

        </div>

        <div className={cx('line-vertical')}></div>

        <div className={cx('right_side')}>

            <div className={cx('input_product')}>
                <label className={cx('label-product')}>hãng: </label>
                <select {...register("brand_id")}>
                {
                    atri_prod?.brands?.map(i => <option key={i.brand_id} value={i.brand_id}>{i.brand_id}</option>)
                }
                </select>
            {
                !isUpdateForm && infor_user.role!=="seller" &&
                <FontAwesomeIcon  className={cx('addAtribute_btn')} icon={faPlus}
                    onClick={() => {
                        setAtribName("brands")
                        handleShow()
                    }}  
                />
            }
            </div>

        {
            !isUpdateForm &&
            <div className={cx('input_product')}>
                <label className={cx('label-product')}>Danh Mục: </label>
                <select
                    {...register("category")}
                    onChange={(e) => {
                        // hàm onchange này thay đổi thì loại sản phẩm và size sẽ thay đổi theo để phù hợp với danh mục
                        // Làm trống số lượng của size ()
                        setQuantity_size([])

                        setCategorySelect_id(+e.target.value)
                        setInventory(quantity_product_size.find(i => i.category_id === +e.target.value).size.map( i=> {
                            return {
                                "quantity": 0,
                                "size": i
                            }
                        }))
                    }}
                >
                {
                    atri_prod?.category?.map(i => <option key={i.id} value={i.id}>{i.name}</option>)
                }
                </select>
                
            {
                !isUpdateForm && infor_user.role!=="seller" &&
                <FontAwesomeIcon  className={cx('addAtribute_btn')} icon={faPlus}
                    onClick={() => {
                        setAtribName("category")
                        handleShow()
                    }}  
                />
            }
                
            </div>
        }

            <div className={cx('input_product')}>
                <label className={cx('label-product')}>loại: </label>
                <select
                    {...register("type")}
                >
                {
                    isUpdateForm ?
                    // từ giá trị type của default => category_id bằng cách Array.find
                    atri_prod?.types?.filter(type => type.category_id === atri_prod?.types?.find(i => i.type_name === default_value.type).category_id).map(i => <option key={i.id} value={i.id}>{i.type_name}</option>)
                    :
                    atri_prod?.types?.filter(type => type.category_id === categorySelect_id).map(i => <option key={i.id} value={i.id}>{i.type_name}</option>)
                }
                </select>
            {
                !isUpdateForm && infor_user.role!=="seller" &&
                <FontAwesomeIcon className={cx('addAtribute_btn')} icon={faPlus}
                    onClick={() => {
                        setAtribName("types")
                        handleShow()
                    }}  
                />
            }
                
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
            {
                !isUpdateForm && infor_user.role!=="seller" &&
                <FontAwesomeIcon className={cx('addAtribute_btn')} icon={faPlus}
                    onClick={() => {
                        setAtribName("discounts")
                        handleShow()
                    }} 
                />
            }
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
            {
                !isUpdateForm &&
                <select
                    onChange={e => {
                        if(!quantity_size.includes(e.target.value)) {
                            setQuantity_size(pre => [...pre, e.target.value])
                        }
                        // console.log(quantity_size)
                    }}
                >
                {
                    // sizeValues.map((item, index) => <option value={item} key={index}>{item}</option>)
                    inventory.map((item) => <option value={item.size} key={item.size}>{item.size}</option>)

                }
                </select>
            }
                
                <div>
                {
                    quantity_size.map((item, index) => 
                        <div key={item} className={cx('quantity_size')}>
                            <span>{item}</span>
                            <input placeholder="Số lượng"
                                type="number" min="0"
                                // defaultValue={() => {
                                //     let findQuantity = inventory.find(i => i.size === item)?.quantity
                                //     return findQuantity
                                // }}
                                // defaultValue similar above but above not working   

                                defaultValue={inventory.find(i => i.size === item)?.quantity}
                              
                                onChange={(e) => {
                                    let tmpList = [...inventory]
                                    let newList = tmpList.map((item2, index2) => {
                                        if(item === item2.size) return {...item2, "quantity" : +e.target.value}
                                        return item2
                                    })
                                    setInventory(newList)
                                    // console.log(newList)
                                }}  
                            />
                            {
                                isUpdateForm && <QuantityModal idPro={default_value.id} size={item} quantity={inventory.find(i => i.size === item)?.quantity}/>
                            }
                        </div>
                    )
                }
                {
                    inventory.length === 1 && (
                        <div className={cx('quantity_size')}>
                            <input placeholder="Số lượng"
                                type="number" min="0"
                            />
                        </div>

                    )
                }
                </div>
            </div>


            <div className={cx('input_product')}>
                <label style={{display:'block'}} className={cx('label-product')}>mô tả: </label>
                <textarea className={cx('input_textarea') } {...register("description", { required: true })} ></textarea>
            {
                errors.description && <span className={cx('message_err')}>không được bỏ trống mục này</span>
            }
            </div>

        {
            isUpdateForm ?
            <button className={cx('button-54')} role="button"
                onClick={(e) => {
                    handleSubmit(handleUpdate)(e)
                    if(img == undefined) {
                        setImg("")
                    }
                    if(price === "0") {
                        setPrice("")
                    }
                }}
            >cập nhật</button>
            :
            <button
                href="http://localhost:3000/admin/addProducts" className={cx('button-54')} role="button"

                onClick={(e) => {
                  
                    handleSubmit(handleAdd)(e)
                    if(img == undefined) {
                        setImg("")
                    }
                    if(price === "0") {
                        setPrice("")
                    }

                }}
            >thêm</button>
        }

        </div>
      
    {
        show && <Modal_modify_atribute show={show} attrib_name={atribName}  handleClose={handleClose} atri_prod={atri_prod} setTrigger_Atrib={setTrigger_Atrib}/>

    }
       
    </div> );
}


const Modal_modify_atribute = ({show, handleClose, atri_prod, setTrigger_Atrib, attrib_name}) => {

    const [attrib, setAttrib] = useState(attrib_name)

    const input_add = useRef("");

    const attrib_list = [{id:"brands",name:"Thương hiệu"}, {id:"category",name:"Danh mục"}, {id:"discounts",name:"Khuyến mãi"}, {id:"types",name:"loại"}]
    const [category_type, setCategory_type] = useState((atri_prod.category[0]).id)

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
            axios.post(process.env.REACT_APP_BACKEND_URL+`/${attrib}`, {type_name:value, category_id:category_type})
        }
        else if (attrib === "category") {
            axios.post(process.env.REACT_APP_BACKEND_URL+`/${attrib}`, {name:value})
        }
        input_add.current.value = ""
    }
    const handleChangeCategoryInType = (e, types_id) => {
        axios.patch(process.env.REACT_APP_BACKEND_URL+`/types/${types_id}`, {"category_id":e.target.value})
        setTrigger_Atrib(pre => !pre)

    }
    const handleChangeCategory_TypeSize = (category_id, sizesValue_id) => {
        axios.patch(process.env.REACT_APP_BACKEND_URL+`/category/${category_id}`, {"sizesValue_id":sizesValue_id})
        setTrigger_Atrib(pre => !pre)

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
                            <th scope="col">Gía Trị</th>
                        {
                            attrib === "types" &&  <th scope="col">Danh Mục</th>
                        }
                        {
                            attrib === "category" &&  <th scope="col">Loại size</th>
                        }
                            <th scope="col">Chức Năng</th>
                            </tr>
                        </thead>
                        <tbody>

                    {
                        attrib === "category" &&
                        atri_prod[attrib].map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.name}</td>
                                <td>
                                    <select defaultValue={item.sizesValue_id}  className={cx("category_SelectInTypes")} onChange={e => handleChangeCategory_TypeSize(item.id, e.target.value)}>
                                    {
                                        atri_prod?.sizesType?.map(value => <option key={value} value={value} >{value}</option>)
                                    }
                                    </select>
                                </td>
                                <td>
                                    <ConfirmModal className={cx("atrib_del_btn")} btnText="x" title="XÓA LOẠI SẢN PHẨM" body={<div>Bạn có muốn xóa danh mục <b>{item.name}</b> không ?</div>}
                                        accept={() => handle_delete(item.id)}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                    {
                        attrib === "types" &&
                        atri_prod[attrib].map((type, index) => (
                            <tr key={type.id}>
                                <th scope="row">{index}</th>
                                <td>{type.type_name}</td>
                                <td>
                                    <select defaultValue={type.category_id} className={cx("category_SelectInTypes")} onChange={e => handleChangeCategoryInType(e, type.id)}>
                                    {
                                        atri_prod["category"].map(i => <option key={i.id} value={i.id} 
                                            // selected={i.id === type.category_id}
                                            >{i.name}</option>
                                        )
                                    }
                                    </select>
                                </td>
                                <td>
                                    <ConfirmModal className={cx("atrib_del_btn")} btnText="x" title="XÓA LOẠI SẢN PHẨM" body={<div>Bạn có muốn xóa loại <b>{type.type_name}</b> không ?</div>}
                                        accept={() => handle_delete(type.id)}
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
                            {
                                attrib === "types" &&
                                <td>
                                    <select className={cx("category_SelectInTypes")} onChange={(e) => setCategory_type(e.target.value)}>
                                    {
                                        atri_prod["category"].map(i => <option key={i.id} value={i.id} 
                                            // selected={i.id === type.category_id}
                                            >{i.name}</option>
                                        )
                                    }
                                    </select>
                                </td>
                            }
                                <td>
                                    <button className={cx("atrib_add_btn")}
                                        onClick={() => {
                                            // console.log(input_add.current.value)
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



function QuantityModal({size,idPro, quantity}) {
    let infor_user = JSON.parse(localStorage.getItem("tokens"))


    const [showM_Quantity, setShowM_Quantity] = useState(false);
    const handleCloseM_Quantity = () => setShowM_Quantity(false);
    const handleShowM_Quantity = () => setShowM_Quantity(true);
    const [quan_input, setQuan_input] = useState(0)

    const handleSubmit = () => {
        const dataPost = {
            "product_id":idPro,
            "quantity": +quan_input,
            "size": size
        }
        // console.log(dataPost)
        axiosJWT.post(process.env.REACT_APP_BACKEND_URL+`/import_prod`,dataPost, {
            headers: {Authorization: infor_user.accessToken}
        })
        .then(res => {
            toast.success(res.data)
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
                <Modal.Title>NHẬP/XUẤT KHO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p className={cx("modalQuantity_size")}>Size: {size}</p>
                        <p>Số lượng trong kho: <b>{quantity}</b></p>

                        <span>Nhập số lượng:</span>
                        <input className={cx('input_quantity')} placeholder='Số lượng' type='number' 
                            onChange={e => setQuan_input(e.target.value)}
                        />
                        <p>*Chú ý: Muốn giảm số lượng thì nhập số âm</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className={cx(['btnModal', 'line'])} onClick={handleCloseM_Quantity}>Đóng</button>
                    <button className={cx(['btnModal', 'yes'])} onClick={handleSubmit}>Lưu</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}



export default AddProducts;