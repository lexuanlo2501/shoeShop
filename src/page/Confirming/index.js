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

const cx = classNames.bind(styles)

function Confirming() {
 
    const [order_detail, setOrder_detail] = useState({})


    const [checkChange, setCheckChange] = useState(false)
    

    const [showDetail, setShowDetail] = useState(false);
    const handleClose_detail = () => setShowDetail(false);
    const handleShow_detail = () => setShowDetail(true);


    const pagName = ['tất cả','chờ xác nhận','đang giao','hoàn thành']
    // 0:
    // 1: pending
    // 2: delivery
    // 3: complete
    const [pagCurr, setPagCurr] = useState(0)
    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+`/orders?_status=${pagCurr}`)
        .then(res => {
            setOrders(res.data)
        })
    },[pagCurr, checkChange])

    const handleCancel = (id) => {
        axios.delete(process.env.REACT_APP_BACKEND_URL+`/orders/`+id)
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

    const confirm_product = (order_id, status) => {
        axios.patch(process.env.REACT_APP_BACKEND_URL+`/orders/${order_id}`, {"status": status})
        .then(res => {
            console.log("Xac thuc thanh cong")
        })
        .catch(err => console.log(err))

    }


    const handleOrderDetail = (item) => {
        axios.get(process.env.REACT_APP_BACKEND_URL+"/accounts/"+item.client_id)
        .then(res => {
            setOrder_detail({...item, ...res.data})
        })

    }

   

    return ( 
        <div className={cx('wrapper')}>
            <h1>QUẢN LÝ ĐƠN HÀNG</h1>
             <ul className={cx('navigate')} >
            {
                pagName.map((item,index) => <li key={item} className={ cx({"li_active":index ===pagCurr}) }
                    onClick={() => {
                        setPagCurr(index)
                    }}
                >
                    {item}
                </li>)
            }
            </ul>

{/*  */}
            

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
                        <tr key={index}>
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
                                        setCheckChange(pre => !pre)
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
                                order_detail.products.map((item, index) => 
                                    <div className={cx('infor_product__item')} key={index}>
                                        
                                        <img src={`http://localhost:5000/imgs/${item.img}`} alt="error"/>

                                        <div>
                                            <p>{item.name}</p>
                                            <p>size: {item.size}</p>
                                            <p>x {item.quantity}</p>
                                            <p>{formatPrice(item?.price)}</p>
                                        </div>
                                    </div>
                                )
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

export default Confirming;