// Example React Component for a Workers' Work Time Tracker

import React, { useState } from 'react';

const TimeTracker = () => {
    const [workers, setWorkers] = useState([
        { id: 1, name: 'John Doe', startTime: '', endTime: '', duration: '8:00' },
        { id: 2, name: 'Jane Smith', startTime: '', endTime: '', duration: '8:00' },
    ]);

    const handleStartTimeClick = (id) => {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setWorkers(prevState =>
            prevState.map(worker =>
                worker.id === id ? { ...worker, startTime: currentTime } : worker
            )
        );
    };

    const handleEndTimeClick = (id) => {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setWorkers(prevState =>
            prevState.map(worker => {
                if (worker.id === id) {
                    const start = new Date(`1970-01-01T${worker.startTime}:00`);
                    const end = new Date(`1970-01-01T${currentTime}:00`);
                    const workedHours = start && end ? Math.abs((end - start) / (1000 * 60 * 60)).toFixed(2) : '0.00';

                    return { ...worker, endTime: currentTime, duration: workedHours };
                }
                return worker;
            })
        );
    };

    return (
        <div>
            <h1>Workers' Work Time Tracker</h1>
            <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Worker Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Duration (Hours)</th>
                    </tr>
                </thead>
                <tbody>
                    {workers.map(worker => (
                        <tr key={worker.id}>
                            <td>{worker.name}</td>
                            <td>
                                <div>
                                    <button onClick={() => handleStartTimeClick(worker.id)}>Set Start Time</button>
                                    <span style={{ marginLeft: '10px' }}>{worker.startTime}</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <button onClick={() => handleEndTimeClick(worker.id)}>Set End Time</button>
                                    <span style={{ marginLeft: '10px' }}>{worker.endTime}</span>
                                </div>
                            </td>
                            <td>{worker.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimeTracker;