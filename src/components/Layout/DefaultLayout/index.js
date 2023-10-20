import classNames from "classnames/bind";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import Header from "../components/Header_admin";
import styles from './DefaultLayout.module.scss'
import SideBar from "./SideBar";

const cx = classNames.bind(styles)

function DefaultLayout({children, setRe_render}) {

    return ( 
        <div className={cx('wrapper')}>
            <Header setRe_render={setRe_render}/>
            <div className={cx('container')}>
                <SideBar setRe_render={setRe_render} />
                <div className={cx('content')}>{children}</div>
            </div>
            <div className={cx('footer')}>
                <Footer/>
            </div>
        </div>
    );
}

export default DefaultLayout;