import classNames from "classnames/bind";
import styles from "./overView.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faCartShopping, faChartPie, faMoneyBill, faUser } from "@fortawesome/free-solid-svg-icons";
import Chart from 'react-apexcharts'
import { useEffect, useState } from "react";
import axios from "axios";
import { formatPrice } from "../../common";
import Modal from 'react-bootstrap/Modal';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ConfirmModal_v2 from "../../components/ConfirmModal_v2";

ChartJS.register(ArcElement, Tooltip, Legend);

const cx = classNames.bind(styles)


const year_option=(new Date()).getFullYear()
const selectYear = (begin, end) => {
    let arrYear = []
    for(let i = begin; i<=end; i++) {
        arrYear.push(i) 
    }
    return arrYear
}

function OverView() {

    const [dashboard, setDashboard] = useState({})

    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(0)

    const [show_modal, setShow_modal] = useState(false);

    const handleClose = () => setShow_modal(false);
    const handleShow = () => setShow_modal(true);
    

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+"/dashboard?_year="+year)
        .then(res => setDashboard(res.data))
    }, [year])

    const data_revenue = {
        options: {
        //   chart: {
        //     id: 'apexchart-example'
        //   },
            xaxis: {
                categories: dashboard?.revenue_month?.map(i => "Tháng " + i.month)
            },
            
            chart: {
                id: 'apexchart-example',

                events: {
                    dataPointSelection: (event, chartContext, config) => {
                        let dataPointIndex = config.w.config.xaxis.categories[config.dataPointIndex]
                        setMonth(dataPointIndex.split(" ")[1])
                        console.log(dataPointIndex.split(" ")[1])
                        handleShow()
                    }
                }
            }
        },
        series: [{
            name: 'series-1',
                data: dashboard?.revenue_month?.map(i => formatPrice(i.amount) )
            }
    
        ],
    }


      const data_brand = {
        labels: dashboard?.order_brand_pay?.map( i => i.brand_id),
        datasets: [
          {
            label: '# of Votes',
            data : dashboard?.order_brand_pay?.map( i => i.total),
            
            backgroundColor: [
                `rgb(253, 227, 211)`,
                `rgb(249, 231, 243)`,
                `rgb(208, 199, 250)`,
                `rgb(211, 250, 250)`,
                `rgb(206, 235, 201)`,
                `rgb(231, 209, 242)`,
            ],
           
            
            borderWidth: 3,
          },
        ],
      };

    

    return (
        <div className={cx('wrapper')}>
            <div className={cx("heading_dashboard")}>
                <h1>dashboard 
                    <select defaultValue={year} onClick={(e) => setYear(e.target.value)}>
                    {
                        selectYear(2020, year_option).map((i) => <option key={i} value={i}>{i}</option>)
                    }
                    </select>
                </h1>

                
            </div>

            <div className={cx('overView')}>
                <div className={cx(['item_sumary','color1'])}>
                    <div className={cx('item_header')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faMoneyBill}/>
                        <span>doanh thu</span>
                    </div>
                    <div>
                        {formatPrice(dashboard?.revenue_month?.reduce((accumulator, currentValue) => accumulator+currentValue.amount, 0))}
                    </div>
                </div>

                <div className={cx(['item_sumary','color2'])}>
                    <div className={cx('item_header')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faChartPie}/>
                        <span>chi phí</span>
                    </div>
                    <div>
                        70.000.000đ
                    </div>
                </div>

                <div className={cx(['item_sumary','color3'])}>
                    <div className={cx('item_header')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faUser}/>
                        <span>người dùng</span>
                    </div>
                    <div>{dashboard?.number_accounts}</div>
                </div>

                <div className={cx(['item_sumary','color4'])}>
                    <div className={cx('item_header')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCartShopping}/>
                        <span>đơn hàng</span>
                    </div>
                    <div>{dashboard.number_of_orders}</div>
                </div>
            </div>

          
            <Chart options={data_revenue.options} series={data_revenue.series} type="bar"  height={420} />
            <p>#Lưu ý: Đơn vị triệu VNĐ</p>
            <Chart_day show_modal={show_modal} handleClose={handleClose} month={month} year={year}/>


            <div className={cx("top_prod_brand")}>
                <div className={cx("doughnut")}>
                    <h3 className={cx("title_content")}>Thương hiệu được mua</h3>
                    <Doughnut data={data_brand}/>
                
                    {/* <div className={cx(["test_dono", "color_d_1"])}></div>
                    <div className={cx(["test_dono", "color_d_2"])}></div>
                    <div className={cx(["test_dono", "color_d_3"])}></div>
                    <div className={cx(["test_dono", "color_d_4"])}></div>
                    <div className={cx(["test_dono", "color_d_5"])}></div>
                    <div className={cx(["test_dono", "color_d_6"])}></div> */}


                </div>

                {/* <div className={cx("hot_products")}>
                    <h3 className={cx("title_content")}>Sản phẩm bán chạy</h3>
                {
                    dashboard?.hot_product?.map(prod => (
                        <div className={cx("prod")}>
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/imgs/${prod.img}`}/>
                            <div className={cx("prod_infor")}>
                                <p>Mã sản phẩm: {prod.id}</p>
                                <p>{prod.name}</p>
                                <p>{formatPrice(prod.price)}</p>
                                <p>Đã bán: {prod.total}</p>
                            </div>
                        </div>
                    ))
                }
                </div> */}

            </div>

            <div className={cx("wrapper_hot_products")}>
                <h1 style={{'color': '#686868', 'marginBottom':"10px"}}>SẢN PHẨM BÁN CHẠY</h1>
            {
                dashboard?.hotProductCategory?.map(i => (
                    <div className={cx("hot_products_category")}>
                        <h2>{i.categoryName}</h2>
                    {
                        i?.products?.map(prod => (
                            <div className={cx("prod")}>
                                <img src={`${process.env.REACT_APP_BACKEND_URL}/imgs/${prod.img}`}/>
                                <div className={cx("prod_infor")}>
                                    <p>Mã SP: {prod.id}</p>
                                    <p>{prod.name}</p>
                                    <p>{formatPrice(prod.price)}</p>
                                    <p>Đã bán: {prod.total}</p>
                                </div>
                            </div>
                        ))
                    } 
                    {
                        i?.products?.length === 0 && <p style={{'textAlign': 'center'}}>Chưa có sản phẩm được bán</p>
                    } 
                    </div>
                ))
            }
           
            </div>

        </div>
    );
}


const Chart_day = ({month, year, show_modal, handleClose}) => {
    const [revenue_day, setRevenue_day] = useState([])

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL+`/revenue_day?_month=${month}&_year=${year}`)
        .then(res => setRevenue_day(res.data))
    }, [month])

    const data_revenue = {
        options: {
            xaxis: {
                categories: revenue_day?.map(i => "Ngày " + i.day)
            },
            
            chart: {
                id: 'apexchart-example',
            }
        },
        series: [{
            name: 'series-1',
                data: revenue_day?.map(i => formatPrice(i.amount))
            }
    
        ],
    }

    return (
        <Modal show={show_modal} onHide={handleClose} animation={false} fullscreen={true}>
            <Modal.Header closeButton>
                <Modal.Title><h1>Tháng {month} Năm {year}</h1></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Chart options={data_revenue.options} series={data_revenue.series} type="bar"  height={520} />

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default OverView;