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
import { createAxios } from "../../createInstance";
import emailjs from '@emailjs/browser';


const cx = classNames.bind(style)
const axiosJWT = createAxios()
const randomCode = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

function InforUser() {
    let infor_user = JSON.parse(localStorage.getItem("tokens"))
    const [inforUser, setInforUser] = useState({})
    const [trigger, setTrigger] = useState(false)

    const [statusChange, setStatusChange] = useState({phoneNumber:false, email: false})
    const [messPassW, setMessPassW] = useState([])

    useEffect(() => {
        axiosJWT.get(process.env.REACT_APP_BACKEND_URL+`/accounts/${infor_user.accName}`, {
            headers: {Authorization: infor_user.accessToken}
        })
        .then(res => {
            setInforUser(res.data)

            reset({
                fullName: res.data.fullName,
                gender: res.data.gender,
                dateOfBirth: res.data.dateOfBirth,
                email:  res.data.email,
                phoneNumber:  res.data.phoneNumber

            })

        })
        .catch(err => {
            console.log(err)
        })

    }, [])
    
    const preLoadedValue =
    {
        fullName: "",
        gender: "",
        dateOfBirth: ""
    }
    // pass_confirm,newPass
    const schema = yup.object().shape({
        newPass: yup.string(),
        pass_confirm: yup.string().oneOf([yup.ref("newPass")], "Mật khẩu không khớp"),
    }).required();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        defaultValues: preLoadedValue,
        resolver: yupResolver(schema),
    });

    const handleSave =  (data) => {
        data = {
            ...data,
            fullName: data.fullName.trim(),
            // dateOfBirth: fomatDate(data.dateOfBirth, 2)
        }

        const {pass_confirm,newPass, oldPass, codeConfirm: codeConfirm_form,...dataPatch} = data
        console.log(dataPatch)


        if(statusChange.email && data.email !== inforUser.email) {

            if(codeConfirm === "expire") {
                toast.error("Mã Xác Nhận Đã Hết Hạn, Vui Lòng Gửi Mã Lại", { theme: "light", position: "top-center",})
                return
            }
            else if(!data.codeConfirm) {
                toast.error("Vui Lòng Nhập Mã Xác Nhận", { theme: "light", position: "top-center",})
                return
            }
            else if(data.codeConfirm !== codeConfirm) {
                toast.error("Mã Xác Nhận Không Chính Xác", { theme: "light", position: "top-center",})
                return
            }

        }

        axiosJWT.patch(process.env.REACT_APP_BACKEND_URL+`/accounts/${inforUser['accName']}`, dataPatch, {
            headers: {Authorization: infor_user.accessToken}
        })
        .then(res => {
            console.log(res)
            localStorage.setItem('tokens', JSON.stringify({...infor_user, fullName:dataPatch.fullName}))
            toast(res.data.message, {
                theme: "light",
                position: "top-center",
            })
            
        })
        .catch(err => console.log(err))
       
    }

    const checkPass = (pass) => {
        let mess = []
        var character_special = "!\\\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
        const mess1 = "Ít nhất 10 kí tự"
        const mess2 = "Chứa ít nhất 1 số"
        const mess3 = "Chứa ít nhất 1 kí tự đặc biệt"

        let checkNum = Boolean(pass.split("").find(i => Number(i)))
        let checkChar = Boolean(pass.split("").find(i => character_special.includes(i)))

        if(pass.length<10) mess.push(mess1)
        if(!checkNum) mess.push(mess2)
        if(!checkChar) mess.push(mess3)

        return mess
    }

    // HANDLE COMFIRM EMAIL
    const [codeConfirm, setCodeConfirm] = useState("")
    const [expire, setExpire] = useState(60)
    const [isCountdown, setIsCountdown] = useState(false)

    useEffect(() => {
        let interval = null
        if(isCountdown) {
            interval = setInterval(() => {
                setExpire((pre) => pre - 1);
            }, 1000);
        
            if (expire === 0) {
              clearInterval(interval);
              setIsCountdown(false)
              setExpire(60)
              setCodeConfirm("expire")
            }

        }
    
        return () => {
          clearInterval(interval);
        };
      }, [expire, isCountdown]);

      
    const HandleConFirmMail = (data) => {
        console.log(data)
        if(data.email === inforUser.email) {
            toast("Đây là email hiện tại của bạn", { theme: "light", position: "top-center",})
        }
        else if(data.email) {
            setExpire(60)
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
                        <label>Email :</label> 
                    {
                        statusChange.email ? <input placeholder="..." {...register("email")} /> : <span className={cx('valueClkToChange')}>{ inforUser?.email?.slice(0, 2) +'******'+'@gmail.com' }</span> 
                    }
                        <button className={cx('changeInfor_btn')} 
                            onClick={()=>{
                                reset({email:inforUser.email})
                                setStatusChange(pre => ({...pre, email:!pre.email}))

                                if(statusChange.email) {
                                    setCodeConfirm("")
                                }
                            }}
                        >{statusChange.email ?  "Đóng" : "thay đổi"}</button>
                    </div>

                {
                    statusChange.email &&
                    <div className={cx('input_update')}>
                        <label>Mã xác nhận :</label>
                        <input placeholder="..."
                            {...register("codeConfirm")}
                        />
                        <button className={cx("send_code_btn")} onClick={(e) => {handleSubmit(HandleConFirmMail)(e)}}>{codeConfirm ? "Gửi Lại Mã" : "Gửi Mã"}</button>
                    {
                        isCountdown && <span className={cx("timer")}> {expire}</span>
                    }
                    </div>
                }

                    <div className={cx('input_update')}>
                        <label>Số điện thoại :</label> 
                    {
                        statusChange.phoneNumber ? <input placeholder="..." {...register("phoneNumber")} /> : <span className={cx('valueClkToChange')}>{'********'+inforUser?.phoneNumber?.slice(8, 10)}</span>
                    }
                        <button className={cx('changeInfor_btn')} 
                            onClick={()=>{
                                reset({phoneNumber:inforUser.phoneNumber})
                                setStatusChange(pre => ({...pre, phoneNumber:!pre.phoneNumber}))
                            }}
                        >{statusChange.phoneNumber ?  "Đóng" : "thay đổi"}</button>
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
                                    {errors.pass_confirm && <span className={cx("notMatch_passW_mess")}>Mật khẩu không khớp</span>}
                                        <div className={cx("mess_passW")}>
                                            {!!(messPassW.length) && <p>Mật khẩu phải có chứa:</p>}
                                            {messPassW.map(i => <p key={i}>- {i}</p>)}
                                        </div>
                                </div>
                            }
                            acceptClose={false}
                            accept={(e) => {
                                handleSubmit((data) => {
                                    setMessPassW(checkPass(data.newPass))

                                    const pass = {
                                        oldPass : data.oldPass,
                                        newPass : data.newPass,
                                        pass_confirm : data.pass_confirm,
                                    }

                                    if(checkPass(data.newPass).length===0) {
                                        axios.patch(process.env.REACT_APP_BACKEND_URL+"/changePassword/"+inforUser.accName, pass)
                                        .then(res => {
                                            toast(res.data)
                                        }) 
                                    }

                                
                                })(e)
                            }}
                            btnText={<button className={cx('changeInfor_btn')}>thay đổi</button>}
                        />
                    </div>
                    <div className={cx('input_update')}>
                        <label>Giới tính :</label>
                        <input type="radio" name="gender" value='Male' id="g1" {...register("gender")}  /> <label className={cx('label_gender')} htmlFor="g1">Nam</label>
                        <input type="radio" name="gender" value='Female' id="g2" {...register("gender")}  /> <label className={cx('label_gender')} htmlFor="g2">Nữ</label>
                        <input type="radio" name="gender" value='Other' id="g3" {...register("gender")}  /> <label className={cx('label_gender')} htmlFor="g3">Khác</label>
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