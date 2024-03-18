import { useState } from 'react';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import style from './ConfirmModal.module.scss'
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.css';

const cx = classNames.bind(style)

// = () => null
function ConfirmModal_v2({children, title, body, fullscreen, centered, size="", accept , onClick= () => {}}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true)
        e.preventDefault();
        onClick()
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        // Kiểm tra xem child có phải là một React element không
        if (React.isValidElement(child)) {
        // Clone element và thêm prop muốn truyền vào
        return React.cloneElement(child, { onClick: handleShow })
        }
        return child
    });


    return (
        <>
            {childrenWithProps}
            <Modal show={show} onHide={handleClose} 
                backdrop="static"
                centered={centered}
                fullscreen={fullscreen}
                size={size}
            >
                <Modal.Header closeButton><h2>{title}</h2></Modal.Header>
                <Modal.Body><div className={cx("modal_body")}>{body}</div></Modal.Body>
            {
                accept && 
                <Modal.Footer>
                    <button className={cx(['btnModal', "yes"])}  
                        onClick={() => {
                            handleClose()
                            accept && accept()
                        }}
                    >
                        xác nhận
                    </button>
                    <button className={cx(['btnModal', "no"])}  onClick={handleClose}>
                        đóng
                    </button>
                </Modal.Footer>
            }
            
            </Modal>
        </>
        
    )
}

export default ConfirmModal_v2