import classNames from "classnames/bind";
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('credit')}>CREDIT</h1>
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

            <div className={cx('contact')}>
                <h1>contact us</h1>
                
                <div>
                    <img className={cx("")} src={require("./monitoring.png")} alt=""/> 
                    <div>
                        <div>
                            <label>Email</label>
                            <br/>
                            <input/>
                        </div>
                        <br/>

                        <div>
                            <label>Nội dung</label>
                            <br/>

                            <textarea/>
                        </div>
                        <button className={cx('send_btn')}>gửi</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;