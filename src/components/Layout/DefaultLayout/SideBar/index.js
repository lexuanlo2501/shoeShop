import classNames from "classnames/bind";
import styles from './SideBar.module.scss'
import './sliderPrice.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import {limit} from "../../../../common"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSliders, faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function SideBar({setRe_render}) {
    const [brands, setBrands] = useState([])
    const [types, setTypes] = useState([])

    const [price, setprice] = useState([0, 30000000])
    const [type, setType] = useState('')
    const [isBars, setIsBars] = useState(false)

    let currentUrl = window.location.href;
    let param = currentUrl.split("?")[1]

    let paramToObject = param && JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
    let paramCategory = paramToObject?._category ? `&_category=${paramToObject?._category}` : ""
    let paramC2C = paramToObject?._C2C  ? `&_C2C=${paramToObject?._C2C}` : ""

    useEffect(() => {
        try {
            axios.get(process.env.REACT_APP_BACKEND_URL+'/brands')
            .then((res) => {
                setBrands(res.data)
            })
            axios.get(process.env.REACT_APP_BACKEND_URL+"/types")
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
            <FontAwesomeIcon icon={isBars ? faXmark : faSliders} className={cx("showBar_btn")}
                onClick={() => setIsBars(pre => !pre)}
            />
            {/* <img className={cx(["thumbnail",isBars?"":"off"])} src="https://wallpapercave.com/wp/wp5866497.jpg" alt=""/>  */}
            <div className={cx(['menu',isBars ? "showBar":"offBar"])}>
                <ul className={cx("nav-bar")}>
                    <li>hãng</li>
                    <li
                        className={cx('select_type-Brand')}
                        onClick={() => {
                            window.scrollTo(0, 0)
                            setRe_render(pre => !pre)

                        }}
                    >
                        <Link to={ paramToObject?._category ? `/shoes?_page=1&_limit=${limit}&_category=${paramToObject?._category}${paramC2C}` : `/shoes?_page=1&_limit=${limit}${paramC2C}`} >tất cả</Link>
                    </li>
                {
                    brands.map((item, index) => 
                        <li key={item.brand_id}
                            className={cx('select_type-Brand')}
                            onClick={() => {
                                setRe_render(pre => !pre)
                                window.scrollTo(0, 0)
                            }}
                        >
                            <Link to={ paramToObject?._category ? `/shoes?_page=1&_limit=${limit}&_brand=${item.brand_id}&_category=${paramToObject?._category}${paramC2C}` : `/shoes?_page=1&_limit=${limit}&_brand=${item.brand_id}${paramC2C}`}>
                                {item.brand_id}
                            </Link>
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
                    types.map(type => ( paramToObject?._category == type?.category_id &&
                         (<li className={cx('select_type-Brand')} key={type.id}>
                         <input id={"t"+type.id} name="type_prod" value={type.id} type="radio"
                             onChange={e=> {
                                setType(`&_type=${e.target.value}`)
                                console.log(`&_type=${e.target.value}`)
                            }}
                         /> <label htmlFor={"t"+type.id}>{type.type_name}</label>
                     </li>)
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
                        <Link className={cx('filter_price_btn')}
                            onClick={() => setRe_render(pre => !pre)}
                            to={ 
                                paramToObject?._brand ? 
                                `/shoes?_page=1&_limit=${limit}&_min=${price[0]}&_max=${price[1]}${type}${paramCategory}&_brand=${paramToObject._brand}${paramC2C}`
                                :
                                `/shoes?_page=1&_limit=${limit}&_min=${price[0]}&_max=${price[1]}${type}${paramCategory}${paramC2C}`
                            }
                        >Lọc</Link>
                    </li>
                    
                </ul>


            </div>

           
        </div>
    );
}

export default SideBar;