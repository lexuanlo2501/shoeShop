import classNames from "classnames/bind";
import styles from "./saleChannel.module.scss"
import { useEffect } from "react";
import { useNavigate } from "react-router";
const cx = classNames.bind(styles)


function SaleChannel() {

    const userInfor = JSON.parse(localStorage.getItem("tokens"))
    const navigate = useNavigate();

    useEffect(() => {
        if(userInfor.role !== "seller") {
            navigate("/registerSale")
        }
    }, [])

    return (
        <div>
            <h1>HOME SALE</h1>
        </div>
    );
}


export default SaleChannel;