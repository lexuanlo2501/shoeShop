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
    
    let dataSideBar = [
        {
            route:"",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faHome}/>,
            title: "tổng thế",
        },
        {
            route:"addProducts",
            Icon : <FontAwesomeIcon className={cx('icon_barItem')} icon={faAdd}/>,
            title: "thêm SP",
        },
        {
            route: inforUser.role ==="seller" ? `modifyProducts?_sellerId=${inforUser.accName}` : "modifyProducts",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faPenToSquare}/>,
            title: "hiệu chỉnh SP",
        },
        {
            route: "comfirming",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faCircleDollarToSlot}/>,
            title: "đơn hàng",
        },
        {
            route:"",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faLayerGroup}/>,
            title: "doanh thu",
        },
        {
            route:"accounts",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faUsers}/>,
            title: "người dùng",
        },
        {
            route:"history",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faClockRotateLeft}/>,
            title: "lịch sử",
        },
        {
            route:"",
            Icon :<FontAwesomeIcon className={cx('icon_barItem')} icon={faTrashCan}/>,
            title: "thùng rác",
        },
    ]

    if(inforUser){

    }

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