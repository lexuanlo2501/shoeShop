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
    const [trigger, setTrigger] = useState(false)


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
    }, [rr_lock, trigger])

    const handleLockAcc = (accName, value) => {
        axiosJWT.patch(process.env.REACT_APP_BACKEND_URL+`/accounts/${accName}`, {"isLock":value}, {
            headers: {Authorization: infor_user.accessToken}
        })
        // .then(res => console.log(res))
        setRr_lock(pre => !pre)
    }

    const handChangeRole = (accName, newRole) => {
        axiosJWT.patch(process.env.REACT_APP_BACKEND_URL+`/accounts/${accName}`, {"role":newRole}, {
            headers: {Authorization: infor_user.accessToken}
        })
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
                                    <select defaultValue={item.role} className={cx(['role', {i:item.role=='admin', ii:item.role=='client', iii: item.role=="seller"}])}
                                        onChange={e => handChangeRole(item.accName,e.target.value)}
                                    >
                                        <option value='admin'>Admin</option>
                                        <option value='client'>Client</option>
                                        <option value='seller'>Seller</option>
                                    </select>
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
            <ModalInforUser show={show} handleClose={handleClose} userSelect={userSelect} setTrigger={setTrigger}/>

        </div>
    );
}

function ModalInforUser({show, handleClose, userSelect, setTrigger}) {
    
    const preLoadedValue = {
        fullName: "",
        gender: "",
        dateOfBirth: ""
    }

    const schema = yup.object().shape({
        newPassword: yup.string(),
        newPassword_2: yup.string().oneOf([yup.ref("newPassword")], "Mật khẩu không khớp"),
    }).required();

    const { register, handleSubmit, watch, setValue,reset, formState: { errors } } = useForm({
        defaultValues: preLoadedValue,
        resolver: yupResolver(schema),
    });

    const handleUpdateInforUser = (data) => {
        const {newPassword,newPassword_2, codeConfirm,...restData} = data
        
        const dataFormArr = Object.keys(restData)
        const dataPatch = {}
        dataFormArr.forEach((keyObj) => {
            if(data[keyObj].trim() !== userSelect[keyObj].trim()) {
                dataPatch[keyObj] = data[keyObj].trim()
            }
        })

        
        
        if(newPassword === newPassword_2 && newPassword !== "") {
            dataPatch.password = newPassword
        }
        
        console.log(dataPatch)
        const inforAdmin = JSON.parse(localStorage.getItem("tokens"))

        if(Object.keys(dataPatch).length) {
            axiosJWT.patch(process.env.REACT_APP_BACKEND_URL+`/accounts/${userSelect['accName']}`, dataPatch, {
                headers: {Authorization: inforAdmin.accessToken}
            })
            .then(res => {
                console.log(res)
                // localStorage.setItem('tokens', JSON.stringify({...inforUser, ...data}))
                setTrigger(pre => !pre)
                toast(res.data.message, {
                    theme: "light",
                    position: "top-center",
                })
                
            })
            .catch(err => console.log(err))
        }
       
    }
   

    useEffect(() => {
        setValue('fullName', userSelect.fullName)
        setValue('dateOfBirth', userSelect.dateOfBirth)
        setValue('gender', userSelect.gender)
        setValue('email', userSelect.email)
        setValue('phoneNumber', userSelect.phoneNumber)
        setValue('newPassword', "")
        setValue('newPassword_2', "")

        // console.log(userSelect)
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
                            <p><span>Mật Khẩu</span>: <input type='password' placeholder="Đặt mật khẩu mới" {...register("newPassword")}/></p>
                            <p><span>Nhập Lại Mật Khẩu</span>: <input type='password' placeholder="Nhập Lại Mật Khẩu Mới" {...register("newPassword_2")}/>
                                {errors.newPassword_2 && <span className={cx("notMatch_passW_mess")}>Mật khẩu không khớp</span>}
                            </p>
                            
                            <button className={cx("update_infor_btn")} onClick={(e) => {handleSubmit(handleUpdateInforUser)(e)}}>Lưu</button>
                        </div>

                        <PurchaseOrder userID={userSelect.accName}/>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className={cx("close_btn")} onClick={handleClose}>Đóng</button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ListAccount;