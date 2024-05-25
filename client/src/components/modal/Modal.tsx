import React, { Children, ReactNode, useEffect, useRef } from 'react';
import './modal.scss';

interface ModalProps {
    children: ReactNode,
    visible: boolean,
    setVisible: (visible: boolean) => void;
}


const Modal = ({ children, visible, setVisible }: ModalProps) => {
    const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        if (visible) {
            modalRef.current.classList.add('active');
        } else modalRef.current.classList.remove('active');
    }, [visible])

    return (
        <div className='modal' onClick={() => setVisible(false)} ref={modalRef}>
            <div className='modal__content' onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;