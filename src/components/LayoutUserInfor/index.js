import classNames from "classnames/bind";
import style from './LayoutUserInfor.module.scss'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faClipboard, faCoins, faIdCard, faTicket } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal_v2 from "../ConfirmModal_v2";

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
                    <ConfirmModal_v2
                        title="Đang Phát Triển"
                        body="Hiện chưa có tính năng này"
                    >
                        <li> <span><FontAwesomeIcon icon={faBell}/></span>thông báo</li>
                    </ConfirmModal_v2>
                    <ConfirmModal_v2
                        title="Đang Phát Triển"
                        body="Hiện chưa có tính năng này"
                    >
                        <li> <span><FontAwesomeIcon icon={faTicket}/></span>kho voucher</li>
                    </ConfirmModal_v2>
                    <ConfirmModal_v2
                        title="Đang Phát Triển"
                        body="Hiện chưa có tính năng này"
                    >
                        <li> <span><FontAwesomeIcon icon={faCoins}/></span>tích điểm</li>
                    </ConfirmModal_v2>
                </ul>
            </div>
        </div>
    );
}

export default LayoutUserInfor;