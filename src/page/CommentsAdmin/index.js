import classNames from "classnames/bind";
import styles from './commentsAdmin.module.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faTrashCan, faUnlock } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal_v2 from "../../components/ConfirmModal_v2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function CommentsAdmin() {

    const [cmts, setCmts] = useState([])
    const [trigger, setTrigger] = useState(false)
    const [numberOfPage, setNumberOfPage] = useState([])

    const userInfor = JSON.parse(localStorage.getItem("tokens"))
    
    let currentUrl = window.location.href;
    let param = currentUrl?.split("?")[1]
    let paramToObject = param && JSON.parse('{"' + decodeURI(param?.replace(/&/g, "\",\"")?.replace(/=/g,"\":\"")) + '"}') || {}
    const limit = paramToObject._limit
       
    const arrPage = (n) => {
        let arr = Array(Math.ceil(n/limit)).fill(0).map((_, index) => index+1)
        return arr
    }

    useEffect(() => {
        const controller = new AbortController()
      
        let api = process.env.REACT_APP_BACKEND_URL+'/comments'
        api += paramToObject._sellerID ? `?_sellerID=${userInfor.accName}&_showLock=true` : "?_showLock=true&"
        api += param

        axios.get(api, {signal:controller.signal})
        .then(res => {
            setCmts(res.data)

            const xTotalCount = res.headers['x-total-count']
            setNumberOfPage(arrPage(xTotalCount))
        })
        
        return () => controller.abort()
    }, [trigger])

    const handleDeleteCmt = (cmtID) => {

        axios.delete(process.env.REACT_APP_BACKEND_URL+'/comments/'+cmtID)
        .then(res => {
            if(res.status) {
                toast.success("Xóa Bình Luận Thành Công", {
                    hideProgressBar: true,
                    theme: "dark",
                    position: "top-center",
                    autoClose: 1000,
        
                })

                setTrigger(pre => !pre)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleLockCmt = (cmtID) => {
        const currentStatusCmt = (cmts.find(i => i.comment_id === cmtID)).isLock
        axios.patch(process.env.REACT_APP_BACKEND_URL+'/comments/'+cmtID,{isLock:currentStatusCmt ? 0 : 1})
        .then(res => {
            if(res.status) {
                setTrigger(pre => !pre)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className={cx("wrapper")}>
            <h1>Quản lý bình luận</h1>
            <div className={cx("table_cmts")}>
                <table className="table table-hover">
                    <thead>
                        <tr className="table-info">
                            <th scope="col">Tài Khoản</th>
                            <th scope="col">Tên</th>
                            <th scope="col">thời gian</th>
                            <th scope="col">Mã SP</th>
                            <th scope="col">Bình luận</th>
                            <th scope="col">Khóa</th>
                        {
                            userInfor.role === "admin" && <th scope="col">Xóa</th>
                        }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        cmts?.map((item, index) => (
                            <tr key={item.comment_id}>
                                <td>{item.accName}</td>
                                <td>{item.fullName}</td>
                                <td>{item.date}</td>
                                <td>{item.product_id}</td>
                                <td>{item.value}</td>
                                <td>
                                {
                                    <button className={cx(['status_btn',{"lock":item.isLock===0, "unlock":item.isLock===1}])}
                                        onClick={() => handleLockCmt(item.comment_id)}
                                    >
                                        <FontAwesomeIcon icon={item.isLock? faUnlock : faLock}/>
                                        <span>{item.isLock? "Mở" : "Khóa"}</span>
                                    </button>
                                }
                                </td>
                            {
                                userInfor.role === "admin" && 
                                <ConfirmModal_v2
                                    title={`Xóa Bình Luận  -  ID: ${item.id}`}
                                    body={`Bạn có muốn xóa bình luận này`}
                                    accept={() => {handleDeleteCmt(item.comment_id)}}
                                >
                                    <td className={cx("btn_del_cmt")}>
                                        <FontAwesomeIcon className={cx('icon_del_cmt')} icon={faTrashCan}/>
                                    </td>
                                </ConfirmModal_v2>
                            }
                            </tr>
                        ))
                    }
                        
                    </tbody>
                </table>
            </div>
            <div className={cx('pagination')}>
                <div className={cx('pagination_container')}>
            {
                numberOfPage.map((item, index) => 
                {
                    let active = +paramToObject?._page  === item ? 'active' : ''
                    return (
                        <Link 
                            key={index} 
                            onClick={ () => { 
                                setTrigger(pre => !pre)
                            }}
                            className={cx(['page_number', active])}
                            // to={`/shoes?${param?.replace(`page=${paramToObject._page}`,`page=${item}`)}`} 
                            to={`/admin/comments?${param?.replace(`page=${paramToObject._page}`,`page=${item}`)}`} 
                            
                        >
                            {item}
                        </Link>
                    )
                })
            }
                </div>
            </div>

        </div>
    );
}

export default CommentsAdmin;