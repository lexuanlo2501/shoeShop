import classNames from "classnames/bind";
import styles from './Header_admin.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBell, faCalendar } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles)

function Header_admin() {

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
            </div>
        </header>
        
    ) 
}

export default Header_admin;