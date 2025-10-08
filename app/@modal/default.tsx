
"use client";

import { ReactNode } from "react";
import css from "./default.module.css";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closebtn} onClick={onClose} aria-label="Close Modal">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
