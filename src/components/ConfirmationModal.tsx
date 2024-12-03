type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, productName }: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Are you sure you want to delete the product: {productName}?</h3>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">Cancel</button>
          <button onClick={onConfirm} className="btn-confirm">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
