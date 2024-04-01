import classNames from "classnames/bind";
import styles from './Condition_Clause.module.scss'
import {Link} from 'react-router-dom'

const cx = classNames.bind(styles)

function Condition_Clause() {
  return ( 
  <div className={cx('wrapper')}>
    <h1>Điều khoản và Điều Kiện</h1>

    <p><strong>1. GIỚI THIỆU</strong></p>

    <div className={cx('wrapper_1')}>
       <p>Chúng tôi là <strong>Công Ty TNHH Thương Mại Thời Trang Tổng Hợp </strong>(Đăng ký Công ty 0314635071), có trụ sở đăng ký tại <i>163 Phan Đăng Lưu, Phường Hòa Cường Bắc, Quận Hải Châu, Thành phố Đà Nẵng, Việt Nam</i>, giao dịch dưới dạng <Link className={cx('link-to-home')} to ='/home'><strong>www.sports.com.vn.</strong></Link> </p>

       <p>1.1 Sports là công ty liên kết của <strong>Central Retail Corporation Company Limited</strong> đăng ký tại Việt Nam. </p>

       <p>1.2 Các Điều khoản và Điều kiện này là tài sản trí tuệ có bản quyền của chúng tôi. Bất kỳ việc sử dụng nào của các bên thứ ba, ngay cả các phần trích dẫn của Điều khoản và Điều kiện, cho mục đích thương mại cung cấp hàng hóa hoặc dịch vụ đều không được phép. Nếu vi phạm có thể bị khởi kiện.</p>
      
    </div>

  <div className={cx('wrapper_2')}>
    <p><strong>2. ĐỊNH NGHĨA</strong></p>
    <p className={cx('padding-left-30px')}>Trong các Điều khoản và Điều kiện này:</p>
    
    <div className={cx('wrapper_2_list')}>

     <ul>

            <li><i>"Tài khoản"</i> có nghĩa là Tài khoản Supersports mà Qúy khách sẽ cần đăng ký trên trang web nếu Qúy khách muốn gửi Đơn hàng trên trang web.</li>

            <li><i>"Ngày làm việc"</i> có nghĩa là bất kỳ ngày làm việc nào, từ Thứ Hai đến Thứ Sáu, không bao gồm các ngày nghỉ lễ của Việt Nam do công ty xác định.</li>

            <li><i>"Xác nhận đơn hàng"</i> có nghĩa là email của chúng tôi gửi đến Quý khách, trong đó chúng tôi xác nhận Đơn hàng của Quý khách theo điều khoản 4.2 bên dưới.</li>

            <li><i>"Hợp đồng"</i> có nghĩa là Đơn đặt hàng của Quý khách về một Sản phẩm hoặc các Sản phẩm phù hợp với các Điều khoản và Điều kiện này mà chúng tôi chấp nhận theo điều khoản 4.2 bên dưới.</li>

            <li><i>"Khách hàng"</i> có nghĩa là bất kỳ cá nhân nào đặt hàng trên Trang web.</li>

            <li><i>"Đơn đặt hàng"</i> có nghĩa là Đơn đặt hàng do Quý khách gửi đến Trang web để mua Sản phẩm từ chúng tôi hoặc các đối tác của chúng tôi.</li>

            <li><i>"Quý khách"</i> có nghĩa là Khách hàng đặt hàng với Supersports.</li>
            
     </ul>
     </div>

     <p className={cx('padding-left-30px')}>Tham chiếu đến <i>"các điều khoản"</i> là các điều khoản của các Điều khoản và Điều kiện này.</p>

     <div className={cx('wrapper_2_text')}>

      <p>Các tiêu đề chỉ để dễ tham khảo và không ảnh hưởng đến việc giải thích hoặc xây dựng các Điều khoản và Điều kiện.</p>
      <p>Các từ truyền đạt giới tính sẽ bao gồm mọi giới tính và các tham chiếu đến mọi người sẽ bao gồm một cá nhân, công ty, tập đoàn, công ty hoặc đối tác.</p>

     </div>

    </div>

    <div  className={cx('wrapper_3')}>
        
        <p><strong>3. ĐIỀU KHOẢN BÁN HÀNG </strong></p>

        <p><strong>3.1 Đăng ký</strong></p>
         
        <div className={cx('wrapper_3-item')}>
          <p>a) Để đặt hàng, Quý khách phải đăng ký với chúng tôi bằng cách tạo một Tài khoản trên trang web. Quý khách cần cung cấp cho chúng tôi thông tin chính xác và đúng sự thật. Quý khách cũng phải cập nhật thông tin của mình bằng cách thông báo cho chúng tôi về bất kỳ thay đổi nào, bằng cách sử dụng các phần có liên quan của Trang web.</p>

          <p>b) Quý khách không được lạm dụng trang web bằng cách tạo nhiều tài khoản người dùng.</p>

        </div>

        <p><strong>3.2 Hình thành đơn hàng</strong></p>
         
        <div className={cx('wrapper_3-item')}>
          <p>a) Thông tin có trong các Điều khoản và Điều kiện và các chi tiết có trên trang web này không phải là một lời đề nghị bán hàng mà là một lời mời trải nghiệm dịch vụ. Không có bất kì ràng buộc Hợp đồng liên quan đến Sản phẩm giữa Quý khách và chúng tôi cho đến khi chúng tôi vận chuyển Sản phẩm đến địa chỉ của Quý khách.</p>

          <p>b) Để gửi Đơn đặt hàng, Quý khách sẽ được yêu cầu thực hiện theo quy trình mua sắm trực tuyến trên Trang web. Sau đó, Quý khách sẽ nhận được một  email Xác nhận Đơn hàng của Quý khách.</p>

          <p>c) Đơn hàng chỉ được chúng tôi coi là đã hoàn thành khi Đơn hàng của Quý khách được chuyển đến địa chỉ giao hàng do bạn cung cấp.
          </p>

          <p>d) Đơn hàng sẽ chỉ liên quan đến những Sản phẩm mà chúng tôi giao cho Quý khách. Nếu Đơn đặt hàng của Quý khách bao gồm nhiều Sản phẩm, Sản phẩm có thể được giao cho Quý khách theo từng gói riêng biệt vào những thời điểm riêng biệt</p>

        </div>

        <p><strong>3.3 Giá và Thanh toán</strong></p>
        <div className={cx('wrapper_3-item')}>

          <p>Mặc dù chúng tôi nỗ lực hết sức để đảm bảo rằng tất cả các chi tiết, mô tả và giá cả xuất hiện trên trang web này là chính xác, nhưng có thể có những trường hợp sai sót có thể xảy ra. Nếu chúng tôi phát hiện ra sai sót về giá của bất kỳ Sản phẩm nào mà Quý khách đã đặt, chúng tôi sẽ thông báo về điều này sớm nhất có thể và cung cấp cho Quý khách xác nhận lại Đơn đặt hàng với giá chính xác hoặc hủy bỏ. Nếu chúng tôi không thể liên hệ với Quý khách, chúng tôi sẽ coi Đơn hàng như đã bị hủy. Nếu Quý khách hủy Đơn đặt hàng của mình trước khi chúng tôi giao hàng và Quý khách đã thanh toán cho Đơn hàng của mình, Quý khách sẽ được hoàn lại toàn bộ tiền (Theo quy định của công ty)
        </p>

          <p>a) Nếu có, giá đã bao gồm VAT (thuế giá trị gia tăng) và được tính bằng VNĐ. Phí dịch vụ sẽ được tính thêm nếu có; các khoản phí bổ sung đó được hiển thị rõ ràng và được bao gồm trong 'Tổng giá trị đơn hàng'.</p>

          <p>b) Chúng tôi không có nghĩa vụ phải thực hiện Đơn hàng của Quý khách nếu giá niêm yết trên trang web không chính xác (ngay cả sau khi Đơn hàng của Quý khách đã được chúng tôi xác nhận).
         </p>

          <p>c) Quý khách có thể thanh toán bằng bất kỳ đối tác thanh toán nào được liệt kê trên trang chủ của chúng tôi hoặc sử dụng phương thức thanh toán tiền mặt khi giao hàng. Tương tự, Quý khách có thể thanh toán toàn bộ giá đơn đặt hàng bằng thẻ quà tặng điện tử, tín dụng ví hoặc phiếu thưởng khuyến mại.
          </p>

          <p>d) Để giảm thiểu rủi ro bị truy cập trái phép, chúng tôi mã hóa dữ liệu thẻ của Quý khách. Khi chúng tôi nhận được Đơn đặt hàng của Quý khách, chúng tôi sẽ yêu cầu ủy quyền trước trên thẻ của Quý khách để đảm bảo có đủ tiền để hoàn tất giao dịch. Đơn đặt hàng sẽ không được xác nhận cho đến khi kiểm tra ủy quyền trước này đã được hoàn thành. Thẻ của Quý khách sẽ được trừ phí sau khi chúng tôi gửi cho Quý khách Xác nhận đơn hàng. Thẻ phải được kiểm tra xác thực và được nhà phát hành thẻ cho phép. Nếu chúng tôi không nhận được ủy quyền cần thiết, chúng tôi sẽ không chịu trách nhiệm về bất kỳ sự chậm trễ hoặc không giao hàng nào.</p>
        </div>

        <p><strong>3.4 Lỗi đơn hàng</strong></p>
         
         <div className={cx('wrapper_3-item')}>
 
           <p>Nếu Quý khách phát hiện đã mắc lỗi với Đơn đặt hàng của mình sau khi Quý khách đã hoàn tất đơn hàng trên Trang web, vui lòng liên hệ:
 </p>
 
           <div className={cx('padding-left-30px')}>
            <ul>
               <li><i>Email Bộ phận Thương Mại Điện Tử (Supersports Online):</i> <a href="mailto:lexuanlo2501@gmail.com?subject='Phản hồi từ khách hàng'&body='...'" className={cx('link-to-home')}><strong>ecom@sports.com.vn</strong></a> </li>
               <li><i>Email Bộ phận Chăm Sóc Khách Hàng (Offline):</i> <a href="mailto:lexuanlo2501@gmail.com?subject=%27Ph%E1%BA%A3n%20h%E1%BB%93i%20t%E1%BB%AB%20kh%C3%A1ch%20h%C3%A0ng%27&body=%27...%27" className={cx('link-to-home')}><strong>ce@sports.com.vn</strong></a></li>
            </ul>
           </div>
        
         </div>


         <p><strong>3.5 Từ chối đơn hàng</strong></p>
         
         <div className={cx('wrapper_3-item')}>
 
           <p>Chúng tôi có quyền thu hồi bất kỳ sản phẩm nào khỏi trang web hoặc chỉnh sửa bất kỳ tài liệu hoặc nội dung nào trên trang web này.
        </p>
           
           <p>Chúng tôi sẽ cố gắng để luôn hoàn tất tất cả các Đơn đặt hàng nhưng một số trường hợp ngoại lệ, chúng tôi buộc phải từ chối xử lý Đơn hàng ngay cả khi chúng tôi đã gửi cho Quý khách thông tin Xác nhận Đơn hàng.
           </p>

           <p>Quý hàng phải tuân thủ các Điều khoản và Điều kiện này. Supersports có quyền giới hạn, hủy đơn hàng đối với những khách hàng vi phạm bất kỳ phần nào trong các Điều khoản và Điều kiện trên mà không cần thông báo trước.
           </p>

           <p>Nếu chúng tôi hủy Đơn đặt hàng của Quý khách và Quý khách đã thanh toán cho Đơn hàng của mình, số tiền thanh toán sẽ được hoàn lại đầy đủ cho Quý khách.</p>

           <p>Chúng tôi sẽ không chịu trách nhiệm với Quý khách hoặc bất kỳ bên thứ ba nào khác vì lý do chúng tôi thu hồi bất kỳ Sản phẩm nào khỏi trang web này, cho dù nó đã được bán hay chưa, xóa hoặc chỉnh sửa bất kỳ tài liệu hoặc nội dung nào trên trang web này hoặc vì từ chối xử lý hoặc chấp nhận Đơn đặt hàng.</p>
         </div>

    </div>

    <div  className={cx('wrapper_4')}>
      
   <p><strong>4. CHÍNH SÁCH GIAO HÀNG</strong></p>

    <div>

    <p>
