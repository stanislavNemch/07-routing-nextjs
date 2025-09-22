"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

// Интерфейс для пропсов компонента Modal.
interface ModalProps {
    // Определяет, открыто ли модальное окно.
    isOpen: boolean;
    // Функция для закрытия модального окна.
    onClose: () => void;
    // Дочерние элементы (контент), которые будут отображаться внутри.
    children: React.ReactNode;
}

/**
 * Модальное окно.
 * - Использует React Portal для рендеринга вне основного DOM-дерева.
 * - Закрывается по клику на фон (backdrop) или по нажатию клавиши Escape.
 * - Блокирует прокрутку `body`, когда окно открыто.
 */
const Modal = ({
    isOpen,
    onClose,
    children,
}: ModalProps): React.ReactPortal | null => {
    // Эффект для обработки нажатия клавиши "Escape"
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        // Очистка: удаляем обработчик при размонтировании компонента или при закрытии модального окна
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Эффект для блокировки прокрутки фона
    useEffect(() => {
        if (isOpen) {
            const prevOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden"; // Блокируем скролл
            return () => {
                document.body.style.overflow = prevOverflow; // Возвращаем скролл при закрытии
            };
        }
    }, [isOpen]);

    // Обработчик клика по фону для закрытия
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    // Используем createPortal для рендеринга модального окна в `document.body`
    // Это позволяет избежать проблем с z-index и стилизацией.
    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>{children}</div>
        </div>,
        document.body
    );
};

export default Modal;
