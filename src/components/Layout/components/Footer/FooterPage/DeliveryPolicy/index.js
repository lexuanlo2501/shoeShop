import classNames from "classnames/bind";
import styles from './DeliveryPolicy.module.scss'
import { Link } from "react-router-dom";
const cx = classNames.bind(styles)

function DeliveryPolicy() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx('wrapper_content')}>
        <h1>CHÍNH SÁCH GIAO HÀNG</h1>
        <div className={cx('wrapper_content_policy')}>
          <span>* <strong className={cx('free_delivery')}> Miễn phí giao hàng </strong> với hóa đơn từ 699,000VNĐ (sau khi áp dụng ưu đãi / mã giảm giá) và trọng lượng dưới 5kg. 
          </span>
          <span>**Đối với những chương trình miễn phí vận chuyển cho mọi đơn hàng <strong> không áp dụng</strong> đối với những đơn hàng trên 5kg (tạ, chân vịt, xe đạp...).</span>
          <span>*** Thời gian giao hàng <strong>từ 8h - 17h</strong> hàng ngày <span className={cx('italic')}>(trừ chủ nhật/ Lễ/ Tết và các thời điểm khác được thông báo trên website </span><Link className={cx('link-to-home')} to='/home'>sports.com.vn</Link>)</span>
        </div>
           
        <div className={cx('rules_block')}><h2><strong>I. QUY         ĐỊNH KIỂM TRA HÀNG HÓA KHI GIAO NHẬN</strong></h2>
           <span>Nhằm bảo vệ tối đa quyền lợi khách hàng khi mua sắm tại Supersports, chúng tôi có chính sách đồng kiểm khi nhận hàng như sau:</span>
           <div className={cx('wrapper_quy-dinh-hang-hoa')}>
             <ul>
              <li>Quý khách được quyền yêu cầu nhân viên giao hàng mở niêm phong thùng hàng của Supersports để kiểm tra số lượng, màu sắc, chủng loại, kích cỡ, ngoại quan của các sản phẩm đã mua trước khi nhận. (Lưu ý: Việc đồng kiểm chỉ áp dụng kiểm tra ngoại quan, không áp dụng cho việc dùng thử sản phẩm và kiểm tra sâu chi tiết lỗi của sản phẩm).</li>
  
              <li>Trường hợp Quý khách không ưng ý với sản phẩm và đơn hàng có hình thức thanh toán COD, Quý khách có thể gửi lại sản phẩm cho nhân viên giao hàng mà không mất bất cứ chi phí nào.</li>
  
              <li>Trường hợp Quý khách không ưng ý sản phẩm nhưng đã thanh toán online, Quý khách có thể gửi lại sản phẩm cho nhân viên giao hàng đồng thời Quý khách vui lòng liên hệ bộ phận Chăm Sóc Khách Hàng để được hỗ trợ về vấn đề hoàn tiền mà không mất bất cứ chi phí nào.</li>
  
              <li>Trường hợp nhân viên giao hàng từ chối cho Quý khách kiểm tra hàng, Quý khách có quyền từ chối nhận hàng, sau đó liên hệ đến bộ phận Chăm Sóc Khách Hàng để được Supersports hỗ trợ ngay lập tức.</li>
  
              <li>Trường hợp Quý khách hài lòng với tình trạng sản phẩm được giao và đồng ý mua sản phẩm, Quý khách vui lòng ký vào biên bản đồng kiểm. Bằng việc ký vào biên bản đồng kiểm xác nhận hài lòng với tình trạng sản phẩm được giao, Quý khách xác nhận đã hoàn thành việc đồng kiểm và hoàn tất mua hàng.   </li>
  
             </ul>
           </div>

           <h2><strong>II. QUY ĐỊNH THỜI GIAN GIAO HÀNG</strong></h2>
           <span><span className={cx('bold')}>Thời gian phục vụ giao hàng:</span> Phục vụ giao hàng từ thứ 2 đến thứ 7 (trừ Chủ nhật và ngày Lễ, Tết).</span>
           <div className={cx('wrapper-table')}>
             <table className={cx('wrapper_quy-dinh-giao-hang')}>
              <tbody>
                <tr className={cx('height-22px')}>
                  <td className={cx('width-530px')}s><p><strong>Khu vực</strong></p></td>
                  <td className={cx('text-center')}><p><strong>Giao hàng tiêu chuẩn</strong></p></td>
                  
  
                </tr>
                <tr>
                  <td><p>Nội thành (HCM)</p></td>
                  <td className={cx('text-center')}>1-2 ngày làm việc</td>
  
                </tr>
  
                <tr>
                  <td><p>Nội vùng</p></td>
                  <td className={cx('text-center')}><p>1-3 ngày làm việc</p></td>
                </tr>
  
                <tr>
                  <td><p>Liên vùng (giữa 3 thành phố HCM, Hà Nội và Đà Nẵng)</p></td>
                  <td className={cx('text-center')}>3-5 ngày làm việc</td>
                </tr>
                <tr>
                  <td><p>Liên vùng (từ 3 thành phố lớn HCM, Hà Nội, Đà Nẵng đến các thành phố khác thuộc vùng khác)</p></td>
                  <td className={cx('text-center')}><p>5-7 ngày làm việc</p></td>
                </tr>
  
              </tbody>
  
             </table>
           </div>

           <span style={{
            marginBottom:'32px', 
            fontStyle:'italic'
          }}>(*) Chi tiết phân nội thành, ngoại thành: tùy vào từng nhà cung cấp dịch vụ vận chuyển sẽ có cách thức phân nội thành, ngoại thành khác nhau.</span>
           <span style={{marginBottom:'0'}} ><p style={{paddingLeft:'30px',
           color:'#0293dc',
           
             }}><u>Tại Hà Nội:</u></p></span>
                  <div className={cx('block-area')}>
                     <ul>
                      <li><strong>Khu vực nội thành</strong>: Quận Cầu Giấy, Hoàn Kiếm, Thanh Xuân, Ba Đình, Tây Hồ, Hai Bà Trưng, Đống Đa, Hoàng Mai, Hà Đông, Long Biên, Nam Từ Liêm, Bắc Từ Liêm</li>
                      <li><strong>Khu vực ngoại thành</strong>: Huyện Ba Vì, Huyện Chương Mỹ, Huyện Đan Phượng, Huyện Đông Anh, Huyện Gia Lâm, Huyện Hoài Đức, Huyện Mê Linh, Huyện Mỹ Đức, Huyện Phú Xuyên, Huyện Phúc Thọ, Huyện Quốc Oai, Huyện Sóc Sơn, Huyện Thạch Thất, Huyện Thanh Oai, Huyện Thanh Trì, Huyện Thường Tín, Huyện Ứng Hòa, Thị Xã Sơn Tây</li>
                     </ul>

                     
                  </div>

                  <span style={{marginBottom:'0'}}><p style={{paddingLeft:'30px',
           color:'#0293dc', marginTop:'18px'
           
             }}><u>Tại TP. Hồ Chí Minh:</u></p></span>
                  <div className={cx('block-area')}>
                     <ul>
                      <li><strong>Khu vực nội thành</strong>:  quận 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, Tân Bình, Tân Phú, Phú Nhuận, Bình Thạnh, Gò Vấp</li>
                      <li><strong>Khu vực ngoại thành</strong>: quận 9, quận 12, Bình Tân, Thủ Đức, huyện Hóc Môn, Bình Chánh, Nhà Bè, Củ Chi, Cần Giờ</li>
                      <li><strong>Tại các tỉnh, thành phố khác </strong>tùy theo phạm vi phục vụ của đơn vị giao nhận.</li>
                     </ul>

                     
                  </div>

                  <h2 style={{marginTop:'14px'}}><strong>III. QUY ĐỊNH PHÍ GIAO HÀNG</strong></h2>
                  <ul className={cx('list-quy-tac-giao-hang')}>
                    <li style={{listStyle:'disc', marginBottom:'6px'}}>Phí giao hàng của đơn hàng được tính dựa theo khoảng cách giữa cửa hàng cung cấp với địa chỉ giao hàng cùng với trọng lượng của sản phẩm.</li>
                    <li style={{listStyle:'disc'}}>Phí giao hàng của từng sản phẩm được thể hiện rõ ngay tại trang sản phẩm sau khi khách hàng nhập địa chỉ giao hàng.</li>
                  </ul>
                   
                   <div style={{  backgroundColor: '#e9f9ff', marginTop:'28px', paddingTop:'8px', paddingLeft:'8px',paddingRight:'8px' ,paddingBottom:'22px', maxWidth:'700px'}}>
                     <span><strong>Mọi thắc mắc hoặc cần hỗ trợ Quý khách vui lòng liên hệ:</strong></span>
  
                    <div className={cx('mobile-list')}>
                      <ul style={{paddingLeft:'60px', marginTop:'18px',}}>
                          <li style={{listStyle:'disc', marginBottom:'6px'}}>Tổng đài: 1900 63 64 01 (từ 09h00 đến 18h00 hàng ngày)</li>
                          <li style={{listStyle:'disc', }}>Email Bộ phận Chăm Sóc Khách Hàng (Offline + Online): ce@sports.com.vn</li>
  
                      </ul>
                    </div>
                   </div>
        </div>

        </div>
        
    </div>
  );
}

export default DeliveryPolicy;