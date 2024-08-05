import "./Modal.css";

export default function Modal({ isOpen, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="Modal__background"></div>
      <div className="Modal">
        {children}
      </div>
    </>
  );
}
