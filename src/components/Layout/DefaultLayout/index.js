import classNames from "classnames/bind";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import Header from "../components/Header_admin";
import styles from './DefaultLayout.module.scss'
import SideBar from "./SideBar";

const cx = classNames.bind(styles)

function DefaultLayout({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header/>
            <div className={cx('container')}>
                <SideBar/>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer/>
        </div>
    );
}

export default DefaultLayout;