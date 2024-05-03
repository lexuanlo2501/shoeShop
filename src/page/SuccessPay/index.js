import axios from "axios";
import classNames from "classnames/bind";
import { useEffect } from "react";
import styles from './SuccessPay.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { createAxios } from "../../createInstance";
const axiosJWT = createAxios()


const cx = classNames.bind(styles)

function SuccessPay() {
    let time_render = 1;

    useEffect(() => {
        if(time_render === 1) {
            let currentUrl = window.location.href;
            let param = currentUrl.split("?")[1]
            let paramToObject =currentUrl.split("?")[1] && JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
        
            console.log(paramToObject)
    
            if(paramToObject?.vnp_TransactionStatus === "00") {
                const user = JSON.parse(localStorage.getItem("tokens"))
                const cart = JSON.parse(localStorage.getItem("cart"))
    
                const order = {
                    "client_id" : user.accName,
                    "address": user.address,
                    "description": user.description,
                    "isPay":1,
                    "id":paramToObject.vnp_TxnRef,
                    "products": cart.map(prod => ({
                        quantity:prod.quantity,
                        size: prod.size,
                        product_id: prod.id
                    })),
                }
                axiosJWT.post(process.env.REACT_APP_BACKEND_URL+'/orders', order,{
                    headers: {Authorization: user.accessToken}
                })
            }
        }
       time_render++
    }, [])
    
   
    return (
        <div className={cx("wrapper")}>
            <div className={cx("nofication")}>
                <FontAwesomeIcon icon={faCircleCheck} className={cx("success_icon")} />
                <h2>THANH TOÁN THÀNH CÔNG</h2>
                <p>Bạn có thể theo dõi trong <Link className={cx("navigate_purcha")}  to="/PurchaseOrder" replace>đơn hàng của tôi</Link>.</p>
                <Link className={cx("navigate_prodList")}  to="/shoes?_page=1&_limit=16" replace>TIẾP TỤC MUA HÀNG</Link>

            </div>
        </div>
    );
}

export default SuccessPay;