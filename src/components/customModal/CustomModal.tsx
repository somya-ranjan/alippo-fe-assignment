import React, { memo } from "react";
import { Modal, ModalBody } from "reactstrap";
import { IoCloseOutline } from "react-icons/io5";
import "./style.scss";

type modalProps = {
  title: string | null;
  isOpen: boolean;
  onClose?: () => void;
  children: string | React.JSX.Element;
};

function CustomModal({ children, title, isOpen, onClose }: modalProps) {
  return (
    <Modal
      size="md"
      backdrop="static"
      isOpen={isOpen}
      centered
      className="ssss"
    >
      {onClose && <IoCloseOutline className="close_icon " onClick={onClose} />}
      <ModalBody className="position-relative">
        <div>
          <h5 className="modal-title text-center mb-2 w-100">{title}</h5>
        </div>

        {children}
      </ModalBody>
    </Modal>
  );
}

export default memo(CustomModal);
