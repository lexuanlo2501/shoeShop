import classNames from "classnames/bind";
import styles from './ModifyQuantity.module.scss';

const cx = classNames.bind(styles)


function ModifyQuantity({state,setSate}) {
    return ( 
        <div className={cx('wrapper')}>
            <span
                onClick={() => {setSate(pre => pre-1)}}
                className={cx(['quatity_btn', 'decr'])}
            >-</span>
            <span className={cx('value_input')}>{state}</span>
            <span
                onClick={() => {setSate(pre => pre+1)}}
                className={cx(['quatity_btn', 'incr'])}
            >+</span>
        </div> 
    );
}

export default ModifyQuantity;