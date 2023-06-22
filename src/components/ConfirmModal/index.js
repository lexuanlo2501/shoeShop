import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import style from './ConfirmModal.module.scss'
import classNames from 'classnames/bind';

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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><h2>{title}</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                <button className={cx('btnModal')}  onClick={handleClose}>
                    đóng
                </button>
                <button className={cx('btnModal')}  
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