4.1. Chúng tôi luôn cố gắng giao Sản phẩm cho Quý khách tại địa điểm giao hàng theo yêu cầu của Quý khách trong Đơn đặt hàng và thời gian giao hàng do chúng tôi chỉ định tại thời điểm thanh toán đơn hàng của Quý khách (như được cập nhật trong Xác nhận đơn hàng).
    </p>

<p>
4.2 Chúng tôi sẽ thông báo cho Quý khách nếu chúng tôi ​​không thể đáp ứng được ngày giao hàng dự kiến trong phạm vi pháp luật cho phép. Chúng tôi sẽ không chịu trách nhiệm với Quý khách về bất kỳ tổn thất, trách nhiệm, chi phí, thiệt hại, các khoản phí hoặc chi phí phát sinh từ giao hàng trễ.
</p>

<p>
4.3 Khi giao sản phẩm, Quý khách có thể được yêu cầu ký nhận. Quý khách có thể liên hệ ecom@sports.com.vn hoặc gọi cho chúng tôi theo số: 1900 63 64 01 trong trường hợp có bất kỳ lỗi, khuyết tật hoặc hư hỏng nào. Quý khách có thể cung cấp các tài liệu được giao cùng với Sản phẩm, theo yêu cầu.
</p>

<p>
4.4 Tất cả rủi ro trong quá trình vận chuyển Sản phẩm khi giao hàng, ngoại trừ trường hợp việc giao hàng bị trì hoãn do Quý khách vi phạm các Điều khoản và điều kiện. Kể từ thời điểm vi phạm, chúng tôi sẽ không chịu trách nhiệm về việc mất mát hoặc hư hỏng Sản phẩm. Bất kỳ vi phạm nào của Quý khách, có thể ảnh hưởng đến khả năng mua sắm của Quý khách trên <Link className={cx('link-to-home')} to='/home'><strong>www.sports.com.vn</strong></Link> trong tương lai.
</p>

    </div>

    </div>

    <div  className={cx('wrapper_5')}>
      
      <p><strong>5. CHÍNH SÁCH HOÀN TRẢ</strong></p>

      <div>
      <p >Nếu Quý khách không hoàn toàn hài lòng với dịch vụ do chúng tôi cung cấp, Quý khách có thể trả lại sản phẩm cho chúng tôi trong vòng <strong>mười lăm (15) ngày</strong> kể từ ngày nhận hàng. Với điều kiện Sản phẩm chưa qua sử dụng, các tags Sản phẩm còn nguyên, không mất hoặc làm giả và sản phẩm phải ở trong bao bì của nhãn hiệu gốc (nếu có). Chính sách này chỉ áp dụng cho những sản phẩm không thuộc danh sách các thương hiệu / mặt hàng không được hoàn tiền được cung cấp trên Trang web của chúng tôi. Chi tiết xem <Link onClick={() => window.scroll(0,0)}   to='/exchangeReturn'><strong className={cx('link-to-exchange-return')} ><i><u>tại đây</u></i></strong></Link>.</p>
      <p>  5.2 Quý khách phải đảm bảo rằng sản phẩm được gửi cho chúng tôi trong tình trạng giống như khi Quý khách nhận và được đóng gói đúng cách. Trong trường hợp một mặt hàng được trả lại cho chúng tôi trong tình trạng không phù hợp, chúng tôi có quyền không chấp nhận trả lại và gửi Sản phẩm lại cho Quý khách. </p>

      <p> 5.3 Trong một số trường hợp, chính sách thanh toán/hủy bỏ và đổi trả đối với một số sản phẩm có thể khác với các điều khoản và điều kiện tiêu chuẩn được nêu ở đây. Trong những trường hợp như vậy, chúng tôi sẽ công bố các điều kiện đặc biệt trong phần chi tiết sản phẩm.</p>
      </div>

    </div>

    <div  className={cx('wrapper_6')}>
      
      <p><strong>6. YÊU CẦU XUẤT HÓA ĐƠN</strong></p>
      <p className={cx('padding-left-30px')}>Khi có nhu cầu xuất hóa đơn, Quý khách vui lòng cung cấp thông tin vào phần ghi chú tại trang giỏ hàng hoặc liên hệ trực tiếp bộ phận chăm sóc khách hàng để được hỗ trợ tư vấn bằng cách live chat trên website/ gửi mail về địa chỉ:<a href="mailto:lexuanlo2501@gmail.com?subject='Phản hồi từ khách hàng'&body='...'"><strong> ecom@sports.com.vn</strong></a> hoặc gọi theo số: <strong>1900 63 64 01</strong></p>

    </div>
  
      </div> 
      );
}

export default Condition_Clause;