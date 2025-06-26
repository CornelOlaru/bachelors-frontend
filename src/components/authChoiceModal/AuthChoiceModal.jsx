import { IoClose } from "react-icons/io5";
import Modal from "../../components/modal/Modal";
import "./authChoiceModal.css"


const AuthChoiceModal = ({ isOpen, onRequestClose, onLogin, onGuest }) => {
 

  if (!isOpen) return null;

  return (
    <div className="modal-bg">
      <div className="modal-content">
        <button className="modal-close" onClick={onRequestClose}><IoClose color="#000" /></button>
        <Modal.Title>
<h3>Nu sunteti autentificat</h3>
        </Modal.Title>
        <Modal.Body>
 <p>
          Doriți să vă autentificați pentru a beneficia de oferte, promoții viitoare și istoric comenzi,
          sau să continuați ca guest?
        </p>
       <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button
            onClick={() => {
              onRequestClose();
              onLogin();
            }}
          >
            Autentificare
          </button>
          <button
            onClick={() => {
              onRequestClose();
              onGuest();
            }}
          >
            Continuă ca guest
          </button>
        </div>
    
       
        </Modal.Body>
      </div>
    </div>
  );
};

export default AuthChoiceModal;

