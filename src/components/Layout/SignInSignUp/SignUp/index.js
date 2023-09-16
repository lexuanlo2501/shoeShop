import classNames from "classnames/bind";
import style from "../SignInSignUp.module.scss"
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast } from 'react-toastify';

const md5 = require('md5');



const cx = classNames.bind(style)

function SignUp() {

    const [accNameMess, setAccNameMess] = useState({})
    const [messErr, setMessErr] = useState("")

    const navigate = useNavigate();

    const handleSignUp = (data) => {
        if(data.password === data.passwordCF) {
            let date = data.dateOfBirth.split('-')
            const dataPost = {
                ...data,
                password: data.password,
                dateOfBirth: `${date[2]}/${date[1]}/${date[0]}`,
                role: 'client'
            }
    
            // delete dataPost.passwordCF

            // axios.post("http://localhost:8000/accounts", dataPost)
            axios.post("http://localhost:5000/signup", dataPost)

            .then(res => {
                console.log(res)
                setMessErr(res.data.message)
                setAccNameMess(res.data)

                if(res.data.status) {
                    toast("Đăng ký thành công", {
                        theme: "light",
                        position: "top-center",
                    })
                    navigate("/signin")
                }
            })
    
            console.log(dataPost)
        }
        else {
            console.log("password ko trung")
        }
       
       

    }

    useEffect(() => {
        // axios.get('http://localhost:8000/posts')
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err))
    }, [])

    const schema = yup.object().shape({
        fullName: yup.string().required(),
        phoneNumber: yup.string().required("Bạn phải điền mục này").length(10, "Số điện thoại phải có 10 số"),
        email: yup.string().required(),
        accName: yup.string().required(),
        password: yup.string().required(),
        passwordCF: yup.string().required("Bạn phải điền mục này").oneOf([yup.ref("password")], "Mật khẩu không khớp"),
        dateOfBirth: yup.string().required(),
        gender: yup.string().required(),

    }).required();

    const { register, handleSubmit, watch, formState: { errors, touched } } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        
    });

    const InputRequire = ({message="Bạn phải điền mục này"}) => {
        return <span className={cx('err_mess')}>{message}</span>
     }

    return (
        <div className={cx("sign_up")}>
            <div className={cx("form")}>
                <h1>Đăng Ký</h1>
                <div className={cx('inputField')}>
                    <input type="text" placeholder="tài khoản"
                        {...register("accName")}
                    />
                    {/* {errors.accName && <InputRequire/>} */}
                    { !accNameMess.status  && <p className={cx('err_mess')}>{accNameMess.message}</p> }
                </div>
                <div className={cx('inputField')}>
                    <input type="text" placeholder="họ và tên"
                        {...register("fullName")}
                    />
                    {errors.fullName && <InputRequire />}
                </div>

                <div className={cx('inputField')}>
                    <input type="text" placeholder="số điện thoại"
                        {...register("phoneNumber")}
                    />
                    {errors.phoneNumber && <InputRequire message={errors.phoneNumber?.message}/>}

                </div>
                <div className={cx('inputField')}>
                    <input type="email" placeholder="email"
                        {...register("email")}
                    />
                    {errors.email && <InputRequire/>}

                </div>

                <div className={cx('inputField')}>
                    <input placeholder="mật khẩu" type='password'
                        {...register("password")}
                    />
                    {errors.password && <InputRequire/>}
                </div>
                <div className={cx('inputField')}>
                    <input placeholder="nhập lại mật khẩu" type='password'
                        {...register("passwordCF")}
                    />
                    {errors.passwordCF && <InputRequire message={errors.passwordCF?.message} />}

                </div>
                <div className={cx(['inputField', 'gender_com'])}>
                    <label className={cx(['label',{'err':errors.gender}])}>Giới tính </label>
                    <input type="radio" name="gender" value='Male' id="g1" {...register("gender")}/> <label htmlFor="g1">Nam</label>
                    <input type="radio" name="gender" value='Female' id="g2" {...register("gender")}/> <label htmlFor="g2">Nữ</label>
                    <input type="radio" name="gender" value='Other' id="g3" {...register("gender")}/> <label htmlFor="g3">Khác</label>

                </div>
                <div className={cx(['inputField'])}>
                    <label className={cx(['label',{'err':errors.dateOfBirth}])}>Ngày sinh </label>
                    <input type='date' 
                        {...register("dateOfBirth")}

                    />

                </div>

                <div>{messErr}</div>

                <button className={cx('signIn_btn')}
                    onClick={(e) => {
                        handleSubmit(handleSignUp)(e)
                    }}
                
                >đăng ký</button>
                
                
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

export default SignUp;




