import { useEffect, useState } from 'react'
import style from './history.module.scss'
import classNames from 'classnames/bind'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import AvatarAuto from '../../components/AvatarAuto';

const cx = classNames.bind(style)

function History (){
    const [history, setHistory] = useState([])

    useEffect(() => {
        // axios.get("http://localhost:4000/history")
        
        axios.get("http://localhost:5000/history")

        .then(res => {
            console.log(res.data)
            setHistory(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const ActiveIcon = (ac) => 
    {  
        if(ac === "Modify"){
            return <FontAwesomeIcon className={cx(['icon_ac',"i"])} icon={faPenToSquare}/>
        }
        else if(ac === "Delete") {
            return <FontAwesomeIcon className={cx(['icon_ac',"ii"])} icon={faTrashCan}/>
        }
        else if(ac === "Add") {
            return <FontAwesomeIcon className={cx(['icon_ac',"iii"])} icon={faAdd}/>
        }
        
    }

    return (
        <div className={cx('wrapper')}>
            
            <div className={cx('table_history')}>
                <table className="table table-hover">
                    <caption>Lịch sử</caption>
                    <thead>
                        <tr className="table-info">
                            <th scope="col">#</th>
                            <th scope="col"></th>
                            <th scope="col">Ac</th>
                            <th scope="col">Tên admin</th>
                            <th scope="col">Email</th>
                            <th scope="col">Ngày</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Nội dung</th>


                        </tr>
                    </thead>
                    <tbody>
                    {
                        history.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">
                                    <p className={cx('padding_row')}>{index+1}</p>
                                </th>
                                <td>
                                <AvatarAuto nameU={item.userName}/>
                                </td>
                                <td>{ActiveIcon(item.activity)}</td>
                                <td>{item.userName}</td>
                                <td>{item.email}</td>
                                <td>{item.history_date.slice(0,10)}</td>
                                <td>{item.history_date.slice(11)}</td>
                                <td>{item.content}</td>

                            </tr>
                        ))
                    }
                        
                    </tbody>
                </table>
            </div>


          
        </div>
    )
}

export default History