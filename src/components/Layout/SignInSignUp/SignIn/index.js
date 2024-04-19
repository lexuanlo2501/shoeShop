import classNames from "classnames/bind";
import style from "../SignInSignUp.module.scss"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MoonLoader } from 'react-spinners';

import axios from "axios";
import { limit } from "../../../../common";
import ConfirmModal from "../../../ConfirmModal";

import { jwtDecode } from "jwt-decode";


const cx = classNames.bind(style)


function SignIn({setLogin = () => {}}) {

    const [accName, setAccName] = useState("")
    const [password, setPassword] = useState("")
    const [errMess, setErrMess] = useState("")
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate();

    const handleSignIn_v2 = () => {
        const data = {
            accName: accName,
            password: password,
        }
        setLoading(true)

        // axios.post(process.env.REACT_APP_BACKEND_URL+"/signin_2",data, { withCredentials: true})
        axios.post(process.env.REACT_APP_BACKEND_URL+"/signin_2",data)
        .then(res => {
            console.log(res)
            if(res.data.status) {
                const inforUser = jwtDecode(res.data.accessToken)
                const toLocalStorage = {...inforUser.data, accessToken:res.data.accessToken}
                console.log(toLocalStorage)
    
                localStorage.setItem("tokens", JSON.stringify(toLocalStorage));
                setLogin(toLocalStorage.role)
    
                const isClientSeller = toLocalStorage.role === "client" || toLocalStorage.role === "seller"
                isClientSeller && navigate(`/shoes?_page=1&_limit=${limit}`);
                toLocalStorage.role === "admin" && navigate("/admin");
                setLoading(false)

            }
            else {
                setErrMess(res.data.message)
                setLoading(false)
            }
            
           


        })
        
    }




    return (
        <div className={cx('sign_in')}
            onKeyDown={(e) => {
                if(e.key==="Enter") {
                    handleSignIn_v2()
                }

            }}
        >
            
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
                {/* {
                    errMess === false && <p className='text-danger'>Tài khoản hoặc mật khẩu không chính xác</p>
                } */}
                <p className='text-danger'>{errMess}</p>

                <div className={cx('signUpAndForget')}>
                    <Link className={cx("signUp_btn")} to="/signUp">đăng ký</Link>
                    <Link to="/forgotPassword">quên mật khẩu</Link>
                </div>
                {/* <button className={cx('signIn_btn')}
                    onClick={handleSignIn}
                >đăng nhập</button> */}

                <button className={cx('signIn_btn')}
                    onClick={handleSignIn_v2}
                >đăng nhập</button>


                <h1 className={cx('option_signIn')}>Hoặc</h1>

                <ConfirmModal
                    btnText={<button className={cx(['signIn_btn', 'other'])}> <img src={require("../google.png")}/>google</button>}
                    title="COMING SOON"
                    body="Hiện tại chưa có tính năng này"
                />
                <ConfirmModal
                    btnText={<button className={cx(['signIn_btn', 'other'])}> <img src={require("../facebook.png")}/>facebook</button>}
                    title="COMING SOON"
                    body="Hiện tại chưa có tính năng này"
                />

                <Link className={cx(['signIn_btn', 'other', 'to_Shop'])} to={`/shoes?_page=1&_limit=${limit}`}>Đến cửa hàng</Link>

                
            {
                loading &&
                <div className={cx('loadding_signIn')}>
                    <MoonLoader
                        color="#3e3e3e"
                        cssOverride={{}}
                        size={42}
                    />
                </div>
            }

            </div>

           

        </div>
    );
}

export default SignIn;