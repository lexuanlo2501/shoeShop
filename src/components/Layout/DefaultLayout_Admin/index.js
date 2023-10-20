import classNames from "classnames/bind";
import styles from './DefaultLayout_Admin.module.scss'
import Header_admin from "../components/Header_admin";
import SideBar from "./SideBar";
import Team from "../../../page/Team";
import Meeting from "../../../page/Meeting";

const cx = classNames.bind(styles)


function DefaultLayout_Admin({children}) {
    return ( 
        <div className={cx('wrapper')}>

            <div className={cx('container')}>
                <SideBar/>
                <div className={cx('headerAndBody')}>
                    <Header_admin/>
                    <div className={cx('body')}>
                        <div className={cx('content')}>{children}</div>
                        {/* <div className={cx("member_control")}>
                            <Team/>
                            <Meeting/>
                        </div> */}
                    </div>
                </div>
            </div>

        </div> 
    );
}

export default DefaultLayout_Admin;