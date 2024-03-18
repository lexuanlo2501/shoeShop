import classNames from "classnames/bind";
import style from "./home.module.scss";
import SliderHome from "../../components/SliderHome";
import Carousel_v2 from "../../components/Carousel_v2";

const cx = classNames.bind(style)

function Home({}) {

    const brands = ['adidas','nike','converse', 'vans']

    const debounce = (fn, delay) => {
        delay = delay || 0
        let timerId
        // console.log("timerId immediate load:::", timerId)
        return () => {
            // closure
            // console.log("timerId previous at:::", timerId)
            if(timerId) {
                clearTimeout(timerId)
                timerId = null
            }
            timerId = setTimeout(() => {
                fn()
            }, delay)

        }
    }
    const clickOrder = () => console.log("order")
    const debouncedClickOrder = debounce(clickOrder, 2000);
    return ( 
        <div className={cx("wrapper")}>
            {/* <SliderHome/> */}
            {/* <div>
                <button onClick={debouncedClickOrder}>Test debounce</button>
            </div> */}

            
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
                <Carousel_v2 brand={"nike"} nameProd="jordan"/>
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
                        <Carousel_v2 brand={item}/>

                    </div>
                })
            }
            </div>

           
        </div> 
    );
}

export default Home;