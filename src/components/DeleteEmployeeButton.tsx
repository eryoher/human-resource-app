import React, { useState } from "react";

interface DeleteEmployeeModalProps {
  onDelete: () => void;
}

const DeleteEmployeeModal: React.FC<DeleteEmployeeModalProps> = ({
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    onDelete(); // Llama a la función de eliminación pasada como prop
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
      >
        Remove
      </button>

      {showModal && (
        <div
          className={
            "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          }
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this employee?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteEmployeeModal;
