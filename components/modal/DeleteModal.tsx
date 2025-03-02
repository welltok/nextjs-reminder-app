import React from 'react';

interface DeleteModalProps {
    user: User | null;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ user, onClose, onDelete }) => {
    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between">
                        <p className='mb-2 font-weight-bold'>Delete User</p>
                        <h4 type="button" className="close p-2" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </h4>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete {user?.email}?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;