import 'bootstrap/dist/css/bootstrap.min.css';

import classNames from "classnames/bind";
import styles from "./Confirming.module.scss"
import {toast } from 'react-toastify';

import axios from "axios";
import { useEffect, useState } from "react";
import {formatPrice} from "../../common"

// bootstrap
import Modal from 'react-bootstrap/Modal';


// icon
import { faCircle, faCircleInfo, faClipboardCheck, faClockRotateLeft, faTrashCan, faTruck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ConfirmModal from '../../components/ConfirmModal';
import { CardOrder } from '../PurchaseOrder';
import { createAxios } from '../../createInstance';
import ConfirmModal_v2 from '../../components/ConfirmModal_v2';
import { faCalendar, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { date } from 'yup';


let axiosJWT = createAxios()

const cx = classNames.bind(styles)

function Confirming() {
    let infor_user = JSON.parse(localStorage.getItem("tokens"))
 
    const [order_detail, setOrder_detail] = useState({})


    const [checkChange, setCheckChange] = useState(false)
    

    const [showDetail, setShowDetail] = useState(false);
    const handleClose_detail = () => setShowDetail(false);
    const handleShow_detail = () => setShowDetail(true);


    const pagName = ['chờ xác nhận','đang giao','hoàn thành']
    // 0:
    // 1: pending
    // 2: delivery
    // 3: complete
    const [pagCurr, setPagCurr] = useState(1)
    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        const controller = new AbortController()
        const paramsSellerID = window.location.href.split("=")[1]
        const urlGetOrder = paramsSellerID ? 
            process.env.REACT_APP_BACKEND_URL+`/orders?_status=${pagCurr}&_sellerId=${paramsSellerID}` 
            :
            process.env.REACT_APP_BACKEND_URL+`/orders?_status=${pagCurr}`
            
        axiosJWT.get(urlGetOrder, {
            headers: {Authorization: infor_user.accessToken}
        },  {signal:controller.signal})
        .then(res => {
            setOrders(res.data)
        })
        
        return () => controller.abort()
    },[pagCurr, checkChange])

    const handleCancel = (id) => {
        axiosJWT.delete(process.env.REACT_APP_BACKEND_URL+`/orders/`+id, {
            headers: {Authorization: infor_user.accessToken}
        })
        .then(res => {
            toast("Xóa đơn hàng thành công", {
                theme: "light",
                position: "top-center",
            })

            // MỤC ĐÍCH ĐỂ KÍCH HOẠT CHẠY DEPEDENCY TRONG SIDE EFFECT
            setCheckChange(pre => !pre)
        })
        .catch(err => console.log(err))

    }

    // axiosJWT.get(urlGetOrder, {
    //     headers: {Authorization: infor_user.accessToken}
    // })

    const confirm_product = (order_id, status) => {
        axiosJWT.patch(process.env.REACT_APP_BACKEND_URL+`/orders/${order_id}`, {"status": status}, {
            headers: {Authorization: infor_user.accessToken}
        })
        .then(res => {
            console.log("Xac thuc thanh cong")
            setCheckChange(pre => !pre)
        })
        .catch(err => console.log(err))

    }


    const handleOrderDetail = (item) => {
        axiosJWT.get(process.env.REACT_APP_BACKEND_URL+"/accounts/"+item.client_id, {
            headers: {Authorization: infor_user.accessToken}
        })
        .then(res => {
            setOrder_detail({...item, ...res.data})
        })

    }

   

    return ( 
        <div className={cx('wrapper')}>
            <h1>QUẢN LÝ ĐƠN HÀNG</h1>
            <ConfirmModal_v2 fullscreen={true} body={<Find_order/>}>
                <button className={cx("find_order")}>Tìm kiếm đơn <FontAwesomeIcon icon={faCalendarDays}/></button>
            </ConfirmModal_v2>

            <ul className={cx('navigate')} >
            {
                pagName.map((item,index) => <li key={item} className={ cx({"li_active":index+1 ===pagCurr}) }
                    onClick={() => {
                        setPagCurr(index+1)
                    }}
                >
                    {item} 
                </li>)
            }
            </ul>

{/*  */}
            
            <div className={cx("table_order")}>
                <table className="table table-hover">
                    <thead>
                        <tr className='table-info'>
                            <th scope="col">mã đơn hàng</th>
                            <th scope="col">tài khoản</th>
                            <th scope="col">ngày đặt</th>
                            <th scope="col">địa chỉ</th>
                            <th scope="col">tổng tiền</th>
                        {
                            pagCurr !==3 && <th scope="col">duyệt</th>
                        }

                        {
                            pagCurr !==1 && <th scope="col">thu hồi</th>
                        }                    
                            
                            <th scope="col">chi tiết</th>
                        {
                            pagCurr !==3 && <th scope="col">xóa</th>
                        }
                        </tr>
                    </thead>

                    <tbody>
                    {
                        orders.map((item_order, index) =>
                            <tr key={index} className={cx("row_order")}>
                                <td >{item_order.id}</td>
                                <td>{item_order?.client_id}</td>
                                <td>{item_order.date_order}</td>
                                <td>{item_order.address}</td>
                                {/* <td>{item_order.description}</td> */}
                                <td>{formatPrice(item_order?.amount)}</td>
                            {
                                item_order.status !== 3 &&
                                <td className={cx(['btn_product','confirm'])}
                                    onClick={() => {
                                        handleOrderDetail(item_order)
                                    }}
                                >
                                    <ConfirmModal
                                        title={item_order.status===2?"XÁC NHẬN ĐƠN HOÀN THÀNH":"XÁC NHẬN ĐƠN HÀNG"}
                                        body={`Bạn có muốn xác nhận đơn hàng mã ${item_order.id} ?`}
                                        btnText={<FontAwesomeIcon icon={item_order.status===2?faClipboardCheck:faTruck}/>}
                                        accept={() =>{
                                            if(item_order.status===1) {
                                                // confirm_product_delivery(item_order.id)
                                                confirm_product(item_order.id, 2)

                                            }
                                            else if(item_order.status===2) {
                                                // confirm_product_complete(item_order.id)
                                                confirm_product(item_order.id, 3)

                                            }
                                            // setCheckChange(pre => !pre)
                                        }}
                                    />
                                </td>
                            }

                            {
                                pagCurr !==1 &&
                                <td className={cx(['btn_product'])}>
                                    <ConfirmModal
                                        title="THU HỒI ĐƠN HÀNG"
                                        body={`Bạn có muốn thu hồi đơn hàng mã ${item_order.id} ?`}
                                        btnText={<FontAwesomeIcon icon={faClockRotateLeft}/>}
                                        accept={() =>{
                                            confirm_product(item_order.id,item_order.status-1)

                                            setCheckChange(pre => !pre)
                                        }}
                                    />
                                </td>
                            }
                            
                                <td className={cx(['btn_product','detail'])}
                                    onClick={() => {
                                        handleShow_detail()
                                        handleOrderDetail(item_order)
                                    }}
                                >
                                    <button><FontAwesomeIcon icon={faCircleInfo}/></button>
                                </td>
                            {
                                item_order.status !== 3 &&
                                <td className={cx(['btn_product','cancle'])}>
                                    <ConfirmModal
                                        title="HỦY ĐƠN HÀNG"
                                        body={`Bạn có muốn xóa đơn hàng mã ${item_order.id} ?`}
                                        btnText={<FontAwesomeIcon icon={faTrashCan}/>}
                                        accept={() =>{
                                            handleCancel(item_order.id)
                                        }}
                                    />
                                </td>
                            }
                                
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

{/*  */}

            <Modal show={showDetail} onHide={handleClose_detail} centered
                size="lg"
            > 
                <Modal.Header closeButton>
                    <Modal.Title><h1>CHI TIẾT ĐƠN HÀNG</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('modal_wrapper_detail')}>
                        <div className={cx('infor_product')}>
                        {
                            order_detail.products &&
                            order_detail.products.map((item, index) => <CardOrder data={item} status={order_detail.status}/>)
                        }
                        </div>
                        <div className={cx('infor_delivery')}>
                            <h1>Thông Tin</h1>
                            <p><span>Tên khách hàng</span>: {order_detail.fullName}</p>
                            <p><span>Địa chỉ</span>: {order_detail.address}</p>
                            <p><span>Email</span>: {order_detail.email}</p>
                            <p><span>SĐT</span>: {order_detail.phoneNumber}</p>

                            <p><span>Ghi chú</span>: {order_detail.description}</p>
                            {/* TESTING... */}
                            
                            <p className={cx('amount_order')}>Tổng: {formatPrice(order_detail?.amount)}</p>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className={cx(['btnModal'])}onClick={handleClose_detail}>đóng</button>
                </Modal.Footer>
                
            </Modal>

        </div>
    );
}

const Find_order = ({}) => {
    const [orders, setOrders] = useState([])
    const [inputDate, setInputDate] = useState({day:0, month:0, year:0})

    const onChange = (e)=> {
        setInputDate( pre => ({...pre, [e.target.name]:e.target.value}) )
    }

    useEffect(() => {

    }, [])

    const day_option = 31, month_option = 12, year_option=(new Date()).getFullYear()
    const selectYear = (begin, end) => {
        let arrYear = []
        for(let i = begin; i<=end; i++) {
           arrYear.push(i) 
        }
        return arrYear
    }
    const handleFind = async () => {
        try {
            let api = process.env.REACT_APP_BACKEND_URL+"/orders?"
            if(+inputDate.day) {
                api+=`&_day=${inputDate.day}`
            }
            if(+inputDate.month) {
                api+=`&_month=${inputDate.month}`
            }
            if(+inputDate.year) {
                api+=`&_year=${inputDate.year}`
            }
            const infor_user = JSON.parse(localStorage.getItem("tokens"))
            const orders_callAPI = await axiosJWT.get(api, {headers: {Authorization: infor_user.accessToken}})
            setOrders(orders_callAPI.data)
            
        } catch (error) {
            console.log(error)
            throw new Error('Đã xảy ra lỗi khi gọi API: ' + error.message);
        }
    }


    return (
        <div>
            <div className={cx("input_Date")}>
                <select onChange={onChange} name="day">
                    <option value={0} >Ngày</option>
                    {Array(day_option).fill(0).map((_, index) => <option key={index+1} value={index+1}>{index+1}</option>)}
                </select>

                <select onChange={onChange} name="month">
                    <option value={0} >Tháng</option>
                    {Array(month_option).fill(0).map((_, index) => <option key={index+1} value={index+1}>{index+1}</option>)}
                </select>

                <select onChange={onChange} name="year">
                    <option value={0} >Năm</option>

                {
                    selectYear(2020, year_option).map((i) => <option key={i} value={i}>{i}</option>)
                }
                </select>
                <button onClick={handleFind}>Tìm Kiếm</button>

            </div>

            <table className="table table-hover">
                <thead>
                    <tr className='table-info'>
                        <th scope="col">mã đơn hàng</th>
                        <th scope="col">tài khoản</th>
                        <th scope="col">ngày đặt</th>
                        <th scope="col">địa chỉ</th>
                        <th scope="col">trạng thái</th>
                        <th scope="col">tổng tiền</th>
                    </tr>
                </thead>

                <tbody>
                {
                    orders.map((item_order, index) =>
                        <tr key={index} className={cx("row_order")}>
                            <td >{item_order.id}</td>
                            <td>{item_order?.client_id}</td>
                            <td>{item_order.date_order}</td>
                            <td>{item_order.address}</td>
                            {/* <td>{item_order.description}</td> */}
                            <td>{item_order?.status}</td>
                            <td>{formatPrice(item_order?.amount)}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            {
                !orders.length && 
                <h1 className={cx("messagge_not_found")}>Không Có Đơn Hàng nào</h1>
            }
        </div>
    )
}

export default Confirming;