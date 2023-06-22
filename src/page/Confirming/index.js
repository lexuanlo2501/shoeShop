import 'bootstrap/dist/css/bootstrap.min.css';

import classNames from "classnames/bind";
import styles from "./Confirming.module.scss"

import axios from "axios";
import { useEffect, useState } from "react";

// bootstrap
import Modal from 'react-bootstrap/Modal';


// icon
import { faCircle, faCircleInfo, faClipboardCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ConfirmModal from '../../components/ConfirmModal';
import e from 'cors';
import { object } from 'yup';

const cx = classNames.bind(styles)

function Confirming() {
    const [orders_NC, setOrders_NC] = useState([])
    const [orders_C, setOrders_C] = useState([])
    const [orders_deli, setOrders_deli] = useState([])
    const [idProduct_C, setIdProduct_C] = useState('')
    const [order_detail, setOrder_detail] = useState({})


    const [checkChange, setCheckChange] = useState(false)

    const [showConfirm, setShowConfirm] = useState(false);
    const handleClose_confirm = () => setShowConfirm(false);
    const handleShow_confirm = () => setShowConfirm(true);

    const [showDetail, setShowDetail] = useState(false);
    const handleClose_detail = () => setShowDetail(false);
    const handleShow_detail = () => setShowDetail(true);
    



    // const [idOder_C, setIdOder_C] = useState('')


    const confirm_product = (idOder_C) => {
        // console.log(order_detail.products)
        let arr = order_detail.products.map((item, index) => {
            return {
                ...item,
                indexC: item.product.inventory.map(i => i.size).indexOf(item.size),
                inventory : item.product.inventory, 
            }
        })

        
        arr.forEach(e => {
            delete e.product
            e.inventory[e.indexC] = {
                size:e.size, 
                quantity: Number( e.inventory[e.indexC].quantity) - e.quantity  + ""
            }
        });
        
        console.log(arr)

        arr.forEach(e => {
            axios.patch(`http://localhost:4000/data/${e.id}`,{"inventory":e.inventory})
            
        })
        

        axios.patch(`http://localhost:4000/orders/${idOder_C}`, {"status": 2})
    }

    const confirm_product_complete = (idOder_C) => {
        axios.patch(`http://localhost:4000/orders/${idOder_C}`, {"status": 3})
    }


    useEffect(() => {
        axios.get('http://localhost:4000/orders')
        .then(res => {
            // console.log(res.data)
            setOrders_NC(res.data.filter(item => item.status === 1))
            setOrders_C(res.data.filter(item => item.status === 3))
            setOrders_deli(res.data.filter(item => item.status === 2))

        })
    }, [checkChange])

    return ( 
        <div className={cx('wrapper')}>
            <h1>đơn đang chờ xác nhận</h1>
            <table className="table table-hover">
                <thead>
                    <tr className='table-info'>
                        <th scope="col">mã đơn hàng</th>
                        <th scope="col">ngày đặt</th>
                        <th scope="col">địa chỉ</th>
                        {/* <th scope="col">chú thích</th> */}
                        <th scope="col">số điện thoại</th>
                        <th scope="col">email</th>
                        <th scope="col">tổng tiền</th>
                        <th scope="col">xác nhận</th>
                        <th scope="col">chi tiết</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders_NC.map((item, index) =>
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.date_order}</td>
                                <td>{item.address}</td>
                                {/* <td>{item.description}</td> */}
                                <td>{item.phone_number}</td>
                                <td>{item.email}</td>
                                <td>{item.amount}</td>
                                <td className={cx(['btn_product','confirm'])}
                                    onClick={() => {
                                        setIdProduct_C(item.id)
                                        handleShow_confirm()
                                        setOrder_detail(item)
                                    }}
                                >
                                    <button><FontAwesomeIcon icon={faClipboardCheck}/></button>
                                </td>
                                <td className={cx(['btn_product','detail'])}
                                    onClick={() => {
                                        setOrder_detail(item)
                                        handleShow_detail()
                                        console.log(item)
                                    }}
                                >
                                    <button><FontAwesomeIcon icon={faCircleInfo}/></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

           

            <h1>đơn đã xác nhận/đang giao</h1>
            <table className="table table-hover">
                <thead>
                    <tr className='table-info'>
                        <th>mã đơn hàng</th>
                        <th>ngày đặt</th>
                        <th>ảnh</th>
                        <th>địa chỉ</th>
                        {/* <th>chú thích</th> */}
                        <th>số điện thoại</th>
                        <th>email</th>
                        <th>tổng tiền</th>
                        <th>xác nhận</th>
                        <th>chi tiết</th>
                    </tr>
                </thead>

                <tbody >
                    {
                        orders_deli.map((item, index) =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.date_order}</td>
                                <td></td>
                                <td>{item.address}</td>
                                {/* <td>{item.description}</td> */}
                                <td>{item.phone_number}</td>
                                <td>{item.email}</td>
                                <td>{item.amount}</td>
                                <td className={cx(['btn_product','confirm'])}
                                    onClick={() => {
                                        setIdProduct_C(item.id)
                                    }}
                                >
                                    <ConfirmModal btnText={<FontAwesomeIcon icon={faClipboardCheck}/>}
                                        title='Xác nhận hoàn tất đơn hàng'
                                        body='Bấm xác nhận để hoàn tất'
                                        accept={() => {
                                            setCheckChange(pre => !pre)
                                            confirm_product_complete(idProduct_C)
                                        }}
                                    />
                                </td>
                                <td className={cx(['btn_product','detail'])}
                                    onClick={() => {
                                        setOrder_detail(item)
                                        handleShow_detail()
                                        console.log(item)
                                    }}
                                >
                                    <button><FontAwesomeIcon icon={faCircleInfo}/></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <h1>đơn hoàn thành</h1>
            <table className="table table-hover ">
                <thead>
                    <tr className='table-info'>
                        <th>mã đơn hàng</th>
                        <th>ngày đặt</th>
                        <th>ảnh</th>
                        <th>địa chỉ</th>
                        {/* <th>chú thích</th> */}
                        <th>số điện thoại</th>
                        <th>email</th>
                        <th>tổng tiền</th>
                        <th>chi tiết</th>
                    </tr>
                </thead>

                <tbody>
                {
                    orders_C.map((item, index) =>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.date_order}</td>
                            <td></td>
                            <td>{item.address}</td>
                            {/* <td>{item.description}</td> */}
                            <td>{item.phone_number}</td>
                            <td>{item.email}</td>
                            <td>{item.amount}</td>
                            <td className={cx(['btn_product','detail'])}
                                onClick={() => {
                                    setOrder_detail(item)
                                    handleShow_detail()
                                    console.log(item)
                                }}
                            >
                                <button><FontAwesomeIcon icon={faCircleInfo}/></button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>


            <Modal show={showConfirm} onHide={handleClose_confirm}>
                <Modal.Header closeButton>
                <Modal.Title>
                    <h1>XÁC NHẬN ĐƠN HÀNG</h1>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{fontSize:"18px"}}>bạn có muốn xác nhận đơn hàng {idProduct_C}</div>
                </Modal.Body>
                <Modal.Footer>
                <button
                    className={cx(['btnModal'])}
                    onClick={() => {
                        handleClose_confirm()
                        setCheckChange(pre => !pre)
                        confirm_product(idProduct_C)
                    }}
                >
                    xác nhận
                </button>
                <button
                    className={cx(['btnModal'])}
                    onClick={() => {
                        handleClose_confirm()
                    }}
                >
                    đóng
                </button>
                </Modal.Footer>
            </Modal>

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
                                        <img src={require('../../imgData/'+item.product.img)} alt="error"/>
                                        <div>
                                            <p>{item.product.name}</p>
                                            <p>size: {item.size}</p>
                                            <p>x {item.quantity}</p>
                                            <p>{item.product.price}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className={cx('infor_delivery')}>
                            <h1>Thông Tin</h1>
                            <p><span>tên khách hàng</span>: {order_detail.name}</p>
                            <p><span>địa chỉ</span>: {order_detail.address}</p>
                            <p><span>email</span>: {order_detail.email}</p>
                            {/* <p><span>ghi chú</span>: {order_detail.description}</p> */}
                            <p className={cx('amount_order')}>Tổng: {order_detail.amount}</p>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className={cx(['btnModal'])}
                        onClick={() => {
                            handleClose_detail()
                            setCheckChange(pre => !pre)
                            confirm_product(order_detail.id)
                        }}
                    >
                        xác nhận
                    </button>
                    <button className={cx(['btnModal'])}
                        onClick={handleClose_detail}
                    >
                        đóng
                    </button>
                </Modal.Footer>
                
            </Modal>


            <a href = "mailto: anhtyty188dn@gmail.com">Send Email</a>


        </div>
    );
}

export default Confirming;