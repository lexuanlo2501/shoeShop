import classNames from "classnames/bind";
import style from "../SignInSignUp.module.scss"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MoonLoader } from 'react-spinners';

import axios from "axios";
import { limit } from "../../../../common";

const md5 = require('md5');


const cx = classNames.bind(style)


function SignIn({setLogin}) {

     // test
     const [file, setFile] = useState()
     const [files, setFiles] = useState([])


    const [accName, setAccName] = useState("")
    const [password, setPassword] = useState("")
    const [errMess, setErrMess] = useState("")
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate();


    const handleSignIn = () => {
        const data = {
            accName: accName,
            // password: md5(password),
            password: password,


        }
        console.log(data)
        setLoading(true)
        axios.post("http://localhost:8000/signin",data)
        .then(res => {
            console.log(res)
            localStorage.setItem("tokens", JSON.stringify(res.data));

            res.data.role === "client" && navigate(`/shoes?_page=1&_limit=${limit}`);
            res.data.role === "admin" && navigate("/admin");
            setLogin(res.data.role)
            setErrMess(res.data.status)
            setLoading(false)
            
        })
        .catch(err => console.log(err))

    }




    return (
        <div className={cx('sign_in')}
            onKeyDown={(e) => {
                if(e.key==="Enter") {
                    handleSignIn()
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

                <input type="file"
                    onChange={e => {
                        setFile(e.target.files[0])
                        setFiles(pre => [...pre, e.target.files[0]])

                    }}
                />
                <button onClick={() => {
                    console.log(file)
                    const formdata = new FormData()
                    formdata.append('file', file)
                    axios.post("http://localhost:5000/upload/img", formdata)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                }}>upload</button>
                <br/>
                <button onClick={() => {
                    console.log(files)
                    const formData = new FormData()
                    // formData.append('files', files)

                    for (let i = 0; i < files.length; i++) {
                        formData.append("files", files[i])
                    }

                    axios.post("http://localhost:5000/upload/imgs", formData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                }}>upload imgs</button>


            </div>

           

        </div>
    );
}

export default SignIn;