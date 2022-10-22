import classNames from "classnames/bind";
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <h1>CREDIT</h1>
            <div className={cx('credit')}>
                <div className={cx('CRE_content_1')}>
                    <p>Nguyễn Đăng Thiên An</p>
                    <p>Đoàn Quang Đăng</p>
                    <p>Phạm Phú Huy</p>
                    <p>Vũ Nhật Tân</p>
                    <p>Lê Xuân Thắng</p>
                </div>
                <div className={cx('CRE_content_2')}>
                    <p>26211934770</p>
                    <p>26211935883</p>
                    <p>26211935473</p>
                    <p>26211935346</p>
                    <p>26211941542</p>

                </div>

            </div>
        </div>
    );
}

export default Footer;