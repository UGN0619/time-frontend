// Example React Application for Worker Management

import React, { useState } from 'react';
import axios from 'axios';

const AddWorkerPage = () => {
    const [newWorker, setNewWorker] = useState({
        id: '',
        name: '',
        duration: 8 * 60,
        phone: '',
        education: '',
        role: '',
        social: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWorker(prevState => ({ ...prevState, [name]: name === 'duration' ? parseInt(value, 10) || 0 : value }));
    };

    const handleSaveWorker = () => {
        if (newWorker.id && newWorker.name && newWorker.email) {
            axios.post('/api/workers', newWorker)
                .then(() => {
                    alert('Worker added successfully!');
                    setNewWorker({ id: '', name: '', duration: 8 * 60, phone: '', education: '', role: '', social: '', email: '' });
                })
                .catch(error => console.error('Error adding worker:', error));
        } else {
            alert('Please fill out all required fields.');
        }
    };

    return (
        <div style={{ margin: '20px auto', maxWidth: '600px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Add New Worker</h1>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Worker ID:</label>
                <input
                    type="text"
                    name="id"
                    placeholder="Enter Worker ID"
                    value={newWorker.id}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Worker Name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Worker Name"
                    value={newWorker.name}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Default Duration (minutes):</label>
                <input
                    type="number"
                    name="duration"
                    placeholder="Enter Default Work Duration"
                    value={newWorker.duration}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Phone Number:</label>
                <input
                    type="text"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={newWorker.phone}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Educational Background:</label>
                <input
                    type="text"
                    name="education"
                    placeholder="Enter Educational Background"
                    value={newWorker.education}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Work Role:</label>
                <input
                    type="text"
                    name="role"
                    placeholder="Enter Work Role"
                    value={newWorker.role}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Social Address:</label>
                <input
                    type="text"
                    name="social"
                    placeholder="Enter Social Address"
                    value={newWorker.social}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Email Address:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    value={newWorker.email}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
            </div>
            <button
                onClick={handleSaveWorker}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}
            >
                Save Worker
            </button>
        </div>
    );
};

export default AddWorkerPage;