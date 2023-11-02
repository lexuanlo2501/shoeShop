import classNames from "classnames/bind";
import style  from "./searchIem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { limit } from "../../common";
import { BeatLoader } from 'react-spinners';
import { useRef } from "react";



const cx = classNames.bind(style)

function SearchItem({setTrigger}) {
    const [products, setProducts] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)

    useEffect(() => {
        const delay = 1000;
        let timeoutId;
        setLoading(true)

        const debounceFetchData = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                axios.get(process.env.REACT_APP_BACKEND_URL+`/shoes?_string=${input}`)
                .then(res => {
                    setProducts(res.data)
                    setLoading(false)
                })
            }, delay);
        };
      
        debounceFetchData();

        return () => {
            clearTimeout(timeoutId);
        };

        
    }, [input])


    // let currentUrl = window.location.href;
    // let param = currentUrl.split("?")[1]
    // let paramToObject = JSON.parse('{"' + decodeURI(param.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')


    const parentRef = useRef(null);
    const childRef = useRef(null);
  
    const handleBlur = () => {
    //   console.log('Focus ra');
      setShowResult(false)
    };
  
    const handleClick = () => {
    //   console.log('Click vào');
      setShowResult(true)
    };
  
    useEffect(() => {
        const parentElement = parentRef.current;

    // event capturing
        const handleCapture = (event) => {
            if (!parentElement.contains(event.target)) {
            handleBlur();
            }
        };
  
        parentElement.addEventListener('click', handleClick, true);
        window.addEventListener('click', handleCapture, true);
    
        return () => {
            parentElement.removeEventListener('click', handleClick, true);
            window.removeEventListener('click', handleCapture, true);
        };
    }, []);


    return ( 
        <div className={cx('wrapper')}
            ref={parentRef}

            // CÁCH CŨ
            // MÔ TẢ LỖI: click vào kết quả tìm kiếm bị sự kiện onblur
            // ĐÃ FIX bằng js thuần trong useEffect trên
            // khi click vào thẻ con có position absolute vẫn tính là sự kiện onblur 
            // (vì thẻ con absolute nó thuộc phạm vi riêng biệt chứ ko nằm trong thẻ cha)
            // onBlur={() => {
            //     setShowResult(false)
            //     console.log("blur")
            //     setClickResult(false)
            // }}
            // onFocus={() => {
            //     setShowResult(true)
            //     console.log("focus")
            // }}

           

        >
            <input placeholder="Tìm kiếm"
                onChange={e => setInput(e.target.value)}
            />

            
            <Link to={input ?`/shoes?_page=1&_limit=${limit}&_string=${input}`:`/shoes?_page=1&_limit=${limit}`}
                onClick={() => setTrigger(pre => !pre)}
            >
                <FontAwesomeIcon className={cx('search_icon')} icon={faSearch}/>
            </Link>


        {
            input && showResult && 
            <div className={cx('result')} ref={childRef}>
            {
                loading ?
                <div>
                    <BeatLoader color="#1c1e1d"  width={50} />
                </div>
                :
                products.length ? <FilterDataSearch products={products} input={input} /> : <div>Không có sản phẩm nào</div>
                

            }
            </div>
        }
            
        </div>
           
    );
}

function FilterDataSearch({products}) {
    return (
        <div>
        {
            products?.map(i => <Item key={i.id}  data={i}/>)
        }
        </div>
    )
}

function Item({data}) {
    return (
        <Link 
            to={`/shoes/detail_product?_id=${data.id}`}
            // to={`/detail_product_${data.id}`} 
            className={cx("link_item")}
        >
            <div className={cx('wrapper_item')}>
                <img src={process.env.REACT_APP_BACKEND_URL+`/imgs/${data.img}`}/>
                <p>{data.name}</p>
            </div>
        </Link>
    )
}

export default SearchItem;