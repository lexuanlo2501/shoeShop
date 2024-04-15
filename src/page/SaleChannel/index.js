import classNames from "classnames/bind";
import styles from "./saleChannel.module.scss"
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
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
            <Link onClick={()=>window.scroll(0,0)} to='/admin' className={cx('link_footer')}>Quản Lý Cửa hàng</Link>
        </div>
    );
}


export default SaleChannel;