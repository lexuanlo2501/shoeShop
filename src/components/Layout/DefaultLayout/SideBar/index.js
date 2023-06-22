import classNames from "classnames/bind";
import styles from './SideBar.module.scss'

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function SideBar({setBrand_v2}) {
    const [type, setType] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/products')
        .then((res) => {
            setType(res.data)
        })
    }, [])

    const handleClickScroll = () => {
        const element = document.getElementById('scrollTo');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={cx('wrapper')}>
            <img className={cx("thumbnail")} src="https://wallpapercave.com/wp/wp5866497.jpg" alt=""/> 
            <div className={cx('menu')}>
                <ul className={cx("nav-bar")}>
                    <li
                        onClick={handleClickScroll}
                    ><Link to='/productList/page1'>tất cả</Link></li>
                {
                    type.map((item, index) => 
                        <li key={index}
                            onClick={() => {
                                setBrand_v2(item.id)
                                handleClickScroll()
                            }}
                        ><Link to={`/productList/${item.id}/page1`}>{item.id}</Link></li>
                        // <li key={index}><a href={`/productList/${item.id}/page1`}>{item.id}</a></li>

                    )
                }
                    <li>
                        <p>giá</p>
                        <input type="range" id="vol" name="vol" min="0" max="50"/>
                       
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;