import { useEffect } from 'react';
import style from './team.module.scss'
import classNames from 'classnames/bind';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(style)

const member = [
    {
        name: 'Nguyễn Đăng Thiên An',
        id: '26211934770'
    },
    {
        name:' Đoàn Quang Đăng',
        id: '26211935883'
    },
    {
        name: 'Phạm Phú Huy',
        id: '26211935473'
    },
    {
        name: 'Vũ Nhật Tân',
        id: '26211935346'
    },
    {
        name: 'Lê Xuân Thắng',
        id: '26211941542'
    }
]

function Team() {
   

    return (
        <div className={cx('wrapper')}>
            <div className={cx('teamTitle')}>
                <h1>Team</h1>
                <div className={cx('quantity_member')}>
                    <FontAwesomeIcon icon={faUser}/>
                    <span>5</span>
                </div>
            </div>
            <div>
            {
                member.map(item => <Member key={item.id} infor={item}/>)
            }
            </div>

            <div className={cx('add_member')}>
                <button>+</button> 
                <span>thêm thành viên</span>
            </div>
        </div>
    );
}

function Member({infor})  {
    return (
        <div className={cx('member_wrapper')}>
            <FontAwesomeIcon className={cx('avatar')} icon={faUser} />
            <div className={cx('name-role')}>
                <p className={cx('name')}>{infor.name}</p>
                <p className={cx('role')}>member</p>

            </div>
            <FontAwesomeIcon className={cx('mail')} icon={faEnvelope} />
        </div>
    )
}

export default Team;