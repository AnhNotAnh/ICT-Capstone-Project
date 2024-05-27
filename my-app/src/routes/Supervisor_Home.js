import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Supervisor_Home = () => {
    const { accountId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8081/getSupervisedStudents/${accountId}`)
            .then(response => response.json())
            .then(data => {
                setStudents(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [accountId]);

    const handleAccept = (studentID) => {
        // Handle acceptance (no changes to the database)
        alert(`Student ${studentID} accepted.`);
    };

    const handleReject = (studentID) => {
        fetch('http://localhost:8081/rejectStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentID, accountId }),
        })
        .then(response => response.json())
        .then(data => {
            setStudents(students.filter(student => student.studentID !== studentID));
            alert(`Student ${studentID} rejected.`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>Supervised Students</h2>
            {students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <ul>
                    {students.map((student, index) => (
                        <li key={index}>
                            <strong>Name:</strong> {student.name} <br />
                            <strong>Email:</strong> {student.email} <br />
                            <strong>Qualification:</strong> {student.qualification} <br />
                            <button onClick={() => handleAccept(student.studentID)}>Accept</button>
                            <button onClick={() => handleReject(student.studentID)}>Reject</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Supervisor_Home;