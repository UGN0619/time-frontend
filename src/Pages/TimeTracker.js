// Example React Component for a Workers' Work Time Tracker

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimeTracker = () => {
    const defaultDuration = 8 * 60; // Default work duration in minutes

    const [workers, setWorkers] = useState([]);
    const [newWorker, setNewWorker] = useState({ id: '', name: '', duration: defaultDuration });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch worker data from the database
        axios.get('/api/workers')
            .then(response => setWorkers(response.data))
            .catch(error => console.error('Error fetching worker data:', error));
    }, []);

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return `${hours > 0 ? `${hours}h ` : ''}${mins}m`;
    };

    const calculateMissingTime = (workedMinutes) => {
        const missingMinutes = Math.max(0, defaultDuration - workedMinutes);
        return formatDuration(missingMinutes);
    };

    const calculateAdditionalTime = (workedMinutes) => {
        const additionalMinutes = Math.max(0, workedMinutes - defaultDuration);
        return formatDuration(additionalMinutes);
    };

    const handleNewWorkerChange = (e) => {
        const { name, value } = e.target;
        setNewWorker(prevState => ({ ...prevState, [name]: name === 'duration' ? parseInt(value, 10) || defaultDuration : value }));
    };

    const handleAddWorker = () => {
        if (newWorker.id && newWorker.name) {
            axios.post('/api/workers', newWorker)
                .then(response => {
                    setWorkers(prevState => [...prevState, response.data]);
                    setNewWorker({ id: '', name: '', duration: defaultDuration }); // Reset form
                    setShowModal(false); // Close modal
                })
                .catch(error => console.error('Error adding new worker:', error));
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Workers' Work Time Tracker</h1>

            <button
                onClick={() => setShowModal(true)}
                style={{ marginBottom: '20px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer' }}
            >
                Add Worker
            </button>

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '10px', width: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Add New Worker</h2>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Worker ID:</label>
                            <input
                                type="text"
                                name="id"
                                placeholder="Enter Worker ID"
                                value={newWorker.id}
                                onChange={handleNewWorkerChange}
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
                                onChange={handleNewWorkerChange}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Default Duration:</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="number"
                                    name="hours"
                                    placeholder="Hours"
                                    min="0"
                                    max="23"
                                    value={Math.floor(newWorker.duration / 60)} // Convert minutes to hours
                                    onChange={(e) => {
                                        const hours = parseInt(e.target.value, 10) || 0;
                                        setNewWorker(prevState => ({
                                            ...prevState,
                                            duration: (hours * 60) + (prevState.duration % 60), // Update duration with new hours
                                        }));
                                    }}
                                    style={{ width: '50%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                                />
                                <input
                                    type="number"
                                    name="minutes"
                                    placeholder="Minutes"
                                    min="0"
                                    max="59"
                                    value={newWorker.duration % 60} // Get remaining minutes
                                    onChange={(e) => {
                                        const minutes = parseInt(e.target.value, 10) || 0;
                                        setNewWorker(prevState => ({
                                            ...prevState,
                                            duration: (Math.floor(prevState.duration / 60) * 60) + minutes, // Update duration with new minutes
                                        }));
                                    }}
                                    style={{ width: '50%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleAddWorker}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}
                        >
                            Add Worker
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#f44336', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Worker ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Worker Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Start Time</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Finish Time</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total Worked</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Missing Time</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Additional Time</th>
                    </tr>
                </thead>
                <tbody>
                    {workers.map(worker => (
                        <tr key={worker.id} style={{ textAlign: 'center' }}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{worker.id}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{worker.name}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{worker.startTime ? new Date(worker.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{worker.endTime ? new Date(worker.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{worker.totalWorked ? formatDuration(worker.totalWorked) : '0m'}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{worker.totalWorked ? calculateMissingTime(worker.totalWorked) : '0m'}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{worker.totalWorked ? calculateAdditionalTime(worker.totalWorked) : '0m'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimeTracker;
