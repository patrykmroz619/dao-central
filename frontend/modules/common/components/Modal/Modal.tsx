"use client";

import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { X } from "react-feather";

import { useIsBrowser } from "modules/common/hooks/useIsBrowser";
import { useOutsideClick } from "modules/common/hooks/useOutsideClick";
import { H3 } from "../Typography";
import styles from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  heading?: ReactNode;
  width?: number | string;
};

export const Modal = (props: ModalProps) => {
  const { isOpen, onClose, width, heading, children } = props;

  const isBrowser = useIsBrowser();
  const portalContainer = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (onClose && isOpen) {
      onClose();
    }
  };

  useOutsideClick(modalRef, handleClose);

  if (!isBrowser) {
    return null;
  }

  const modalJSX = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={styles.background}
          {...animationProps}
          style={{ maxWidth: width }}
        >
          <div className={styles.modal} ref={modalRef}>
            {heading && <H3 className={styles.modal__heading}>{heading}</H3>}
            {onClose && (
              <button className={styles.modal__closeBtn} onClick={handleClose}>
                <X />
              </button>
            )}
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!portalContainer.current) {
    portalContainer.current = document.createElement("div");
    portalContainer.current.id = "modal";
    document.body.appendChild(portalContainer.current);
  }

  return createPortal(modalJSX, portalContainer.current);
};

const animationProps: MotionProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
