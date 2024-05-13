import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from "classnames/bind"
// import styles from './modifyProducts.module.scss'
import styles from '../AddProducts/admin.module.scss'
import './modifyProducts.scss'
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom"



// boostrap

import axios from "axios";
import { useEffect, useState } from "react";


import { faFileImage, faFilter, faLock, faSearch, faUnlock } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import { formatPrice } from '../../common';
import ConfirmModal_v2 from '../../components/ConfirmModal_v2'
import {listColorBC} from "../../common"
import RangeSlider from 'react-range-slider-input';


import AddProducts from '../AddProducts';
import { createAxios } from '../../createInstance';

const cx = classNames.bind(styles)
let axiosJWT = createAxios()




const handleClickScroll = () => {
    const element = document.getElementById('scrollTo');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}


// object into string
function objectToQueryString(obj) {
    const queryString = Object.keys(obj)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&');
    
    return queryString;
  }



function ModifyProducts() {
    let infor_user = JSON.parse(localStorage.getItem("tokens"))


    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [brand, setBrand] = useState("")
    const [products, setProducts] = useState([])

    const [checkUpd, setCheckUpd] = useState(true)
    const [isErrSearch, setIsErrSearch] = useState(false)

    const [numberOfPage, setNumberOfPage] = useState([])

    // search
    const [price, setprice] = useState([0, 30000000])
    const [adv_option, setAdv_option] = useState({_type:"",_string:"",_isDiscount:""})
    const [select_prod, setSelect_prod] = useState([])

    // 
    const [optionDiscount, setOptionDiscount] = useState("remove")
    const  [optionDiscount_id, setOptionDiscount_id] = useState(0)


    const [atri_prod, setAtri_prod] = useState({}) // {brands: [],types: [],discounts: []}
        
    let currentUrl = window.location.href;
    let param = currentUrl?.split("?")[1]
    let paramToObject = param && JSON.parse('{"' + decodeURI(param?.replace(/&/g, "\",\"")?.replace(/=/g,"\":\"")) + '"}') || {}

    const limit = paramToObject._limit

    const arrPage = (n) => {
        let arr = Array(Math.ceil(n/limit)).fill(0).map((_, index) => index+1)
        return arr
    }

    // ADMIN
    useEffect(() => {
        const controller = new AbortController()
        const handle_CallAIP = async () => {
            const brands_data = await axios(process.env.REACT_APP_BACKEND_URL+"/brands", {signal:controller.signal})
            const types_data = await axios(process.env.REACT_APP_BACKEND_URL+"/types", {signal:controller.signal})
            const discount_data = await axios(process.env.REACT_APP_BACKEND_URL+"/discounts", {signal:controller.signal})
            const caregory_data = await axios(process.env.REACT_APP_BACKEND_URL+"/category", {signal:controller.signal})

            const combineData = {brands: brands_data.data, types: types_data.data, discounts: discount_data.data, caregory: caregory_data.data}
            // console.log(combineData)
            setAtri_prod(combineData)
        }
        handle_CallAIP()

        return () => controller.abort()
    }, [])


    useEffect(() => {
        setLoading(true)

        // const url = !brand ? process.env.REACT_APP_BACKEND_URL+'/shoes' : process.env.REACT_APP_BACKEND_URL+`/shoes?_brand=${brand}`
        const url =process.env.REACT_APP_BACKEND_URL+ `/shoes?${param}`
        // console.log(url)
        // console.log(param)

        const controller = new AbortController()
        axios.get(url, {signal:controller.signal})
        .then(res => {
            // console.log(res.data)
            setProducts(res.data)
            setLoading(false)
            setIsErrSearch(false)

            
            const xTotalCount = res.headers['x-total-count']
            setNumberOfPage(arrPage(xTotalCount))
            // console.log(arrPage(xTotalCount))

        })
        .catch(err => {
            // setLoading(true)

        })

        return () => controller.abort()
    }, [brand, checkUpd])

    
   

    // func
    const handleDel = (id_product_v) => {
        axiosJWT.delete(process.env.REACT_APP_BACKEND_URL+`/shoes_delete/${id_product_v}`, {
            headers: {Authorization: infor_user.accessToken}
        })
        .then(res => {
            toast.success("xóa sản phẩm thành công")


            setCheckUpd(pre => !pre)
        })
        .catch(() => {
            toast.error("SÚ")
        })
    }

    const handleLockPord = (prodID) => {
        const currentStatusProd = (products.find(i => i.id === prodID)).isLock
        axiosJWT.patch(process.env.REACT_APP_BACKEND_URL+`/shoes_update/${prodID}`,{isLock:currentStatusProd ? 0 : 1}, {
            headers: {Authorization: infor_user.accessToken}
        })
        .then(res => {
            setCheckUpd(pre => !pre)
        })
        .catch(err => {
            console.log(err)
        })
    }



    return (
        <div className={cx('wrapper')}>
            <div className={cx('list_product')}>
                <div className={cx(['search_bar'])}>
                    <div className={cx(['search_product_byID',"option"])}>
                        <label>mã SP</label>
                        <div className={cx("input_search")}>
                            <input placeholder='010101001' type='text' className='getID_search'/>
                            <button
                                onClick={() => {
                                    let id = document.querySelector('.getID_search').value
                                    id = id.replace(/ /gi, "")
                                    id &&
                                    axios.get(process.env.REACT_APP_BACKEND_URL+`/shoes/${id}`)
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

                    <div className={cx(["option","mb_2_custom"])}>
                        <label>hãng</label>
                        <br/>
                        <select
                            className={cx('search_brand')}
                            onChange={e => {
                                setBrand(e.target.value)
                                navigate("/admin/modifyProducts?_brand="+e.target.value)
                            }}
                        >
                            <option value="">tất cả</option>
                        {
                            atri_prod?.brands?.map(brand =>  <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_id}</option>)
                        }
                        </select>
                    </div>
                    
                    <ConfirmModal_v2

                        title="TÌM KIẾM NÂNG CAO"
                        body={
                            <div className={cx("filter_wrapper")}>
                                <div className={cx("filter_option")}>
                                    <input id="isDiscount" type='checkbox'
                                        onChange={(e) => setAdv_option(pre => ({...pre, _isDiscount:e.target.checked}))}
                                    />
                                    <label className='mx-3' htmlFor="isDiscount">Đang khuyến mãi</label>
                                </div>
                                <div className={cx(["filter_option","prod_name"])}>
                                    <input placeholder='Nhập tên sản phẩm . . . . . .'
                                        onChange={e => setAdv_option(pre => ({...pre,_string:e.target.value}))}
                                    />
                                </div>
                                <div className={cx("filter_option")}>
                                    <p>- Loại</p>
                                    <ul>
                                    {
                                        atri_prod?.types?.map(type => (
                                            <li className={cx('select_type-Brand')} key={type.id}>
                                                <input id={"t"+type.id} name="type_prod" value={type.id} type="radio"
                                                    onChange={e => setAdv_option(pre => ({...pre,_type:e.target.value}))}
                                                /> <label className='mx-3' htmlFor={"t"+type.id}>{type.type_name}</label>
                                            </li>
                                        ))
                                    }
                                    </ul>
                               
                                </div>
                                <div className={cx("filter_option")}>
                                    <div>
                                        <p className={cx('price_slice')}>- Lọc Theo Giá:</p>
                                        <span>{price[0].toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span> - <span>{price[1].toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                                    </div>
                                    <RangeSlider 
                                        id="range-slider-yellow"
                                        value={price} onInput={setprice}
                                        min={0}
                                        max={10000000}
                                        step={10000}
                                    />
                                </div>

                            </div>
                        }
                        accept={() => {
                            const params_option = {...adv_option, _min:price[0], _max:price[1]}
                            console.log(objectToQueryString(params_option))
                            console.log(param)
                            navigate("/admin/modifyProducts?"+objectToQueryString(params_option))
                            setAdv_option({_type:"",_string:"",_isDiscount:""})
                            setCheckUpd(pre => !pre)
                        }}
                    >
                        <button className={cx(["filter_btn","option","mb_2_custom"])}>
                            <span>NÂNG CAO</span>
                            <FontAwesomeIcon icon={faFilter}/>
                        </button>
                    </ConfirmModal_v2>

               

                {
                    !!select_prod.length &&
                    <ConfirmModal_v2
                        accept={() => {
                            console.log(select_prod)
                            axios.post(process.env.REACT_APP_BACKEND_URL+"/modify_discount", {
                                "list": select_prod,
                                "action":optionDiscount,
                                "discount_id": optionDiscount_id
                            })
                            .then(_ => toast.success("Thay đổi khuyến mãi thành công"))

                            setOptionDiscount_id(0)
                            setSelect_prod([])
                            var x = document.getElementsByClassName("checkbox");
                            for(let i=0; i<x.length; i++) {
                                x[i].checked = false;
                            }
                            setCheckUpd(pre => !pre)
                        }}
                        body={
                            <div className={cx("body_modifyDiscount")}>
                            
                                <div className={cx("option_discount")}>
                                    <button onClick={() => setOptionDiscount("remove")} className={cx({"option_active":optionDiscount==="remove"})}>Gỡ</button>
                                    <button onClick={() => setOptionDiscount("add")} className={cx({"option_active":optionDiscount==="add"})}>Đổi</button>
                                </div>
                            {
                                optionDiscount === "add"
                                &&
                                <select className={cx('select_ModifyDiscount')} onChange={(pre) => setOptionDiscount_id(pre.target.value)}>
                                {
                                    atri_prod?.discounts?.map(i => <option key={i.id} value={i.id}>{i.per}%</option>)
                                }
                                </select>
                            }

                            </div>
                        }
                    >
                        <button className={cx(["removeDiscount_btn","option","mb_2_custom"])} >Thay đổi khuyến mãi</button>
                    </ConfirmModal_v2>
                }
                </div>

                {
                loading ? 
                <SyncLoader color="rgba(54, 215, 183, 1)" /> 
                :
                <div className={cx("tabel_product")}>
                    <table className='table table-hover'>
                        <thead>
                            <tr className="table-primary">
                                <th scope="col" >Chọn</th>
                                <th scope="col" >STT</th>
                                <th scope="col" >ID</th>
                                <th scope="col"  className='product_name'>tên SP</th>
                                <th scope="col" >giá</th>
                                <th scope="col" >giảm giá</th>
                                <th scope="col" >mô tả</th>
                                <th scope="col" >đã bán</th>
                                <th scope="col" >ảnh</th>
                                <th scope="col" >màu nền</th>
                                <th scope="col" >khóa</th>
                                <th scope="col" >xóa</th>
                                <th scope="col" >sửa</th>

                            </tr>
                        </thead>
                        <tbody>
                        {
                            Boolean(products.length) && products.map((item, index) => 
                                <tr key={item.id}>
                                    <td scope="col" >
                                        <label className={cx("form-control")}>
                                            <input type="checkbox" name="checkbox" value={item.id} className='checkbox'
                                                
                                                onChange={(e) => {
                                                    setSelect_prod(pre => {
                                                        if([...pre].includes(e.target.value)) {
                                                            return pre.filter(i => i !== e.target.value)
                                                        }
                                                        else {
                                                            return [...pre, e.target.value]
                                                        }
                                                    })
                                                }}
                                            />
                                        </label>
                                    </td>
                                    <th scope="row">{(+paramToObject?._page-1)*limit +  index+1}</th>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{formatPrice(item.price)}</td>
                                    <td>{item.discount_id ? <span className={cx("discount_tag")}>{item.discount_id}%</span> : <span className={cx("non_discount_tag")}>__</span>} </td>
                                    <td >
                                        <div className='description'>
                                            {item.description}
                                        </div>
                                    </td>
                                    <td>{item.sold}</td>
                                    <td>
                                        <img src={process.env.REACT_APP_BACKEND_URL+`/imgs/${item?.img}`} alt="error"/>
                                    </td>
                                    
                                    <td className={cx('tdClass_BCcolor')}>
                                        <span className={cx(item.BC_color)}></span>
                                    </td>
                                    <td style={{verticalAlign: "middle"}}>
                                    {
                                        <button className={cx(['status_btn',{"lock":item.isLock===0, "unlock":item.isLock===1}])}
                                            onClick={() => handleLockPord(item.id)}
                                        >
                                            <FontAwesomeIcon icon={item.isLock? faUnlock : faLock}/>
                                            <span>{item.isLock? "Mở" : "Khóa"}</span>
                                        </button>
                                    }
                                    </td>
                                    <ConfirmModal_v2
                                        title={`Xóa Sản Phẩm  -  ID: ${item.id}`}
                                        body={`Bạn có muốn xóa sản phẩm này`}
                                        accept={() => {handleDel(item.id)}}
                                    >
                                        <td className={cx(['btn_modify','del'])}>
                                            <FontAwesomeIcon className={cx('btn_modify')} icon={faTrashCan}/>
                                        </td>
                                    </ConfirmModal_v2>

                                    <ConfirmModal_v2
                                        fullscreen={true}
                                        title={`Sửa Sản Phẩm  -  ID: ${item.id}`}
                                        body={<AddProducts default_value={{...item}} atri_prod_={atri_prod} isUpdateForm={true} trigger={() => {setCheckUpd(pre => !pre)}}/>}
                                        onClick={() => {
                                            // console.log(item)
                                        }}
                                    >
                                        <td className={cx(['btn_modify','upd'])}>
                                            <FontAwesomeIcon className={cx('btn_modify')} icon={faPenToSquare}/>
                                        </td>
                                    </ConfirmModal_v2>
                                </tr>
                            )
                        }


                        </tbody>
                        
                    </table>
                </div>
                }

                <div className={cx('pagination')}>
                    <div className={cx('pagination_container')}>
                {
                    numberOfPage.map((item, index) => 
                    {
                        let active = +paramToObject?._page  === item ? 'active' : ''
                        return (
                            <Link 
                                key={index} 
                                onClick={ () => { 
                                    // 
                                    setCheckUpd(pre => !pre)
                                    handleClickScroll()
                                }}
                                className={cx(['page_number', active])}
                                // to={`/shoes?${param?.replace(`page=${paramToObject._page}`,`page=${item}`)}`} 
                                to={`/admin/modifyProducts?${param?.replace(`page=${paramToObject._page}`,`page=${item}`)}`} 
                                
                            >
                                {item}
                            </Link>
                        )
                    })
                }
                    </div>
                </div>


            </div>



        </div>
    )
}







export default ModifyProducts