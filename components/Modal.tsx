import React, { useState } from "react";
import styles from "@/styles/modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {children}
        <div className={styles.closeButton} onClick={closeModal}>
          ×
        </div>
      </div>
    </div>
  );
};

export default Modal;
