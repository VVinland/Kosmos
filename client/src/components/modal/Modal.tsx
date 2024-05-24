import React, { Children, ReactNode, useEffect } from 'react';
import './modal.scss';

interface Props {
    children: ReactNode,
    visible: boolean,
    setVisible: (visible: boolean) => void;
}


const Modal = ({ children, visible, setVisible }: Props) => {

    useEffect(() => {
        const modal = document.querySelector('.modal');
        if (visible) {
            modal!.classList.add('active');
        } else modal!.classList.remove('active');
    }, [visible])

    return (
        <div className='modal' onClick={() => setVisible(false)}>
            <div className='modal__content' onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;