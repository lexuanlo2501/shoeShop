import classNames from "classnames/bind";
import styles from './Footer.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function Footer() {
    

    
    return (
        <div className={cx('wrapper')}>

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

            <div className={cx("footer")}>
              <div className={cx('wrapper_footer')}>
                  <ul>
                    <h2>CÔNG TY TNHH MTV THƯƠNG MẠI THỜI TRANG TỔNG HỢP (GTF)</h2>
                    <li>
                  <span>Văn phòng: </span>Số 163, Phan Đăng Lưu, Phường Hòa Cường, Quận Hải Châu, Đà Nẵng, Việt Nam
                    </li>
                    <li>
                        <span>Địa chỉ kho: </span>14 Đường Phan Đăng Lưu, Phường Hòa Cường, Quận Hải Châu, TP. Đà Nẵng
                    </li>
                    <li>
                        <span>Tổng đài: </span>1900 63 64 01
                    </li>
                    <li>
                        <span>Mã số Doanh Nghiệp:  </span>0314635071, đăng ký thay đổi ngày 03 tháng 06 năm 2024
                    </li>
                    </ul>   

                    <ul>
                        <h2>VỀ SPORTS</h2>
                        <li><Link onClick={()=>window.scroll(0,0)} to='/contact' className={cx('link_footer')}>Thông tin liên hệ</Link></li><Link></Link>
                        </ul>
                        <ul>
                        <h2>Hỗ trợ khách hàng</h2>
                        <li><Link onClick={()=> {window.scrollTo(0, 0)}} to='/deliveryPolicy' className={cx('link_footer')}>Chính sách giao hàng</Link></li>
                        <li><Link onClick={() => window.scroll(0,0)} to='/guidepicksize' className={cx('link_footer')}>Hướng dẫn chọn size</Link></li>
                        <li><Link to='/exchangeReturn' onClick={() => window.scroll(0,0)} className={cx('link_footer')}>Chính sách đổi trả hàng</Link></li>
                        <li><Link  onClick={() => window.scroll(0,0)}  to="/conditionClause" className={cx('link_footer')}>Các điều khoản và điều kiện</Link></li>
                        <li><Link to='/securityPolicy' onClick={() => window.scroll(0,0)}   className={cx('link_footer')}>Chính sách bảo mật</Link></li>
                        </ul>
    
                        <ul>
                            <h2>PHƯƠNG THỨC THANH TOÁN</h2>
                            <li><img src="https://cdn.shopify.com/s/files/1/0456/5070/6581/files/Group_61032_3fc74d64-38b7-4e73-9cdc-596f0f8d34a7.png?v=1684487469" /></li>
                        </ul>

                        
              </div>
            </div>
        </div>
    );
}

export default Footer;