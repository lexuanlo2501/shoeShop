import emailjs from '@emailjs/browser';
import { useState } from 'react';
import classNames from 'classnames/bind';
import style from "../SignInSignUp.module.scss"
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';





const cx = classNames.bind(style)


function ForgotPassword () {
    const navigate = useNavigate();
    const [codeConfirm, setCodeConfirm] = useState("")
    const [email, setEmail] = useState("")

    const randomCode = (length) => {
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    const handleChangePass = (data) => {
        console.log(data)
       
        if(data.code === codeConfirm && data.code !== "" && data.password === data.password_CF) {
            axios.patch("http://localhost:5000/forgotPassword/"+data.email,{newPass:data.password,pass_confirm:data.password_CF})
            .then(res => {
                toast.success("Đổi mật khẩu thành công", {
                    hideProgressBar: true,
                    theme: "dark",
                    position: "top-center",
                    autoClose: 1000,
        
                })
                navigate("/signin")
            })

            console.log(true)
        }
        else{
            console.log(false)
        }
    }

    const { register, handleSubmit, formState: { errors, touched } } = useForm({
        mode: "onTouched",
    });

    return (
        <div >
            <div className={cx("form")}>
                <h1>QUÊN MẬT KHẨU</h1>
                <div className={cx('inputField')}>
                    <label>Email</label>
                    <input type='text' {...register("email")} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className={cx('inputField')}>
                    <label>Mã xác nhận</label>
                    <input type='text'   {...register("code")}/>
                    <button
                        className={cx("sendCode_email_btn")}
                        onClick = {() => {
                            if(email) {
                                toast.success("Đã gửi, vui lòng vào email của bạn để lấy mã", {
                                    hideProgressBar: true,
                                    theme: "dark",
                                    position: "top-center",
                                    autoClose: 1000,
                        
                                })
    
                                const codeSend = randomCode(6)
                                setCodeConfirm(codeSend)
                                emailjs.send("service_3r592vw","template_ihyv5xl",{
                                    message: `Mã xác nhận của bạn là: ${codeSend}`,
                                    user_email: email
                                }, "vVRWCJMmPNi61x4AK");
                            }
                            else {
                                console.log("Ban chua nhap email")
                            }
                        }}
                    >Gửi mã</button>
                </div>
                <div className={cx('inputField')}>
                    <label>Mật khẩu</label>
                    <input type='password' {...register("password")}/>
                </div>
                <div className={cx('inputField')}>
                    <label>Nhập lại mật khẩu</label>
                    <input type='password' {...register("password_CF")}/>
                </div>
                
               
                <button
                    className={cx(['signIn_btn'])}
                    onClick={(e) => {
                        handleSubmit(handleChangePass)(e)
                    }}
                   
                >Gửi</button>

                <Link  to="/signIn">

                    <button className={cx(['signIn_btn', 'other'])}>
                            <FontAwesomeIcon icon={faAnglesLeft}/>
                            đăng nhập
                    </button>

                </Link>
            </div>
        </div>
    );
}

export default ForgotPassword ;