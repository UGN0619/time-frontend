// Example React Component for a Workers' Work Time Tracker
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimeTracker = () => {
    const defaultDuration = 8 * 60; // Default work duration in minutes

    const [workers, setWorkers] = useState([]);

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

    return (
        <div>
            <Header />
            <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
                <h1 style={{ textAlign: 'center', color: '#61abff' }}>Workers' Work Time Tracker</h1>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#61abff', color: 'white' }}>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Worker ID</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Worker Name</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Start Time</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Finish Time</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total Worked</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Must Work Duration</th>
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
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatDuration(worker.totalWorkingMinutes)}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{worker.totalWorked ? calculateMissingTime(worker.totalWorked) : '0m'}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{worker.totalWorked ? calculateAdditionalTime(worker.totalWorked) : '0m'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default TimeTracker;
