// Example React Component for a Workers' Work Time Tracker

import React, { useState } from 'react';

const TimeTracker = () => {
    const [workers, setWorkers] = useState([
        { id: 1, name: 'John Doe', startTime: '', endTime: '', duration: '8:00' },
        { id: 2, name: 'Jane Smith', startTime: '', endTime: '', duration: '8:00' },
    ]);

    const handleStartTimeChange = (id, value) => {
        setWorkers(prevState =>
            prevState.map(worker =>
                worker.id === id ? { ...worker, startTime: value } : worker
            )
        );
    };

    const handleEndTimeChange = (id, value) => {
        setWorkers(prevState =>
            prevState.map(worker => {
                if (worker.id === id) {
                    const start = new Date(`1970-01-01T${worker.startTime}:00`);
                    const end = new Date(`1970-01-01T${value}:00`);
                    const workedHours = Math.abs((end - start) / (1000 * 60 * 60)).toFixed(2);

                    return { ...worker, endTime: value, duration: workedHours };
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
                                <input
                                    type="time"
                                    value={worker.startTime}
                                    onChange={e => handleStartTimeChange(worker.id, e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="time"
                                    value={worker.endTime}
                                    onChange={e => handleEndTimeChange(worker.id, e.target.value)}
                                />
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
