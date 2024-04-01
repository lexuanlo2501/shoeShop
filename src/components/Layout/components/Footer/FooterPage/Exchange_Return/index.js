import classNames from "classnames/bind";
import styles from './Exchange_Return.module.scss'
import {Link} from 'react-router-dom'

const cx = classNames.bind(styles)

function Exchange_Return() {
  return ( 
  <div className={cx('wrapper')}>

    <h1>CHÍNH SÁCH ĐỔI - TRẢ HÀNG</h1>

    <div className={cx('wrapper_1')}>
      <p className={cx('red')}><strong><i>Supersports sẽ áp dụng Chính sách đổi - trả hàng MIỄN PHÍ cho các yêu cầu phát sinh từ ngày 03/06/2024.</i></strong></p> 
      <h2>I. QUY ĐỊNH CHUNG</h2>

    <ul>
      <li>Mỗi sản phẩm chỉ được đổi trả 1 lần.</li>
      <li>Chỉ áp dụng cho đơn hàng mua trên website Sports.</li>
      <li>Việc đổi trả hàng hóa sẽ phụ thuộc theo quyết định cuối cùng của Sports và dựa trên mức giá tại thời điểm mua hàng hoặc sản phẩm có giá trị tương đương.</li>
      <li>Sports có quyền đánh giá tình trạng sản phẩm đổi / trả / lỗi trước khi thực hiện bất kỳ việc sửa chữa hoặc đổi sản phẩm.</li>
      <li>Sports có quyền điều chỉnh các chính sách và điều kiện của website đối với các mặt hàng khuyến mại và chương trình đặc biệt tại bất kỳ thời điểm nào.</li>

    </ul>

    </div>

     <div className={cx('wrapper_2')}>

    <h2><strong>II. CHÍNH SÁCH ĐỔI - TRẢ SẢN PHẨM</strong></h2>
    <h3> <strong> 1. Thời gian đổi - trả sản phẩm</strong></h3>
    <ul>

<li><strong>Sản phẩm nguyên giá ( KHÔNG ÁP DỤNG</strong> chương trình khuyến mãi và / hoặc mã giảm giá): trong vòng <strong>30 ngày</strong> tính từ ngày khách hàng nhận được đơn hàng từ đơn vị vận chuyển.</li>
<li><strong>Sản phẩm khuyến mãi ( ÁP DỤNG</strong> chương trình khuyến mãi, mã giảm giá và / hoặc giảm giá trực tiếp): trong vòng <strong>10 ngày</strong> tính từ ngày khách hàng nhận được đơn hàng từ đơn vị vận chuyển.</li>

    </ul>

    <h3> <strong> 2. Điều kiện đổi - trả sản phẩm</strong></h3>
    <p><strong>Sản phẩm gửi trả cần đáp ứng TẤT CẢ những điều kiện dưới đây:</strong></p>

    <ul>
      <li>Sản phẩm chưa qua sử dụng, chưa qua giặt ủi, không có mùi lạ.</li>
      <li>Sản phẩm còn nguyên nhãn mác, hộp sản phẩm đi kèm (nếu có)</li>
      <li>Khách hàng có hóa đơn chứng từ mua hàng đầy đủ</li>
      <li>Sản phẩm không bị lỗi do quá trình lưu giữ, vận chuyển của người sử dụng</li>
    </ul>

     </div>

     <div className={cx('wrapper_3')}>

      <h3><strong>3. Quy trình đổi / trả sản phẩm:</strong></h3>

      <p><strong>Bước 1:</strong> Quý khách hàng <strong>bắt buộc</strong> phải liên hệ với bộ phận chăm sóc khách hàng khi có phát sinh nhu cầu đổi / trả để được phản hồi hướng xử lý phù hợp.</p>

      <div>
        <p><strong>Liên hệ bộ phận CSKH để được hướng dẫn theo một trong các cách sau:</strong></p>

        <ul>
          <li>Tổng đài: <strong>1900 63 64 01</strong> (từ 09h00 đến 18h00 hàng ngày)</li>
          <li>Email Bộ phận Chăm Sóc Khách Hàng (Offline + Online): <a href="mailto:lexuanlo2501@gmail.com?subject='Phản hồi từ khách hàng'&body='...'" ><strong>ce@sports.com.vn</strong></a></li>
        </ul>
      </div>


      <p><strong>Bước 2:</strong> Sau khi yêu cầu hoàn trả được chấp nhận, đơn vị vận chuyển của Supersports sẽ tiến hành thu hồi sản phẩm tại địa chỉ mà Quý khách hàng đã cung cấp<i> (Áp dụng trên toàn quốc).</i></p>

      <p><strong>Bước 3:</strong> Khi sản phẩm được hoàn về kho, Supersports sẽ kiểm tra lại tình trạng sản phẩm và quyết định sản phẩm đủ điều kiện tiến hành đổi - trả hay không. Sau đó, Supersports sẽ tiến hành vận chuyển sản phẩm mới nếu Quý khách hàng có nhu cầu đổi hàng.</p>

      <p><strong className={cx('red')}>(*) Lưu ý </strong></p>

      <ul>
        <li>Quý khách được <strong>MIỄN PHÍ</strong> thu hồi và đổi mới đối với tất cả sản phẩm đủ điều kiện theo quy định của chính sách trên.</li>
        <li>Tất cả yêu cầu hoàn trả sản phẩm phải được Supersports cấp Ủy quyền trả lại sản phẩm từ trước để đảm bảo yêu cầu được xử lý phù hợp. Ngoài ra, đối với đơn hàng mua trực tuyến, <strong>việc đổi trả chỉ được thực hiện thông qua website</strong> <Link onClick={()=> window.scroll(0,0)} className={cx('blue')}  to='/home'><span className={cx('hover')}><strong >sports.com.vn</strong></span></Link>, không áp dụng cho trường hợp giao dịch đổi trả tại cửa hàng.</li>

      </ul>
     </div>
      
      <div className={cx('wrapper_4')}>
      
        <h3><strong>4. Thời gian và phương thức hoàn:</strong></h3>
        <p>Đối với những trường hợp Quý khách hàng có nhu cầu trả hàng, Supersports cung cấp 3 phương thức hoàn sau đây:</p>
        <ul>
          <li><strong>Hoàn coupon:</strong> Sau khi xác nhận sản phẩm gửi trả của quý khách đủ điều kiện hoàn, Supersports sẽ gửi cho quý khách 01 mã coupon có giá trị tương đương với giá trị quý khách đã mua để tiếp tục mua sắm trên website <Link to='/home'><i className={cx('blue-hover')}><strong >https://sports.com.vn/</strong></i></Link> thông qua email cá nhân của quý khách kèm với điều kiện sử dụng và thời hạn của coupon. Thời gian hoàn coupon <strong>từ 1-2 ngày làm việc</strong>. Coupon chỉ áp dụng tại website, <strong>KHÔNG</strong> áp dụng tại cửa hàng. </li>
          <li><strong>Hoàn tiền thông qua cổng thanh toán online:</strong> Nếu quý khách đã thanh toán qua cổng thanh toán online, Supersports sẽ hoàn tiền thông qua cổng thanh toán online về tài khoản ban đầu mà quý khách đã dùng để thanh toán. Thời gian hoàn tiền <strong>từ 10 - 45 ngày làm việc (tùy theo loại thẻ quý khách sử dụng).</strong></li>

          <li><strong>Hoàn tiền thông qua số tài khoản cá nhân:</strong> Nếu quý khách thanh toán bằng tiền mặt, Supersports sẽ hoàn tiền cho quý khách thông qua tài khoản ngân hàng mà quý khách cung cấp. Thời gian hoàn tiền <strong>trong vòng 30 ngày làm việc kể từ ngày nhận hàng hoàn.</strong></li>
        </ul>

       <p><strong className={cx('red')}>(*) Lưu ý:</strong></p>
       <ul>
        <li>Trong trường hợp sản phẩm đổi hết size, Sports sẽ hỗ trợ Quý khách đổi sang sản phẩm khác <i><u>có giá trị bằng hoặc cao hơn </u></i>sản phẩm cũ. (<i>Sports <strong>KHÔNG</strong> hoàn lại phần tiền chêch lệch nếu Quý khách chọn sản phẩm <i><u>có giá trị thấp hơn</u></i>).</i> </li>
        <li>Trong trường hợp sản phẩm đổi hết size nhưng Quý khách chưa tìm được sản phẩm khác ưng ý, Supersports sẽ hoàn coupon có giá trị tương đương giá trị sản phẩm. <i>(Coupon chỉ áp dụng tại website <Link className={cx('hover')} to='/home'><span className={cx('blue-hover')}><strong className={cx('hover')}>sports.com.vn</strong></span></Link>, <strong>KHÔNG</strong> áp dụng tại hệ thống cửa hàng)</i>.</li>
        <li>Quý khách hàng bắt buộc sử dụng đơn vị vận chuyển do Sports chỉ định cho các trường hợp đổi / trả hàng hóa, không tự ý sử dụng đơn vị vận chuyển khác để tránh xảy ra sai sót ảnh hưởng đến quy trình kiểm soát đơn hàng của Sports.</li>
        <li>Trong mọi trường hợp xảy ra tranh chấp, quyết định của Sports sẽ là quyết định cuối cùng.</li>
       </ul>


         
             <p id="dieu-kien-anchor">&nbsp;</p> 
             <table border="1">
              <tbody>
                  
                  <tr>
                    <td className={cx('bold')}>DANH MỤC HÀNG HÓA</td>
                    <td className={cx('bold')}>SẢN PHẨM</td>
                    <td className={cx('bold')}>CHI TIẾT</td>
                    <td className={cx('bold')}>ĐỔI / TRẢ</td>
                    <td className={cx('bold')}>ĐIỀU KIỆN</td>
                  </tr>
    
                  <tr>
    
                    <td rowSpan={11} className={cx('bold')}>
                    TRANG PHỤC</td>
    
                    <td rowSpan={5}>Áo</td>
                      
                    <td>Áo polo</td>
    
                    <td>CÓ</td>
    
                    <td rowSpan={11}><p style={{marginTop:'0px',marginBottom:'8px'}}>Chưa mặc, chưa giặt rửa, không có mùi và còn nguyên nhãn mác.</p>
                  
                    <p style={{marginTop:'0px'}}>Còn nguyên túi đựng (nếu có).</p>
                    </td>
    
                  </tr>
    
                  <tr>
                      <td>Áo khoác</td>
                      <td>CÓ</td>
                   
                  </tr>
                  <tr>
                     <td>Áo ba lỗ & Áo thun</td>
                     <td>CÓ</td>
                  </tr>
                  <tr>
    
                    <td>Áo chui đầu & Áo nỉ</td>
                    <td>CÓ</td>
                  </tr>
                  <tr>
                    <td>Áo bra tập luyện</td>
                    <td>KHÔNG</td>
                  </tr>
      
                  <tr>
                    <td>Đồ bộ bóng đá</td>
                    <td>-</td>
                    <td>CÓ</td>
    
                  </tr>
    
                  <tr>
                    <td>Đồ bơi</td>
                    <td>-</td>
                    <td>KHÔNG</td>
                  </tr>
    
                  <tr>
                    <td>Đồ lót</td>
                    <td>-</td>
                    <td>KHÔNG</td>
                  </tr>
    
                  <tr>
                     <td rowSpan={3}>Quần </td>
                     <td>Quần & áo bóng rổ</td>
                     <td>CÓ</td>
    
                  </tr>
    
                  <tr>
    
                    <td>
                    Quần dài thể thao
    
                    </td>
    
                    <td>
                    CÓ
                    </td>
                  </tr>
    
                  <tr>
    
                    <td>Quần ngắn</td>
                    <td>CÓ</td>
    
                  </tr>
    
                  <tr>
    
                    <td rowSpan={6}>
                      <strong>GIÀY DÉP</strong>
                      </td>
                    <td>Giày thời trang</td>
                    <td>-</td>
                    <td>CÓ</td>
                    <td rowSpan={6}><p style={{marginTop:'0px',marginBottom:'8px'}}>Chưa mang, không có mùi, chưa giặt rửa và còn nguyên nhãn mác.</p>
                    <p style={{marginTop:'0px'}}>Còn nguyên hộp (nếu có)</p>
                    </td>
                    </tr>
    
                    <tr>
                      <td>
                      Giày chạy bộ
                      </td>
    
                      <td>-</td>
    
                      <td>CÓ</td>
                    </tr>
    
                    <tr>
                      <td>Giày luyện tập</td>
                      <td>-</td>
                      <td>CÓ</td>
                    </tr>
    
                    <tr>
                      <td>Giày bóng rổ</td>
                      <td>-</td>
                      <td>CÓ</td>
                    </tr>
    
                    <tr>
                      <td>Giày bóng đá</td>
                      <td>-</td>
                      <td>CÓ</td>
                    </tr>
    
                    <tr>
                      <td>Xăng đan & Dép</td>
                      <td>-</td>
                      <td>CÓ</td>
                    </tr>
    
                    <tr>
                      <td rowSpan={5}>
                          <strong>DỤNG CỤ</strong>
                      </td>
    
                      <td rowSpan={2}>
                      Bóng thể thao
                      </td>
    
                      <td>Quả bóng rổ</td>
    
                      <td>KHÔNG</td>
    
                      <td rowSpan={5}></td>
                    </tr>
    
                    <tr>
                      <td>
                      Quả bóng đá
                      </td>
    
                      <td>KHÔNG</td>
                    </tr>
    
                    <tr>
                      <td>Dụng cụ yoga</td>
                      <td>Bóng, thảm, gạch…</td>
                      <td>KHÔNG</td>
                    </tr>
    
                    <tr>
                      <td>Đồ bảo hộ</td>
                      <td>Các loại dụng cụ hỗ trợ</td>
                      <td>KHÔNG</td>
                    </tr>
    
                    <tr>
                      <td>Đồ tập luyện</td>
                      <td>Thanh xà, khung goal, con lăn…</td>
                      <td>KHÔNG</td>
                    </tr>
    
                    <tr>
                      <td rowSpan={13}><strong>PHỤ KIỆN</strong></td>
                      <td>Bình nước</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                      <td rowSpan={6}>-</td>
                    </tr>
    
                    <tr>
                      <td>Bộ chăm sóc giày</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                    </tr>
    
                    <tr>
                      <td>Đồ bảo hộ</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                    </tr>
    
                    <tr>
                      <td>Găng tay</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                    </tr>
    
                    <tr>
                      <td>Mũ/ nón</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                    </tr>
    
                    <tr>
                      <td>Túi/ balo</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                    </tr>
    
                    <tr>
                      <td>Khăn tập</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                      <td rowSpan={7}><p style={{marginTop:'0px',marginBottom:'16px'}}>Còn nguyên tem, nguyên hộp (nếu có)</p></td>
                    </tr>
    
                    <tr>
                      <td>Đĩa ném</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                      
                    </tr>
    
                    <tr>
                      <td>Bóng ném</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                      
                    </tr>
    
                    <tr>
                      <td>Vớ</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                      
                    </tr>
    
                    <tr>
                      <td>Phụ kiện bơi lội</td>
                      <td>Mắt kính bơi, nhét tai, chân vịt, phao…</td>
                      <td>CÓ</td>
                      
                    </tr>
    
                    <tr>
                      <td>Jibbitz</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                      
                    </tr>
    
                    <tr>
                      <td>Miếng lót giày</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                      
                    </tr>
    
                    <tr>
                      <td rowSpan={6}><strong>KHÁC</strong></td>
                      <td>Đồng hồ</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                      <td rowSpan={6}></td>
                      
                    </tr>
    
                    <tr>
                   
                      <td>Xe Scooter</td>
                      <td>-</td>
                      <td>KHÔNG</td>
                      
                    </tr>
    
                    <tr>
                   
                   <td>Xe đạp</td>
                   <td>-</td>
                   <td>KHÔNG</td>
                   
                 </tr>
    
                 <tr>
                   
                   <td>Máy ảnh</td>
                   <td>-</td>
                   <td>KHÔNG</td>
                   
                 </tr>
    
                 <tr>
                   
                   <td>Thiết bị cảm biến nhịp tim</td>
                   <td>-</td>
                   <td>KHÔNG</td>
                   
                 </tr>
    
                 <tr>
                   
                   <td>Quà tặng khuyến mãi</td>
                   <td>-</td>
                   <td>KHÔNG</td>
                   
                 </tr>
                    
              </tbody>
             </table>
          
   
      </div>
    </div> 
    );
}

export default Exchange_Return;