import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './sideBar.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faBars, faCircleDollarToSlot, faClockRotateLeft, faHome, faLayerGroup, faPenToSquare, faTrashCan, faUsers } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function SideBar() {
    const [showBar, setShowbar] = useState(false)
    const [activeRoute, setActiveRoute] = useState()
    
    const inforUser = JSON.parse(localStorage.getItem("tokens"))
    const showAdmin = inforUser.role === "admin"
    const showSeller = inforUser.role === "seller"

    let dataSideBar = [
        {
            route:"",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faHome}/>,
            title: "tổng thế",
            show: showAdmin || showSeller
        },
        {
            route:"addProducts",
            Icon : <FontAwesomeIcon className={cx('icon_barItem')} icon={faAdd}/>,
            title: "thêm SP",
            show: showAdmin || showSeller

        },
        {
            route: showSeller ? `modifyProducts?_sellerId=${inforUser.accName}` : "modifyProducts",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faPenToSquare}/>,
            title: "hiệu chỉnh SP",
            show: showAdmin || showSeller
        },
        {
            route: showSeller ? `comfirming?_sellerId=${inforUser.accName}` : "comfirming",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faCircleDollarToSlot}/>,
            title: "đơn hàng",
            show: showAdmin || showSeller
        },
        {
            route:"",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faLayerGroup}/>,
            title: "doanh thu",
            show: showAdmin || showSeller

        },
        {
            route:"accounts",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faUsers}/>,
            title: "người dùng",
            show: showAdmin
        },
        {
            route:"history",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faClockRotateLeft}/>,
            title: "lịch sử",
            show: showAdmin
        },
        {
            route:"",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faTrashCan}/>,
            title: "thùng rác",
            show: showAdmin
        },
    ]

    console.log(dataSideBar)

    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon icon={faBars}
                className={cx(['menu_mb_btn', {'showBar':showBar}])}
                onClick={() => {
                    setShowbar(pre => !pre)
                }}
            />


            <div className={cx('newSideBar_v2')}>
                
                <ul className={cx(['sideBar', {'showBar':showBar}])}>
                {
                 
                    dataSideBar.map((item, index) => (
                        item.show &&
                        <li key={index}>
                            <Link to={`/admin/${item.route}`}
                                className={cx({"active_route":activeRoute === index})}
                                onClick={() => {
                                    setActiveRoute(index)    
                                }}

                            >
                                {item.Icon}
                                <p className={cx(['title_barItem'])}>{item.title}</p>
                            </Link>
                        </li>
                    ))
                }
                </ul>
            </div>

            <div className={cx('overlay',{"show_overlay": showBar})}
                onClick={() => setShowbar(false)}
            ></div>
        </div>
     );
}


function Notify({children}) {
    return <span className={cx('quantity_notify')}>{children}</span>
}

export default SideBar;