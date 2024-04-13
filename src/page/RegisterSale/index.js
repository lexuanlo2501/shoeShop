import classNames from "classnames/bind";
import styles from "./registerSale.module.scss"
import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { createAxios } from "../../createInstance";
import {toast} from 'react-toastify';


const cx = classNames.bind(styles)
let axiosJWT = createAxios()

const RegisterSale = () => {
    const navigate = useNavigate();

    const userInfor = JSON.parse(localStorage.getItem("tokens"))
    const handleRegister = () => {
        axiosJWT.patch(process.env.REACT_APP_BACKEND_URL+`/accounts/${userInfor.accName}`,{role:"seller"}, {
            headers: {Authorization: userInfor.accessToken}
        })
        .then(res => {
            if(res.data.status) {
                navigate("/saleHome")
                localStorage.setItem("tokens", JSON.stringify({...userInfor, role:"seller"}))
                toast.success("Đăng Ký Thành Công")
            }
        })
    }

    return (
        <div className={cx("wrapper_Register")}>
            <h1>Chào mừng bạn đến với kênh bán hàng</h1>
            <button onClick={handleRegister}>
                Bắt Đầu Đăng Ký
            </button>
        </div>
    )
}
export default RegisterSale;

