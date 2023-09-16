import classNames from "classnames/bind";
import styles from './SideBar.module.scss'
import './sliderPrice.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import {limit} from "../../../../common"

const cx = classNames.bind(styles)

function SideBar({setBrand_v2}) {
    const [brands, setBrands] = useState([])
    const [types, setTypes] = useState([])

    const [price, setprice] = useState([0, 30000000])
    const [brand, setBrand] = useState("")
    const [type, setType] = useState('')

    let currentUrl = window.location.href;
    let param = currentUrl.split("?")[1]
    let paramToObject = JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')


    useEffect(() => {
        // axios.get('http://localhost:4000/products')
        try {
            axios.get('http://localhost:5000/brands')
            .then((res) => {
                setBrands(res.data)
            })
            axios.get("http://localhost:5000/types")
            .then(res => {
                setTypes(res.data)
            })

        } catch (error) {
            console.log(error)
        }
      
    }, [])

    const handleClickScroll = () => {
        const element = document.getElementById('scrollTo');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={cx('wrapper')}>
            {/* <img className={cx("thumbnail")} src="https://wallpapercave.com/wp/wp5866497.jpg" alt=""/>  */}
            <div className={cx('menu')}>
                <ul className={cx("nav-bar")}>
                    <li>hãng</li>
                    <li
                        className={cx('select_type-Brand')}
                        onClick={() => {
                            handleClickScroll(
                            setBrand_v2("")

                        )}}
                    >
                        <Link to={`/shoes?_page=1&_limit=${limit}`} >tất cả</Link>
                    </li>
                {
                    brands.map((item, index) => 
                        <li key={item.brand_id}
                            className={cx('select_type-Brand')}
                            onClick={() => {
                                setBrand_v2(item.brand_id)
                                handleClickScroll()
                            }}
                        >
                            <Link to={`/shoes?_page=1&_limit=${limit}&_brand=${item.brand_id}`}>{item.brand_id}</Link>
                        </li>
                    )
                }
                    
                </ul>

                <ul className={cx("nav-bar")}>
                    <li>Loại</li>
                    <li className={cx('select_type-Brand')}>
                        <input id="t0" name="type_prod" value="" type="radio"
                            onChange={e=> setType("")}
                        /> <label htmlFor="t0">Tất cả</label>
                    </li>
                {
                    types.map(type => (
                        <li className={cx('select_type-Brand')} key={type.id}>
                            <input id={"t"+type.id} name="type_prod" value={type.id} type="radio"
                                onChange={e=> setType(`&_type=${e.target.value}`)}
                            /> <label htmlFor={"t"+type.id}>{type.type_name}</label>
                        </li>
                    ))
                }

                </ul>


                <ul className={cx("nav-bar")}>
                    <li>
                        <div>
                            <p className={cx('price_slice')}>Lọc Theo Giá:</p>
                            <span>{price[0].toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span> - <span>{price[1].toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                        </div>
                        <RangeSlider 
                            id="range-slider-yellow"
                            value={price} onInput={setprice}
                            min={0}
                            max={10000000}
                            step={10000}
                        />
                        <br/>
                        <button className={cx('filter_price_btn')} 
                            onClick={() => {
                                setBrand_v2(pre => pre+1)
                                console.log()
                            }}
                        >
                            <Link 
                                to={
                                    paramToObject._brand ? 
                                    `/shoes?_page=1&_limit=${limit}&_min=${price[0]}&_max=${price[1]}${type}&_brand=${paramToObject._brand}`
                                    :
                                    `/shoes?_page=1&_limit=${limit}&_min=${price[0]}&_max=${price[1]}${type}`
                                }
                            
                            >Lọc</Link>
                        
                            
                        </button>
                       

                  
                    
                    </li>
                    
                </ul>


            </div>

           
        </div>
    );
}

export default SideBar;