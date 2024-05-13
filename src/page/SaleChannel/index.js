import classNames from "classnames/bind";
import styles from "./saleChannel.module.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ProductList_v3 from "../ProductList_v3";
import AvatarAuto from "../../components/AvatarAuto";
import axios from "axios";
const cx = classNames.bind(styles)


function SaleChannel() {
    const [inforStore, setInforStore] = useState({})

    const userInfor = JSON.parse(localStorage.getItem("tokens"))
    const navigate = useNavigate();

    let currentUrl = window.location.href;
    let param = currentUrl.split("?")[1]
    let paramToObject = JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')

    useEffect(() => {
       axios.get(process.env.REACT_APP_BACKEND_URL+"/accountsLite/"+paramToObject._sellerID)
       .then(res => {
            setInforStore(res.data)
       })
    }, [])

    return (
        <div>
        {
            userInfor.accName === paramToObject._sellerID && <Link onClick={()=>window.scroll(0,0)} to='/admin' className={cx('link_footer')}>Quản Lý Cửa hàng</Link>
        }
            <div>
                <div>
                    <AvatarAuto nameU={inforStore.fullName}/>
                    <p>{inforStore.fullName}</p>
                </div>
                <p>Số Điện Thoại Liên Hệ: {inforStore.phoneNumber}</p>

            </div>

            <ProductList_v3 accNameSeller={paramToObject._sellerID}/>
        </div>
    );
}


export default SaleChannel;