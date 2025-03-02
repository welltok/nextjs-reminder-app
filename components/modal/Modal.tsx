import { addUser } from '@/features/user/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Notification from '../notification/Notification';

interface UserData {
    _id?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password?: string;
}

interface CustomModalProps {
    user: UserData | null;
    onClose: () => void;
    onSave: (user: UserData) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ user, onClose, onSave }) => {
    const dispatch = useDispatch();
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

    const style = {
        backgroundColor:' #163B42',
        borderColor: '#163B42',
        color: 'white',
    }

    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);

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

        onSave(userData);
        setUserData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
        });
        onClose();
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

            <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <p className='mb-2 font-weight-bold'>{user ? 'Edit User' : 'Create User'}</p>
                            <h4 type="button" className="close p-2" onClick={onClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </h4>
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
                            {!user && (
                                <div className="mb-2 text-start">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" required name="password" value={userData.password} onChange={handleInputChange} />
                                </div>
                            )}
                            <div className="mb-2 text-start">
                                <label className="form-label">Phone Number</label>
                                <input type="tel" className="form-control" required name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={onClose} style={style}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleSave} style={style}>Save</button>
                        </div>
                    </div>
                </div>

                {notification?.show && (
                    <Notification type={notification.type} message={notification.message} />
                )}
            </div>
        </>
    );
};

export default CustomModal;