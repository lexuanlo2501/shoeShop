import { useEffect, useState } from 'react'
import style from './listAccount.module.scss'
import classNames from 'classnames/bind'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import AvatarAuto from '../../components/AvatarAuto';
import { faCircle, faCircleInfo, faInfo, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import PurchaseOrder from '../PurchaseOrder';

const cx = classNames.bind(style)

function ListAccount() {
    const [acc, setAcc] = useState([])
    const [userSelect, setUserSelect] = useState({})

    const [rr_lock, setRr_lock] = useState(false)


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+'/accounts')
        .then(res => setAcc(res.data))
    }, [rr_lock])

    const handleLockAcc = (id, value) => {
        axios.patch(process.env.REACT_APP_BACKEND_URL+`/accounts/${id}`, {"isLock":value})
        // .then(res => console.log(res))
        setRr_lock(pre => !pre)
    }

    return (
        <div className={cx('wrapper')}>
            <h2>Quản lý tài khoản</h2>
            <div className={cx("table_accounts")}>
                <table className="table table-hover">
                    <thead>
                        <tr className="table-info">
                            <th scope="col">#</th>
                            <th scope="col"></th>
                            <th scope="col" className={cx('fullName')}>Tên</th>
                            <th scope="col">Email</th>
                            <th scope="col">SĐT</th>
                            <th scope="col">Vai trò</th>
                            <th scope="col">Chi tiết</th>
                            <th scope="col"></th>



                        </tr>
                    </thead>
                    <tbody>
                    {
                        acc.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">
                                    <p className={cx('padding_row')}>{index+1}</p>
                                </th>
                                <td>
                                <AvatarAuto nameU={item.fullName}/>
                                </td>
                                <td>{item.fullName}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>
                                {
                                    item.role === "admin" ? <span className={cx(['role', 'i'])}>Admin</span> : <span className={cx(['role', 'ii'])}>Client</span>
                                }
                                </td>
                                <td 
                                    onClick={() => {
                                        handleShow()
                                        setUserSelect(item)
                                    }}
                                >
                                    <button className={cx(['status_btn'])}>
                                        <FontAwesomeIcon icon={faInfo}/>
                                        <span>Info</span>

                                    </button>
                                </td>
                                <td>
                                {
                                    !item.isLock ? 
                                    <button className={cx(['status_btn','lock'])}
                                        onClick={() => handleLockAcc(item.accName, 1)}
                                    >
                                        <FontAwesomeIcon icon={faLock}/>
                                        <span>Khóa</span>
                                    </button>
                                    :
                                    <button className={cx(['status_btn','unlock'])}
                                        onClick={() => handleLockAcc(item.accName, 0)}
                                    >
                                        <FontAwesomeIcon icon={faUnlock}/>
                                        <span>Mở</span>
                                    </button>

                                }
                                    
                                </td>



                            </tr>
                        ))
                    }
                        
                    </tbody>
                </table>
            </div>
            <ModalInforUser show={show} handleClose={handleClose} userSelect={userSelect}/>

        </div>
    );
}

function ModalInforUser({show, handleClose, userSelect}) {
    return (
        <div>
            <Modal show={show} onHide={handleClose} backdrop="static"
                size="xl"
               
                centered
                // fullscreen={true}
            >
                <Modal.Header closeButton>
                <Modal.Title><h1>THÔNG TIN NGƯỜI DÙNG</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('body_modal')}>
                        <div className={cx('user_info')}>
                            <p><span>vai trò</span>: {userSelect.role}</p>
                            <p><span>tài khoản</span>: {userSelect.accName}</p>
                            <p><span>email</span>: {userSelect.email}</p>
                            <p><span>tên</span>: {userSelect.fullName}</p>
                            <p><span>SĐT</span>: {userSelect.phoneNumber}</p>
                            <p><span>ngày sinh</span>: {userSelect.dateOfBirth}</p>
                            <p><span>ngày đăng ký</span>: {userSelect.date_create}</p>
                            <p><span>giới tính</span>: {userSelect.gender === "Male" && "Nam"} {userSelect.gender === "Female" && "Nữ"} {userSelect.gender === "female" && "Khác"}</p>
                        </div>

                        <PurchaseOrder userID={userSelect.accName}/>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                <button className={cx("close_btn")} onClick={handleClose}>
                    Đóng
                </button>
                
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ListAccount;