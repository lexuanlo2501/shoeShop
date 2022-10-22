import classNames from "classnames/bind";
import styles from './SideBar.module.scss'

import axios from "axios";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles)

function SideBar() {
    const [type, setType] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/products')
        .then((res) => {
            setType(res.data)
        })
    }, [])

    return (
        <div className={cx('wrapper')}>
            <img className={cx("thumbnail")} src="https://wallpapercave.com/wp/wp5866497.jpg" alt=""/> 
            <div className={cx('menu')}>
                <ul className={cx("nav-bar")}>
                {
                    type.map((item, index) => 
                        <li key={index}><a href={`/productList/${item.id}/page1`}>{item.id}</a></li>
                    )
                }
                </ul>
            </div>
        </div>
    );
}

export default SideBar;