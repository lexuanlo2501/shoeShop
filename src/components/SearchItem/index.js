import classNames from "classnames/bind";
import style  from "./searchIem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState, useTransition } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const cx = classNames.bind(style)

function SearchItem() {
    const [products, setProducts] = useState([])
    const [input, setInput] = useState('')
    const [filterSearch, setFilterSearch] = useState('')

    const [isLoading, startTransition] = useTransition()


    useEffect(() => {
        axios.get('http://localhost:5000/shoes')
        .then(res => setProducts(res.data))
    }, [])

    const handleSearchInput = (e) => {
        setInput(e.target.value)
        startTransition(() => {
            setFilterSearch(e.target.value)
        })
    }

    return ( 
        <div className={cx('wrapper')}>
            <FontAwesomeIcon icon={faSearch}/>
            <input placeholder="Tìm kiếm"
                onChange={handleSearchInput}
            />

            {
                input && 
                <div className={cx('result')}>
                    <FilterDataSearch products={products} input={input} filterSearch={filterSearch}/>
                </div>
            }

            
        </div>
    );
}

function FilterDataSearch({products, filterSearch}) {

    const data = useMemo(() => {
        return products.filter(item => {
            let indexItem = item.name.toLowerCase().includes(filterSearch.toLowerCase())
            return indexItem
        })

    }, [filterSearch])

    return (
        <div>
        {
            data.map(i => <Item key={i.id}  data={i}/>)
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
                <img src={`http://localhost:5000/imgs/${data.img}`}/>
                <p>{data.name}</p>
            </div>
        </Link>
    )
}

export default SearchItem;