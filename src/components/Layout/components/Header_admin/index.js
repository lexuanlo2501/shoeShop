import classNames from "classnames/bind";
import styles from './Header_admin.module.scss'

const cx = classNames.bind(styles)

function Header_admin() {
    return ( 
        <header className={cx('wrapper')}>

        </header> 
    );
}

export default Header_admin;