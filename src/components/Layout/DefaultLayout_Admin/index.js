import classNames from "classnames/bind";
import styles from './DefaultLayout_Admin.module.scss'
import Header_admin from "../components/Header_admin";
import SideBar from "./SideBar";

const cx = classNames.bind(styles)


function DefaultLayout_Admin({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header_admin/>

            <div className={cx('container')}>
                <SideBar/>
                <div className={cx('content')}>{children}</div>
            </div>

        </div> 
    );
}

export default DefaultLayout_Admin;