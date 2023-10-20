import axios from "axios";
import classNames from "classnames/bind";
import { useEffect } from "react";
import styles from './SuccessPay.module.scss'


const cx = classNames.bind(styles)

function SuccessPay() {
    let time_render = 1;

    useEffect(() => {
        if(time_render === 1) {
            let currentUrl = window.location.href;
            let param = currentUrl.split("?")[1]
            let paramToObject =currentUrl.split("?")[1] && JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
        
            console.log(paramToObject)
    
            if(paramToObject.vnp_TransactionStatus === "00") {
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
                axios.post('http://localhost:5000/orders', order)
            }
        }
       time_render++


    }, [])

    
   
    return (
        <div className={cx("wrapper")}>
            <h2>THANH TOÁN THÀNH CÔNG</h2>
        </div>
    );
}

export default SuccessPay;