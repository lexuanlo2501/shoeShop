import classNames from "classnames/bind";
import styles from './Header_admin.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBell, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faClose, faRightFromBracket, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless';

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createAxios } from "../../../../createInstance";

const cx = classNames.bind(styles)
let axiosJWT = createAxios()

function reverseArray(array) {
    var reversedArray = array.slice();
    reversedArray.reverse();
    return reversedArray;
}

function Header_admin() {
    const navigate = useNavigate();
    const [trigger, setTrigger] = useState(false)
    const [notify, setNotify] = useState([])



    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+"/notify?_to_admin_all=admin")
        .then(res => {
            setNotify(res.data)
            console.log(res.data)
        })
        
    }, [trigger])
    
    const handleDelete_notify = (id) => {
        axios.delete(process.env.REACT_APP_BACKEND_URL+"/notify/"+id)
    }


    const handleLogout = async () => {
        try {
            const infor_user = JSON.parse(localStorage.getItem("tokens"))
            await axiosJWT.post(process.env.REACT_APP_BACKEND_URL+"/logout/"+ infor_user.accName, 25,{
                headers: {Authorization: infor_user.accessToken}
            })
    
            localStorage.setItem("tokens", JSON.stringify({}));
            navigate("/signin")

    
        }
        catch(err) {
            console.log(err)
        }

    }

    let currDate = new Date()
    return ( 
        <header className={cx('wrapper')}>
            <div className={cx('left_side')}>
                <div className={cx('calendarCurr')}>
                    <FontAwesomeIcon icon={faCalendar}/>
                    <span>{currDate.toDateString()}</span>
                    
                </div>
            </div>

            <div className={cx('right_side')}>
                <Tippy
                    trigger="click"
                    interactive
                    placement="bottom-end"	
                    render={attrs => (
                        <div className={cx(["notify_admin", "shape_Tippy"])} tabIndex="-1" {...attrs}>
                        {!notify.length && <h2 className="text-center p-3 text-secondary">Không Có Thông Báo Nào</h2>}
                        {
                            reverseArray(notify).map(i => (
                                <div className={cx(["notify_item"])} key={i.id}>
                                    <div>
                                        <h3>{i.name}</h3>
                                        <p>{i.date}</p>
                                        <button
                                            onClick={() => {
                                                handleDelete_notify(i.id)
                                                setTrigger(pre => !pre)
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faClose}/>
                                        </button>
                                    </div>
                                    <p>{i.content}</p>
                                </div>
                            ))
                        }
                        </div>
                    )}
                >
                    <button className={cx(['header_action_btn',"notify"])}>
                        <FontAwesomeIcon  icon={faBell}/>
                    {
                        !!notify.length && <span className={cx("header_cart-notice")}></span>
                    }
                    </button>
                </Tippy>
                {/* <FontAwesomeIcon className={cx('alert-chat')} icon={faUserAstronaut}/> */}
                <Tippy
                    trigger="click"
                    interactive
                    placement="bottom-end"	
                    render={attrs => (
                        <div className={cx(['menu_avatar', "shape_Tippy"])} tabIndex="-1" {...attrs}>
                            <ul>
                                <li>
                                    <Link to='/'>Thông tin cá nhân</Link>
                                </li>
                                {/* <li
                                    onClick={() => {
                                        localStorage.setItem("tokens", JSON.stringify({}));
                                        navigate("/signin")
                                    }}
                                >
                                    Đăng xuất
                                    <FontAwesomeIcon className={cx('logout_icon')}  icon={faRightFromBracket}/>
                                </li> */}

                                <li onClick={handleLogout}>
                                    Đăng Xuất
                                    <FontAwesomeIcon className={cx('logout_icon')}  icon={faRightFromBracket}/>
                                </li>
                            </ul>
                        </div>
                    )}
                >
                    <button className={cx(['header_action_btn',"avatar",'avatar_admin'])}>
                        <FontAwesomeIcon   icon={faUserAstronaut}/>
                    </button>
                </Tippy>

            </div>
        </header>
        
    ) 
}

export default Header_admin;