"use client";

import { useRouter } from "next/navigation";
// Импортируем useCallback
import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
    children: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const Modal = ({
    children,
    isOpen: isOpenProp,
    onClose: onCloseProp,
}: ModalProps) => {
    const router = useRouter();

    // ✨ Оборачиваем handleClose в useCallback
    const handleClose = useCallback(() => {
        if (onCloseProp) {
            onCloseProp(); // Если передан onClose, используем его
        } else {
            router.back(); // Иначе используем router.back()
        }
    }, [onCloseProp, router]); // Зависимости: функция изменится, только если изменятся эти пропсы/объекты

    const isOpen = isOpenProp ?? true;
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleClose]); // Теперь `handleClose` стабилен, и эффект не будет перезапускаться без причины

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (
            dialogRef.current &&
            !dialogRef.current.contains(e.target as Node)
        ) {
            handleClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className={css.backdrop} onClick={handleBackdropClick}>
            <div ref={dialogRef} className={css.modal}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
