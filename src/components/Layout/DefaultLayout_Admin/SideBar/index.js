import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './sideBar.module.scss'

const cx = classNames.bind(styles)



function SideBar() {
    const [quantityNotify,setQuantityNotify] = useState('')

    useEffect(()=> {
        axios.get('http://localhost:4000/orders')
        .then(res => {
            let quantity_NC = res.data.filter(i => i.status === false).length
            setQuantityNotify(quantity_NC)
        })


    }, [])

    return ( 
        <div className={cx('wrapper')}>
            <ul>
                <li><Link to='/admin/addProducts' href="">thêm sản phẩm</Link></li>
                <li><Link to='/admin/modifyProducts'>chỉnh sửa và xóa sản phẩm</Link></li>
                <li><Link to='/admin/comfirming'>đơn hàng chờ xác nhận</Link><Notify>{quantityNotify}</Notify></li>
                <li><a href="">đơn hàng đã hũy</a></li>
                <li><a href="">doanh thu</a></li>
                <li><a href="">tài khoản người dùng</a></li>
            </ul>
        </div>
     );
}


function Notify({children}) {
    return <span className={cx('quantity_notify')}>{children}</span>
}

export default SideBar;