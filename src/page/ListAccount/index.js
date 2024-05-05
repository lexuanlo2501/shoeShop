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
import { createAxios } from '../../createInstance';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import emailjs from '@emailjs/browser';
import {toast } from 'react-toastify';





let axiosJWT = createAxios()


const cx = classNames.bind(style)


const randomCode = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

function ListAccount() {
    let infor_user = JSON.parse(localStorage.getItem("tokens"))


    const [acc, setAcc] = useState([])
    const [userSelect, setUserSelect] = useState({})

    const [rr_lock, setRr_lock] = useState(false)


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (user) => {
        setUserSelect(user)
        setShow(true)
    };

    useEffect(() => {
        axiosJWT.get(process.env.REACT_APP_BACKEND_URL+'/accounts', {
            headers: {Authorization: infor_user.accessToken}
        })
        .then(res => setAcc(res.data))
    }, [rr_lock])

    const handleLockAcc = (id, value) => {
        axiosJWT.patch(process.env.REACT_APP_BACKEND_URL+`/accounts/${id}`, {"isLock":value}, {
            headers: {Authorization: infor_user.accessToken}
        })
        // .then(res => console.log(res))
        setRr_lock(pre => !pre)
    }

    return (
        <div className={cx('wrapper')}>
            <h1>Quản lý tài khoản</h1>
            <div className={cx("table_accounts")}>
                <table className="table table-hover">
                    <thead>
                        <tr className="table-info">
                            <th scope="col">#</th>
                            <th scope="col"></th>
                            <th scope="col" className={cx('fullName')}>Tài Khoản</th>
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
                                <td>{item.accName}</td>
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
                                        handleShow(item)
                                        // setUserSelect(item)
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
    const [codeConfirm, setCodeConfirm] = useState("")
    const [expire, setExpire] = useState(60)
    const [isCountdown, setIsCountdown] = useState(false)

    useEffect(() => {
        // Thiết lập interval khi component được render
        let interval = null
        if(isCountdown) {
            interval = setInterval(() => {
                setExpire((pre) => pre - 1); // Giảm giá trị đếm ngược đi 1
            }, 1000);
        
            // Xóa interval khi component bị unmount hoặc khi giá trị countdown đạt 0
            if (expire === 0) {
              clearInterval(interval);
              setIsCountdown(false)
              setExpire(30)
              setCodeConfirm("expire")
            }

        }
    
        return () => {
          clearInterval(interval);
        };
      }, [expire, isCountdown]);

    const preLoadedValue = {
        fullName: "",
        gender: "",
        dateOfBirth: ""
    }

    const { register, handleSubmit, watch, setValue,reset, formState: { errors } } = useForm({
        defaultValues: preLoadedValue
    });

    const handleUpdateInforUser = (data) => {
        const {newPassword, codeConfirm,...restData} = data
        if(data.email !== userSelect.email) {
            if(codeConfirm === "expire") {
                toast("Mã Xác Nhận Đã Hết Hạn, Vui Lòng Gửi Mã Lại", { theme: "light", position: "top-center",})
                return
            }
            else if(!data.codeConfirm ) {
                toast("Vui Lòng Nhập Mã Xác Nhận", { theme: "light", position: "top-center",})
                return
            }
            else if(data.codeConfirm !== codeConfirm) {
                toast("Mã xác nhận không chính xác", { theme: "light", position: "top-center",})
                return
            }
        }

        
        const dataFormArr = Object.keys(restData)
        const dataPatch = {}
        dataFormArr.forEach((keyObj) => {
            if(data[keyObj] !== userSelect[keyObj]) {
                dataPatch[keyObj] = data[keyObj]
            }
        })
        console.log(dataPatch)



            
        

        
    }
    const HandleConFirmMail = (data) => {
        console.log(data)
        if(data.email === userSelect.email) {
            toast("Đây là email hiện tại của bạn", { theme: "light", position: "top-center",})
        }
        else if(data.email) {
            toast.success("Đã gửi, vui lòng vào email của bạn để lấy mã", {
                hideProgressBar: true,
                theme: "dark",
                position: "top-center",
                autoClose: 1000,
            })

            const codeSend = randomCode(6)
            setCodeConfirm(codeSend)
            emailjs.send("service_3r592vw","template_lpdl74k",{
                message: `Mã xác nhận của bạn là: ${codeSend}`,
                user_email: data.email
            }, "vVRWCJMmPNi61x4AK");
            setIsCountdown(true)
        }
    }

    useEffect(() => {
        setValue('fullName', userSelect.fullName)
        setValue('dateOfBirth', userSelect.dateOfBirth)
        setValue('gender', userSelect.gender)
        setValue('email', userSelect.email)
        setValue('phoneNumber', userSelect.phoneNumber)

        

        console.log(userSelect)
    }, [userSelect])

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
                            <p><span>ngày tạo</span>: {userSelect.date_create}</p>
                            <p><span>vai trò</span>: {userSelect.role}</p>
                            <p><span>tài khoản</span>: {userSelect.accName}</p>
                            <p><span>email</span>: <input type='text' {...register("email")}/> </p>
                            <p >
                                <span>
                                {
                                    isCountdown && <span className={cx("timer")}> {expire}</span>
                                }
                                </span>|
                                <input placeholder='Mã xác nhận email mới' type='text' {...register("codeConfirm")}/>
                                <button className={cx("send_code_btn")} onClick={(e) => {handleSubmit(HandleConFirmMail)(e)}}>Gửi Mã</button>
                           
                            </p>
                            <p><span>tên</span>: <input type='text' {...register("fullName")}/></p>
                            <p><span>SĐT</span>: <input type='text' {...register("phoneNumber")}/></p>
                            <p><span>ngày sinh</span>: 
                                <input type='date' placeholder="..." {...register("dateOfBirth")}/>
                            </p>
                            <p><span>giới tính</span>: 
                                <input type="radio" name="gender" value='Male' id="g1" {...register("gender")}  /> <label className={cx('label_gender')} htmlFor="g1">Nam</label>
                                <input type="radio" name="gender" value='Female' id="g2" {...register("gender")}  /> <label className={cx('label_gender')} htmlFor="g2">Nữ</label>
                                <input type="radio" name="gender" value='Other' id="g3" {...register("gender")}  /> <label className={cx('label_gender')} htmlFor="g3">Khác</label>
                            </p>
                            <p><span>Mật Khẩu</span>: 
                                <input type='text' placeholder="Đặt mật khẩu mới" {...register("newPassword")}/>
                            </p>
                            <button className={cx("update_infor_btn")} onClick={(e) => {handleSubmit(handleUpdateInforUser)(e)}}>Lưu</button>
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