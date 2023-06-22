import classNames from "classnames/bind";
import style from './meeting.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const cx = classNames.bind(style)


function Meeting() {

    const [day, setDay] = useState("")

    const dayVN = [
        'chủ nhật',
        'thứ hai',
        'thứ ba',
        'thứ tư',
        'thứ năm',
        'thứ sáu',
        'thứ bảy'
    ]

    return (
        <div className={cx('wrapper')}>
            <h4 className="text-secondary">MEETING</h4>
            <h2>Project onboarding</h2>
            <input className={cx('descreiption')} placeholder="add your descreiption ......."/>

            <div className={cx('hour_meeting')}>
                <select className={cx('slectHour')}>
                    <option>07:00 - 09:00</option>
                    <option>09:00 - 11:00</option>
                    <option>13:00 - 15:00</option>
                    <option>15:00 - 17:00</option>
                    <option>16:00 - 18:00</option>
                    <option>18:00 - 20:00</option>

                </select>
                <FontAwesomeIcon className={cx('clock_icon')} icon={faClock}/>
            </div>
            <div className={cx('date_meeting')}>
                <input type="date"
                    onChange={(e) => {
                        const dateV = new Date(e.target.value)
                        const indexDay = dateV.getDay()
                        setDay(dayVN[indexDay])
                        // console.log(dayVN[indexDay])
                    }}
                />
                <span className={cx('day')}>{day}</span>
            </div>

            <button className={cx('sendLink_btn')}>
                <FontAwesomeIcon className={cx('send_icon')} icon={faPaperPlane}/>
                <span>
                    send invitation link
                </span>
            </button>



        </div>
    );
}

export default Meeting;