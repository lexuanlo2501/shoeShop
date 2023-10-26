import classNames from "classnames/bind";
import styles from './Footer.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function Footer() {
    return (
        <div className={cx('wrapper')}>
            {/* <h1 className={cx('credit')}>CREDIT</h1>
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

            </div> */}

            <div className={cx('contact')}>
                <h1>contact us</h1>
                
                <div>
                    <img className={cx("")} src={require("./monitoring.png")} alt=""/> 
                      
                    <a className={cx('send_btn')}
                        href="mailto:lexuanlo2501@gmail.com?subject='Phản hồi từ khách hàng'&body='...'"
                    >
                        <span>gửi
                            <span className={cx('styleMailLetter')}>
                                <span>m</span>
                                <span>a</span>
                                <span>i</span>
                                <span>l</span>
                            </span>
                        </span>
                        <FontAwesomeIcon icon={faEnvelope}/>
                    </a>
                        {/* <a href="mailto:lexuanlo2501@gmail.com">Click to Send an Email</a> */}
                        {/* <a href="mailto:lexuanlo2501@gmail.com?subject='Phản hồi từ khách hàng'&body='Just popped in to say hello'">Click to Send an Email</a> */}


                </div>
            </div>
        </div>
    );
}

export default Footer;