import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './ConfirmModal.module.scss'
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.css';

const cx = classNames.bind(style)

function ConfirmModal({btnText, className, title, body, accept = () => null}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    handleShow()
  }


    return (
        <>
            <button className={cx(className)}
                onClick={handleClick}
            >{btnText}</button>

            <Modal show={show} onHide={handleClose} 
                backdrop="static"
                centered
            >
                <Modal.Header closeButton>
                    <h2>{title}</h2>
                </Modal.Header>
                <Modal.Body><div className={cx("modal_body")}>{body}</div></Modal.Body>
                <Modal.Footer>
                <button className={cx(['btnModal', "no"])}  onClick={handleClose}>
                    đóng
                </button>
                <button className={cx(['btnModal', "yes"])}  
                    onClick={() => {
                        handleClose()
                        accept()
                    }}
                >
                    xác nhận
                </button>
                </Modal.Footer>
            </Modal>
        </>
        
    )
}

export default ConfirmModal