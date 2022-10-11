import { useEffect, useRef, FC } from "react";
import { createPortal } from "react-dom";

let modalRoot: HTMLElement | null = null

const createModalRoot = (): void => {
    const body = document.body
    const modalRootElement = document.createElement('div')

    modalRootElement.setAttribute('id', 'modal-root')
    modalRootElement.setAttribute('class', 'modal-root')

    body.appendChild(modalRootElement)
}

const setDefaultWrapperForModalRoot = (): HTMLElement =>{
    const wrapper = document.createElement("div")
    const element = document.createElement("div")

    wrapper.setAttribute('class', 'modal-root__wrapper')
    element.setAttribute('class', 'modal-root__backdrop')

    element.appendChild(wrapper)

    return element
}

const searchModalRoot = (): HTMLElement => {
    let element: HTMLElement | null = null

    if (typeof window !== 'undefined') {
        element = setDefaultWrapperForModalRoot()
    }

    return element as HTMLElement
}

if (typeof window !== 'undefined') {
    createModalRoot()

    modalRoot = document.querySelector("#modal-root") as HTMLElement;
}

interface ModalProps {
    children?: JSX.Element;
    className?: string
}

const Modal: FC<ModalProps> = ({ children, className }: ModalProps): JSX.Element => {
    const el = useRef(searchModalRoot())
    const wrapper = el.current.querySelector('.modal-root__wrapper') as Element

    useEffect(() => {
        const current = el.current;

        modalRoot!.appendChild(current);
        modalRoot!.classList.add(className as string)

        return () => void modalRoot!.removeChild(current);
    }, []);

    return createPortal(children, wrapper);
};

export default Modal;