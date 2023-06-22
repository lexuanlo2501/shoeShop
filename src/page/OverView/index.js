import classNames from "classnames/bind";
import styles from "./overView.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faCartShopping, faChartPie, faUser } from "@fortawesome/free-solid-svg-icons";
import Chart from 'react-apexcharts'

const cx = classNames.bind(styles)


function OverView() {

    const data = {
        options: {
          chart: {
            id: 'apexchart-example'
          },
          xaxis: {
            categories: ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5',
             'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12']
          },
        //   responsive: [{
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: 350
        //       },
        //       legend: {
        //         position: 'bottom'
        //       }
        //     }
        //   }],
        },
        series: [{
          name: 'series-1',
        //   data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 56, 23, 81],
          data: [30, 40, 35, 50, 49]

        }],
      }

     const brandChart = {
        series: [30, 25, 43, 5, 3],
        labels: ["Apple", "Mango", "Banana", "Papaya", "Orange"],
        options: {
          
          stroke: {
            colors: ['#fff']
          },
          fill: {
            opacity: 0.8
          },
        //   responsive: [{
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: 200
        //       },
        //       legend: {
        //         position: 'bottom'
        //       }
        //     }
        //   }],
         
        },
      
      
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overView')}>
                <div className={cx(['item_sumary','color1'])}>
                    <div className={cx('item_header')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faBasketShopping}/>
                        <span>doanh thu</span>
                    </div>
                    <div>
                        123.000.000đ
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
                    <div>
                        25
                    </div>
                </div>

                <div className={cx(['item_sumary','color4'])}>
                    <div className={cx('item_header')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCartShopping}/>
                        <span>đơn hàng</span>
                    </div>
                    <div>
                        12
                    </div>
                </div>
            </div>

            <h3>Doanh thu trong năm 2023</h3>
            <Chart options={data.options} series={data.series} type="bar"  height={320} />

            <h3>Thương hiệu được mua</h3>
            <Chart options={brandChart.options} series={brandChart.series} type="donut"/>


        </div>
    );
}

export default OverView;