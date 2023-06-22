import classNames from "classnames/bind";
import style from './LayoutUserInfor.module.scss'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faClipboard, faCoins, faIdCard, faTicket } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style)


function LayoutUserInfor({children}) {
    const [user, setUser] = useState({})

    useEffect(() => {
        const userLC = JSON.parse(localStorage.getItem("tokens"));
        setUser(userLC)
    }, [])


    return (
        <div className={cx('wrapper')}>
            <div>{children}</div>
            <div className={cx('sideBar')}>
                <p>Hello, {user.fullName}</p>
                <ul>
                    <li> <Link to='/infor'><span><FontAwesomeIcon icon={faIdCard}/></span>tài khoản của tôi</Link></li>
                    <li> <Link to='/purchaseOrder'><span><FontAwesomeIcon icon={faClipboard}/></span>đơn mua</Link></li>
                    <li> <Link to='/'><span><FontAwesomeIcon icon={faBell}/></span>thông báo</Link></li>
                    <li> <Link to='/'><span><FontAwesomeIcon icon={faTicket}/></span>kho voucher</Link></li>
                    <li> <Link to='/'><span><FontAwesomeIcon icon={faCoins}/></span>tích điểm</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default LayoutUserInfor;