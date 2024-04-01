import classNames from "classnames/bind";
import styles from './SecurityPolicy.module.scss'
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function SecurityPolicy() {
  return (  <div className={cx('wrapper')}>
  <h1>Chính sách bảo mật</h1>
    <p>Cám ơn quý khách đã truy cập vào website Sports.com.vn được vận hành bởi Công ty TNHH Thương Mại Thời Trang Tổng Hợp. Chúng tôi tôn trọng và cam kết sẽ bảo mật những thông tin mang tính riêng tư của bạn. Xin vui lòng đọc bản Chính sách bảo mật dưới đây để hiểu hơn những cam kết mà chúng tôi thực hiện nhằm tôn trọng và bảo vệ quyền lợi của người truy cập.
</p>

<p><strong>1. Phạm vi thu thập thông tin cá nhân và mục đích sử dụng.</strong></p>

<p>- Để truy cập và sử dụng một số dịch vụ tại Sports.com.vn, Quý khách hàng có thể sẽ được yêu cầu đăng ký thông tin cá nhân (Email, Họ tên, Số ĐT liên lạc…). Mọi thông tin khai báo phải đảm bảo tính chính xác và hợp pháp. <strong>Sports.com.vn</strong> không chịu mọi trách nhiệm liên quan đến pháp luật của thông tin khai báo.</p>

<p> - Chúng tôi cũng có thể thu thập thông tin về số lần ghé thăm, bao gồm số trang Quý khách hàng xem, số links (liên kết) Quý khách hàng click và những thông tin khác liên quan đến việc kết nối đến website của <strong>Sports.com.vn</strong>. Chúng tôi cũng thu thập các thông tin mà trình duyệt Web (Browser) Quý khách hàng sử dụng mỗi khi truy cập vào <strong>Sports.com.vn</strong>, bao gồm: địa chỉ IP, loại Browser, ngôn ngữ sử dụng, thời gian và những địa chỉ mà Browser truy xuất đến.</p>

<p>- Chúng tôi sẽ dùng thông tin quý khách đã cung cấp để xử lý đơn đặt hàng, cung cấp các dịch vụ và thông tin yêu cầu thông qua website và theo yêu cầu của bạn. Hơn nữa, chúng tôi sẽ sử dụng các thông tin đó để quản lý tài khoản của bạn; xác minh và thực hiện giao dịch trực tuyến, kiểm toán việc tải dữ liệu từ web; cải thiện bố cục và nội dung trang web và điều chỉnh cho phù hợp với người dùng; nhận diện khách vào web, nghiên cứu nhân khẩu học, gửi thông tin bao gồm thông tin sản phẩm và dịch vụ, nếu bạn không có dấu hiệu từ chối. Nếu quý khách không muốn nhận bất cứ thông tin tiếp thị của chúng tôi thì có thể từ chối bất cứ lúc nào.</p>

<p>- Chúng tôi có thể chuyển tên và địa chỉ cho bên thứ ba để họ giao hàng cho bạn (ví dụ cho bên chuyển phát nhanh hoặc nhà cung cấp dịch vụ giao vận).</p>

<p>- Các khoản thanh toán trực tuyến sẽ được xử lý bởi các đối tác của chúng tôi (các cổng thanh toán trực tuyến đã được đăng ký với Nhà nước Việt Nam). Quý khách chỉ đưa cho chúng tôi hoặc đối tác hoặc website những thông tin chính xác, không gây nhầm lẫn và phải thông báo cho chúng tôi nếu có thay đổi.</p>

<p><strong>2. Thời gian lưu trữ thông tin</strong></p>

<p>Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được lưu trữ mãi mãi và bảo mật trên máy chủ của <strong>Sports.com.vn.</strong></p>


<p><strong>3. Chia sẻ thông tin khách hàng</strong></p>

<p><strong>Sports.com.vn</strong> cam kết sẽ không chia sẻ thông tin của khách hàng cho bất kỳ một công ty nào khác ngoại trừ những công ty và các bên thứ ba có liên quan trực tiếp đến việc giao hàng. Chúng tôi có thể tiết lộ hoặc cung cấp thông tin cá nhân của quý khách trong các trường hợp thật sự cần thiết như sau:</p>


<ul>
  <li>Khi có yêu cầu của các cơ quan pháp luật.</li>
  <li>Chia sẻ thông tin khách hàng với đối tác chạy quảng cáo như Google ví dụ như tiếp thị lại khách hàng dựa theo hành vi của khách hàng.</li>

  <li>Nghiên cứu thị trường và các báo cáo phân tích và tuyệt đối không chuyển cho bên thứ ba.</li>

</ul>

<p><strong>4.  Thông tin liên hệ </strong></p>

<ul>
     <li><strong>Đơn vị:</strong> Công ty TNHH Một Thành Viên Thương Mại Thời Trang Tổng Hợp</li>
     <li><strong>Văn phòng:</strong>163 Phan Đăng Lưu, Phường hòa Cường, Quận Hải Châu, TP Đà Nẵng</li>
     <li><strong>Hotline:</strong> 1900 63 64 01</li>
     <li><i>Email Bộ phận Chăm Sóc Khách Hàng (Offline + Online):</i> <Link className={cx('link-to-home')} to='/home'><strong><u>ce@sports.com.vn</u></strong></Link></li>

</ul>
    
    <p><strong>5. Cập nhật thông tin cá nhân</strong></p>
    <p>- Khách hàng có quyền tự kiểm tra, cập nhật, điều chỉnh thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa thông tin cá nhân.</p>
    <p>- Khách hàng có quyền gửi khiếu nại về việc lộ thông tin cá nhân cho bên thứ ba đến Ban quản trị của website <strong>Sports.com.vn</strong> theo thông tin liên hệ ở mục số 4. Khi tiếp nhận những phản hồi này, Supersports sẽ xác nhận lại thông tin và phải có trách nhiệm trả lời lý do và hướng dẫn khách hàng kiểm tra và bảo mật lại thông tin.</p>

    <p><strong>6. Cam kết bảo mật thông tin cá nhân Quý khách hàng</strong></p>

    <p>- Thông tin cá nhân của thành viên trên <strong>Sports.com.vn  </strong>được Sports cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của Sports. Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của Quý khách hàng đó trừ những trường hợp pháp luật có quy định khác.</p>

    <p>- Sports cam kết không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của thành viên khi không có sự cho phép đồng ý từ thành viên.</p>

    <p>- Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên, Supersports sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho thành viên được biết.</p>

    <p>- Đội ngũ Sports yêu cầu các cá nhân khi đăng ký/mua sản phẩm là thành viên, phải cung cấp đầy đủ thông tin cá nhân có liên quan như: Họ và tên, địa chỉ liên lạc, email, điện thoại, số tài khoản, …., và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban quản lý Supersports không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại. có liên quan đến quyền lợi của Thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.</p>
  </div> );
}

export default SecurityPolicy;

