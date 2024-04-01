import classNames from "classnames/bind";
import styles from './contact.module.scss'

const cx = classNames.bind(styles)

function Contact() {
  return ( <div className={cx('wrapper')}>
   <h1>Thông tin liên hệ</h1>
   <p><strong>Email Bộ phận Chăm Sóc Khách Hàng (Offilne + Online):</strong> <a className={cx('link-contact')} href="mailto:lexuanlo2501@gmail.com?subject='Phản hồi từ khách hàng'&body='...'">@sports.com.vn</a></p>
   <p><strong>Hotline: </strong>1900 63 64 01</p>
   <p><strong>Địa chỉ:</strong></p>
   <ul>
    <li>Công ty TNHH Một Thành Viên Thương Mại Thời Trang Tổng Hợp (GTF)</li>
    <li>Tầng 4, Tòa nhà Central Retail, 163 Phan Đăng Lưu, Phường 1, Quận Phú Nhuận, Thành phố Hồ Chí Minh, Việt Nam 70000 </li>
   </ul>
   <p><strong>Hỗ trợ khách hàng: </strong></p>
   <ul>
    <li>Thời gian nhận Email: 09:00 - 22:00 (Thứ 2 - Chủ nhật)</li>
    <li>Thời gian nhận Hotline: 09:00 - 18:00 (Thứ 2 - Chủ nhật)</li>
   </ul>
  </div> );
}

export default Contact;