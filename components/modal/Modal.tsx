import { addUser } from '@/features/user/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Notification from '../notification/Notification';

interface UserData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
}

const CustomModal: React.FC = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });
    const [notification, setNotification] = useState<{ show: boolean; type: 'success' | 'fail'; message: string }>({
        show: false,
        type: 'success',
        message: ''
    });

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (Object.values(userData).some(value => value === '')) {
            setNotification({
                show: true,
                type: 'fail',
                message: 'Please fill all the fields'
            });
            return;
        }

        console.log('User Data:', userData);
        dispatch(addUser(userData));
        setUserData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
        });
        closeModal();
    };

    useEffect(() => {
        if (notification?.show) {
            const timer = setTimeout(() => {
                setNotification({ ...notification, show: false });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={openModal}>
                Create New
            </button>

            {isOpen && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <p className='mb-2 font-weight-bold'>Create User</p>
                                <button type="button" className="close p-1" onClick={closeModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-2 text-start">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" required name="firstName" value={userData.firstName} onChange={handleInputChange} />
                                </div>
                                <div className="mb-2 text-start">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" required name="lastName" value={userData.lastName} onChange={handleInputChange} />
                                </div>
                                <div className="mb-2 text-start">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" required name="email" value={userData.email} onChange={handleInputChange} />
                                </div>
                                <div className="mb-2 text-start">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" required name="password" value={userData.password} onChange={handleInputChange} />
                                </div>
                                <div className="mb-2 text-start">
                                    <label className="form-label">Phone Number</label>
                                    <input type="tel" className="form-control" required name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={closeModal}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                            </div>
                        </div>
                    </div>

                    {notification?.show && (
                        <Notification type={notification.type} message={notification.message} />
                    )}
                </div>
            )}
        </>
    );
};

export default CustomModal;
