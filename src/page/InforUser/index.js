import classNames from "classnames/bind";
import style from './inforUser.module.scss'
import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import AvatarAuto from "../../components/AvatarAuto";
import ConfirmModal from "../../components/ConfirmModal";


const cx = classNames.bind(style)

function InforUser() {
    
    const [inforUser, setInforUser] = useState({})

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("tokens"));
        console.log(user)
        setInforUser(user)
        reset({
            fullName: user.fullName,
            gender: user.gender,
            dateOfBirth: fomatDate(user.dateOfBirth, 1)
        })
    }, [])

    

    const fomatDate =  (d = "", type) => {
        if(type === 1) {
            let splitDate = d?.split('/')
            // dd/mm/yyyy -> yyyy-mm-dd
            return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
        }
        else if(type === 2) {
            let splitDate = d?.split('-')
            //yyyy-mm-dd -> dd/mm/yyyy 
            return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
        }
    }

    const preLoadedValue =
    {
        fullName: "",
        gender: "",
        dateOfBirth: ""
    }
   

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        defaultValues: preLoadedValue
    });

    const handleSave =  (data) => {
        data = {
            ...data,
            dateOfBirth: fomatDate(data.dateOfBirth, 2)
        }
        console.log(data)


        axios.patch(`http://localhost:5000/accounts/${inforUser['accName']}`, data)
        .then(res => {
            console.log(res)
            localStorage.setItem('tokens', JSON.stringify({...inforUser, ...data}))
            toast("Cập nhật thông tin thành công", {
                theme: "light",
                position: "top-center",
            })
            
        })
        .catch(err => console.log(err))
       
    }

    return (
        <div className={cx('wrapper')}>
            <h1>Hồ sơ của tôi</h1>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>



            <div className={cx('infor')}>
                <div>
                    <div className={cx('input_update')}>
                        <label>Tên đăng nhập :</label> <span className={cx('valueClkToChange')}>{inforUser.accName}</span>
                    </div>
                    <div className={cx('input_update')}>
                        <label>Tên :</label>
                        <input placeholder="..."
                            {...register("fullName")}
                        />
                    </div>
                    <div className={cx('input_update')}>
                        <label>Email :</label> <span className={cx('valueClkToChange')}>{ inforUser?.email?.slice(0, 2) +'******'+'@gmail.com' }</span> <span className={cx('changeInfor_btn')}>thay đổi</span>
                    </div>
                    <div className={cx('input_update')}>
                        <label>Số điện thoại :</label> <span className={cx('valueClkToChange')}>{'********'+inforUser?.phoneNumber?.slice(8, 10)}</span> <span className={cx('changeInfor_btn')}>thay đổi</span>
                    </div>
                    <div className={cx('input_update')}>
                        <label>Mật khẩu :</label> <span className={cx('valueClkToChange')}>************</span>
                        <ConfirmModal
                            title={<h1 className={cx("changePass_modal_title")}>ĐỔI MẬT KHẨU</h1>}
                            body={
                                <div className={cx("changePass_modal")}>
                                    <div className={cx('input_update')}>
                                        <label>Mật khẩu hiện tại :</label>
                                        <input {...register("oldPass")} type="password" placeholder="**********"/>
                                    </div>
                                    <div className={cx('input_update')}>
                                        <label>Mật khẩu mới :</label>
                                        <input {...register("newPass")} type="password" placeholder="**********"/>
                                    </div>
                                    <div className={cx('input_update')}>
                                        <label>Nhập lại mật khẩu :</label>
                                        <input {...register("pass_confirm")} type="password" placeholder="**********"/>
                                    </div>
                                </div>
                            }
                            accept={(e) => {
                                handleSubmit((data) => {
                                    const pass = {
                                        oldPass : data.oldPass,
                                        newPass : data.newPass,
                                        pass_confirm : data.pass_confirm,
                                    }
                                    console.log(pass)
                                    // axios.patch("http://localhost:5000/changePassword/"+inforUser.accName, pass)
                                
                                
                                
                                })(e)
                            }}
                            btnText={<span className={cx('changeInfor_btn')}>thay đổi</span>}
                        />
                    </div>
                    <div className={cx('input_update')}>
                        <label>Giới tính :</label>
                        <input type="radio" name="gender" value='male' id="g1" {...register("gender")}  /> <label className={cx('label_gender')} htmlFor="g1">Nam</label>
                        <input type="radio" name="gender" value='female' id="g2" {...register("gender")}  /> <label className={cx('label_gender')} htmlFor="g2">Nữ</label>
                        <input type="radio" name="gender" value='other' id="g3" {...register("gender")}  /> <label className={cx('label_gender')} htmlFor="g3">Khác</label>
                    </div>
                    <div className={cx('input_update')}>
                        <label>Ngày sinh :</label> <input type='date' placeholder="..." {...register("dateOfBirth")}/>
                    </div>
                    <button className={cx('btn_save')}
                        onClick={(e) => {
                            handleSubmit(handleSave)(e)
                        }}
                    > lưu</button>
                </div>
                <AvatarAuto nameU={inforUser?.fullName} />

            </div>
            
        </div>
    );
}

export default InforUser;