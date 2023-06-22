import classNames from "classnames/bind";
import style from "../SignInSignUp.module.scss"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const md5 = require('md5');


const cx = classNames.bind(style)

function SignIn({setLogin}) {
    const [accName, setAccName] = useState("")
    const [password, setPassword] = useState("")
    const [errMess, setErrMess] = useState("")


    const navigate = useNavigate();


    const handleSignIn = () => {
        const data = {
            accName: accName,
            password: md5(password),

        }
        console.log(data)
        axios.post("http://localhost:8000/signin",data)
        .then(res => {
            console.log(res)
            localStorage.setItem("tokens", JSON.stringify(res.data));

            res.data.role === "client" && navigate("/productList/page1");
            res.data.role === "admin" && navigate("/admin");
            setLogin(res.data.role)
            setErrMess(res.data.status)
            
        })
        .catch(err => console.log(err))

    }


    return (
        <div className={cx('sign_in')}>
            
            <div className={cx('form')}>
                <div className={cx('title')}>
                    <h1 >hi there</h1>
                    <p>Good shoes take you to good places</p>
                </div>
                <div className={cx('inputField')}>
                    <input placeholder="tài khoản" type='text' onChange={(e) => setAccName(e.target.value)}/>
                </div>
                <div className={cx('inputField')}>
                    <input placeholder="mật khẩu" type='password' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {
                    errMess === false && <p className='text-danger'>Tài khoản hoặc mật khẩu không chính xác</p>
                }
                <div className={cx('signUpAndForget')}>
                    <Link className={cx("signUp_btn")} to="/signUp">đăng ký</Link>
                    <Link to="/">quên mật khẩu</Link>
                </div>
                <button className={cx('signIn_btn')}
                    onClick={handleSignIn}
                >đăng nhập</button>

                <h1 className={cx('option_signIn')}>Hoặc</h1>

                <button className={cx(['signIn_btn', 'other'])}> <img src={require("../google.png")}/>google</button>
                <button className={cx(['signIn_btn', 'other'])}> <img src={require("../facebook.png")}/>facebook</button>

            </div>
        </div>
    );
}

export default SignIn;