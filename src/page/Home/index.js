import classNames from "classnames/bind";
import style from "./home.module.scss";
import SliderHome from "../../components/SliderHome";
import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../../components/Carousel";

const cx = classNames.bind(style)

function Home({}) {
    const [shoes, setShoes] = useState([])

    const brands = ['adidas','nike','converse', 'vans']


    useEffect(() => {
        axios.get("http://localhost:4000/data")
        .then(res => setShoes(res.data))
    }, [])

    return ( 
        <div className={cx("wrapper")}>
            <SliderHome/>
            <div className={cx('brand')}>
                <img src={require("./logoBrand/Sneaker-Brand-Logos-2.png")}/>
                <img src={require("./logoBrand/Sneaker-Brand-Logos-4.png")}/>
                <img src={require("./logoBrand/Sneaker-Brand-Logos-5.png")}/>
                <img src={require("./logoBrand/Sneaker-Brand-Logos-6.png")}/>
                <img src={require("./logoBrand/Sneaker-Brand-Logos-7.png")}/>
            </div>

            <div>
                <h1>AIR JORDAN/NIKE COLLECTION</h1>
                <img className={cx('img_nikeBrand')} src={require("./news_img/news1.webp")}/>
                <Carousel brand={"nike"}/>
                <img className={cx('img_nikeBrand')} src={require("./news_img/news2.webp")}/>
            </div>


            <div className={cx('display')}>
                {
                    brands.map((item) => {
                        return <div className={cx('list')} key={item}>
                            <div className={cx('brand_box')}>
                                <img src={require(`../../imgData/box/${item}.png`)} alt="box"/>
                                <h2>{item}</h2>
                            </div>
                            <Carousel brand={item}/>

                        </div>
                    })
                }
            </div>

           
        </div> 
    );
}

export default Home;