import React from "react";
import classes from "./Modal.module.css";
import reactDom from "react-dom";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {reactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("modal-root")
      )}
      {/* {reactDom.createPortal(<ModalOverlay> {props.children} </ModalOverlay>,document.getElementById("modal-root"))} */}
      {reactDom.createPortal(
        <div className={classes.modal}>
          <div>{props.children}</div>
        </div>,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
