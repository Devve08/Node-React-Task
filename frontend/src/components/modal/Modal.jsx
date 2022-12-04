import React from "react";
import "./Modal.css";

export default function Modal({ modalOpen, text, closeModal, onPressConfirm }) {
  if (!modalOpen) return null;
  return (
    <div onClick={closeModal} className="overlay">
      <div onClick={(e)=> e.stopPropagation()} className="modal-container">
        <h2>{text}</h2>
        <div className="modal-btns-container">
          <button onClick={onPressConfirm} className="yes-btn">Yes</button>
          <button className="no-btn" onClick={closeModal}>No</button>
        </div>
      </div>
    </div>
  );
}
