import classNames from "classnames/bind";
import style from './purchaseOrder.module.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";
import { BeatLoader, MoonLoader } from "react-spinners";


const cx = classNames.bind(style)



function PurchaseOrder({userID}) {

    const [orders, setOrders] = useState([])
    const [rerender, setRerender] = useState(false)
    const [loading, setLoading] = useState(true)

    const pagName = ['tất cả','chờ xác nhận','đang giao','hoàn thành','đã hủy',]
    const [pagCurr, setPagCurr] = useState(0)
    
    let [deliAmount, setDeliAmount] = useState()

    useEffect(() => {
        let canceled = false

        const controller = new AbortController();

        const user = JSON.parse(localStorage.getItem("tokens"));
        axios.get("http://localhost:4000/orders",{signal: controller.signal})
        .then(res => {
            let orderUser = []
            if(!canceled) {
                
                if(userID) {
                    // nếu có userID thì lọc data order của userID
                    // tận dụng code cũ để tìm ra bất cứ đơn hàng của user nào
                    user._id = userID
                }

                setLoading(false)
                if(pagCurr === 0) {
                    orderUser = res.data.filter(i => i.id_client === user._id)
                }
                else if(pagCurr === 1) {
                    orderUser = res.data.filter(i => i.id_client === user._id)
                    orderUser = orderUser.filter(i => i.status === 1)
                }
                else if(pagCurr === 2) {
                    orderUser = res.data.filter(i => i.id_client === user._id)
                    orderUser = orderUser.filter(i => i.status === 2)
    
                }
                else if(pagCurr === 3) {
                    orderUser = res.data.filter(i => i.id_client === user._id)
                    orderUser = orderUser.filter(i => i.status === 3)
                }
                else if(pagCurr === 4) {
                    orderUser = res.data.filter(i => i.id_client === user._id)
                    orderUser = orderUser.filter(i => i.status === 4)
                }
                setOrders(orderUser.reverse())
    
                console.log(orderUser)
                setDeliAmount(res.data.filter(i => i.status===2 && i.id_client === user._id).length)
            }

            // RULE
            // 0: all
            // 1: pending
            // 2: delivering
            // 3: complicate
            // 4: cancel

        })

        return () => {
            canceled = true
            controller.abort()
        }


    }, [pagCurr, rerender])

    

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('navigate')} >
            {
                pagName.map((item,index) => <li className={ cx({"li_active":index ===pagCurr}) }
                    onClick={() => {
                        setPagCurr(index)
                    }}

                >
                    {item} {index === 2 && <span>({deliAmount})</span>}
                </li>)
            }
            </ul>

            <div>
            {
                loading ? 
                <MoonLoader
                    color="rgba(118, 120, 120, 1)"
                    cssOverride={{
                        margin: '0 auto'
                    }}
                    size={80}
                    /> :
                <Orders orders={orders} setRerender={setRerender} userID={userID}/>
            }
            </div>

        </div>
    );
}

function Orders({orders, setRerender, userID}) {
    const navigate = useNavigate();


    const cancleOrder = (id) => {
        let dataPatch = {status: 4}
        axios.patch(`http://localhost:4000/orders/${id}`,dataPatch)
        
        console.log(id)
    }

    const undoOrder = (id) => {
        let undoData = orders.find(i => i.id === id).products
        undoData = undoData.map(i => {
            let {product, ...res} = i
            return res
        })
        console.log(undoData)
        localStorage.setItem('cart', JSON.stringify(undoData))
        navigate("/order")

        
    }

    const expectedDate = (d) => {
        const splitD = d.split("/")
        const dv = new Date(`${splitD[2]}-${splitD[1]}-${splitD[0]}`)


        let expecDay = new Date(dv);
        expecDay.setDate(dv.getDate() + 3);

        expecDay=expecDay.toLocaleDateString().split('/')

        return `${expecDay[1]}/${expecDay[0]}/${expecDay[2]}`

    }

    return (
        <div className={cx('bill')}>
        {
            orders.map((item, index) => {

                return (
                    <div key={item.id} className={cx('order')}>
                        <div className={cx('header_bill')}>
                            <p className="font-weight-bold"
                                onClick= {() => {
                                    expectedDate(item.date_order)
                                }}
                            >
                                {item.date_order }  
                                {item.status === 2 && '   |   Ngày dự kiến giao hàng: ' + expectedDate(item.date_order)}
                            </p>
                        {
                            item.status === 1 && <p className={cx('mess_status')}><span className={cx('status1')}>Đang chuẩn bị hàng</span> | <span className={cx('status2')}>Chờ xác nhận</span></p>
                        }
                        {
                            item.status === 4 && <p className={cx('mess_status')}><span className={cx('status2')}>Đã hủy</span></p>
                        }   
                        {
                            item.status === 3 && <p className={cx('mess_status')}><span className={cx('status1')}>Đơn hàng đã được giao thành công</span> | <span className={cx('status2')}>Hoàn thành</span></p>
                        }
                        {
                            item.status === 2 && <p className={cx('mess_status')}><span className={cx('status1')}>Đang vận chuyển</span></p>
                        }
                        {/* // 1: pending
                        // 2: delivering
                        // 3: complicate
                        // 4: cancel */}

                        </div>
                        <div className={cx('body_bill')}>
                        {
                            item.products.map((item2) => <CardOrder data={item2}/>)
                        }
                        </div>
                    
                        <div className={cx('footer_bill')}>
                        {
                            !userID && (
                            item.status === 1 ? 
                            // <button className={cx('button-74')}
                            //     onClick={() => cancleOrder(item.id)}
                            // >Hủy Đơn</button>
                            <ConfirmModal btnText='Hủy Đơn' className='button-74'
                                title='Bạn có muốn hủy đơn hàng này'
                                body='Bấm xác nhận để hủy đơn'
                                accept={() => {
                                    cancleOrder(item.id)
                                    setRerender(pre => !pre) 
                                }}
                            />
                            :
                            <button className={cx('button-74')}
                                onClick={() => undoOrder(item.id)}
                            >Mua Lại</button>
                            )
                        }
                            {/* <ConfirmModal btnText='Hủy Đơn' className='button-74'
                                title='Bạn có muốn hủy đơn hàng này'
                                body='Bấm xác nhận để hủy đơn'

                            /> */}

                            <h3 className={cx('total')}>Thành Tiền: <span>{item.amount} đ</span> </h3>
                            
                        </div>
                    </div>
                )
            })
        }

        {
            orders.length === 0 && 
            <div className={cx('empty_order')}>
                <h2>Không có đơn hàng nào</h2>
                <h1>¯\_( ͡❛ ͜ʖ ͡❛)_/¯</h1>
            </div>
        }

        </div>
    )
}



function CardOrder({data}) {
    return (
        <div className={cx('card_order')}>
            <div className={cx('infor_product')}>
                <img src={require(`../../imgData/${data.product.img}`)} alt=""/>
                <div className={cx('infor_detail')}>
                    <p>{data.product.name}</p>
                    <div className={cx('size_price')}>
                        <p><span className={cx('size')}>size: {data.size}</span> x {data.quantity}</p>
                        <p >{data.product.price} đ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseOrder;