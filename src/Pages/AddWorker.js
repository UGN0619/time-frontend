import React, { useState } from 'react';
import axios from 'axios';
import Header from "../Component/Header";
import Footer from "../Component/Footer";

const AddWorkerPage = () => {
    const [newWorker, setNewWorker] = useState({
        code: '',
        name: '',
        phone: '',
        education: '',
        role: '',
        social: '',
        email: '',
        workingHours: '',
        workingMinutes: '',
        totalWorkingMinutes: 0, // This will store the combined work duration
    });

    const [profilePicture, setProfilePicture] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWorker((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    const calculateTotalWorkingMinutes = () => {
        const hours = parseInt(newWorker.workingHours) || 0;
        const minutes = parseInt(newWorker.workingMinutes) || 0;
        return hours * 60 + minutes;
    };

    const handleSaveWorker = () => {
        if (newWorker.id && newWorker.name && newWorker.email && newWorker.totalWorkingMinutes) {
            const totalMinutes = calculateTotalWorkingMinutes();

            // Create FormData to include both JSON data and the file
            const formData = new FormData();
            formData.append('profilePicture', profilePicture);
            formData.append(
                'workerData',
                JSON.stringify({ ...newWorker, totalWorkingMinutes: totalMinutes })
            );

            axios
                .post('/api/users', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(() => {
                    alert('Worker added successfully!');
                    setNewWorker({
                        id: '',
                        name: '',
                        phone: '',
                        education: '',
                        role: '',
                        social: '',
                        email: '',
                        workingHours: '',
                        workingMinutes: '',
                        totalWorkingMinutes: 0,
                    });
                    setProfilePicture(null);
                })
                .catch((error) => console.error('Error adding worker:', error));
        } else {
            alert('Please fill out all required fields.');
        }
    };


    const handleDeleteWorker = () => {
        if (newWorker.id) {
            axios
                .delete(`/api/user/${newWorker.id}`)
                .then(() => {
                    alert('Worker deleted successfully!');
                    setNewWorker({
                        id: '',
                        name: '',
                        phone: '',
                        education: '',
                        role: '',
                        social: '',
                        email: '',
                        workingHours: '',
                        workingMinutes: '',
                        totalWorkingMinutes: 0,
                    });
                    setProfilePicture(null);
                })
                .catch((error) => console.error('Error deleting worker:', error));
        } else {
            alert('Please provide a valid Worker ID to delete.');
        }
    };

    return (
        <div>
            <Header />
            <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif' }}>
                <div
                    style={{
                        maxWidth: '1000px',
                        margin: '0 auto',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '12px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                    }}
                >
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}>
                        Ажилчны мэдээллүүд
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '12px' }}>
                        {/* Profile Picture Section */}
                        <div
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '1px solid #ccc',
                                marginBottom: '12px',
                                position: 'relative',
                            }}
                        >
                            {profilePicture ? (
                                <img
                                    src={profilePicture}
                                    alt="Profile"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <img
                                    src=""
                                    alt=""
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    opacity: 0,
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    </div>

                    {/* Form Fields Section */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {/* Worker ID and Name Fields */}
                        <div style={{ flex: '1 1 45%' }}>
                            <label htmlFor="id" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                                Ажилчны код
                            </label>
                            <input
                                type="text"
                                name="id"
                                id="id"
                                placeholder="Кодоо оруулна уу"
                                value={newWorker.id}
                                onChange={handleInputChange}
                                style={{
                                    width: '95%',
                                    padding: '6px 12px',
                                    fontSize: '14px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                        </div>
                        <div style={{ flex: '1 1 45%' }}>
                            <label htmlFor="name" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                                Ажилчны нэр
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Нэрээ оруулна уу"
                                value={newWorker.name}
                                onChange={handleInputChange}
                                style={{
                                    width: '95%',
                                    padding: '6px 12px',
                                    fontSize: '14px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                        </div>
                    </div>

                    {/* Email (Gmail) Field */}
                    <div style={{ flex: '1 1 45%' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                            Ажилчны Gmail хаяг
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Gmail хаягаа оруулна уу"
                            value={newWorker.email}
                            onChange={handleInputChange}
                            style={{
                                width: '97.5%',
                                padding: '6px 12px',
                                fontSize: '14px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        />
                    </div>

                    {/* Working Hours and Minutes Fields */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        <div style={{ flex: '1 1 45%' }}>
                            <label htmlFor="workingHours" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                                Нэг өдөр ажиллах хугацаа (цагаар)
                            </label>
                            <input
                                type="number"
                                name="workingHours"
                                id="workingHours"
                                placeholder="Цагаар оруулна уу"
                                value={newWorker.workingHours}
                                onChange={(e) => {
                                    if (e.target.value <= 24 && e.target.value >= 0) {
                                        handleInputChange(e);
                                    }
                                }}
                                style={{
                                    width: '95%',
                                    padding: '6px 12px',
                                    fontSize: '14px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                        </div>
                        <div style={{ flex: '1 1 45%' }}>
                            <label htmlFor="workingMinutes" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                                Нэг өдөр ажиллах хугацаа (минутаар)
                            </label>
                            <input
                                type="number"
                                name="workingMinutes"
                                id="workingMinutes"
                                placeholder="Минутаар оруулна уу"
                                value={newWorker.workingMinutes}
                                onChange={(e) => {
                                    if (e.target.value <= 59 && e.target.value >= 0) {
                                        handleInputChange(e);
                                    }
                                }}
                                style={{
                                    width: '95%',
                                    padding: '6px 12px',
                                    fontSize: '14px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        <div style={{ flex: '1 1 45%' }}>
                            <label htmlFor="phone" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                                Утасны дугаар
                            </label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="Утасны дугаар оруулна уу"
                                value={newWorker.phone}
                                onChange={handleInputChange}
                                style={{
                                    width: '95%',
                                    padding: '6px 12px', // Increased padding for better spacing
                                    fontSize: '14px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                        </div>
                        <div style={{ flex: '1 1 45%' }}>
                            <label htmlFor="education" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                                Боловсролын зэрэг
                            </label>
                            <input
                                type="text"
                                name="education"
                                id="education"
                                placeholder="Боловсролын зэргээ оруулна уу"
                                value={newWorker.education}
                                onChange={handleInputChange}
                                style={{
                                    width: '95%',
                                    padding: '6px 12px', // Increased padding for better spacing
                                    fontSize: '14px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                        </div>
                    </div>

                    {/* Role and Social Fields */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        <div style={{ flex: '1 1 45%' }}>
                            <label htmlFor="role" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                                Ажилчны үүрэг
                            </label>
                            <input
                                type="text"
                                name="role"
                                id="role"
                                placeholder="Үүргээ оруулна уу"
                                value={newWorker.role}
                                onChange={handleInputChange}
                                style={{
                                    width: '95%',
                                    padding: '6px 12px', // Increased padding for better spacing
                                    fontSize: '14px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                        </div>
                        <div style={{ flex: '1 1 45%' }}>
                            <label htmlFor="social" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                                Цахим хаяг
                            </label>
                            <input
                                type="text"
                                name="social"
                                id="social"
                                placeholder="Цахим хаягаа оруулна уу"
                                value={newWorker.social}
                                onChange={handleInputChange}
                                style={{
                                    width: '95%',
                                    padding: '6px 12px', // Increased padding for better spacing
                                    fontSize: '14px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                        <button
                            onClick={handleDeleteWorker}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            Буцах
                        </button>
                        <button
                            onClick={handleSaveWorker}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'green',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            Хадгалах
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddWorkerPage;
