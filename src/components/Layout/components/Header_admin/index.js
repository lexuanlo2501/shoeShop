import classNames from "classnames/bind";
import styles from './Header_admin.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBell, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless';

import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles)


function Header_admin() {
    const navigate = useNavigate();

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
                <FontAwesomeIcon className={cx('alert-chat')} icon={faCommentDots}/>
                <FontAwesomeIcon className={cx('alert-chat')} icon={faBell}/>
                {/* <FontAwesomeIcon className={cx('alert-chat')} icon={faUserAstronaut}/> */}
                <Tippy
                    trigger="click"
                    interactive
                    placement="bottom-end"	
                    render={attrs => (
                        <div className={cx('menu_avatar')} tabIndex="-1" {...attrs}>
                            <ul>
                                <li>
                                    <Link to='/'>Thông tin cá nhân</Link>
                                </li>
                                <li
                                    onClick={() => {
                                        localStorage.setItem("tokens", JSON.stringify({}));
                                        navigate("/signin")
                                    }}
                                >
                                    Đăng xuất
                                    <FontAwesomeIcon className={cx('logout_icon')}  icon={faRightFromBracket}/>
                                </li>
                            </ul>
                        </div>
                    )}
                >
                    <button className={cx(['alert-chat','avatar_admin'])}>
                        <FontAwesomeIcon   icon={faUserAstronaut}/>
                    </button>
                </Tippy>

            </div>
        </header>
        
    ) 
}

export default Header_admin;