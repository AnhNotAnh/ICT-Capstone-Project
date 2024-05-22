import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

const Current_Supervisor = () => {
    const { studentID } = useParams();
    const [supervisors, setSupervisors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8081/currentSupervisors/${studentID}`)
            .then(response => response.json())
            .then(data => {
                setSupervisors(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [studentID]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2>Current Supervisors</h2>
            {supervisors.length === 0 ? (
                <p>No supervisors found.</p>
            ) : (
                <ul>
                    {supervisors.map((supervisor, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                            <strong>Name:</strong> {supervisor.name} <br />
                            <strong>Email:</strong> {supervisor.email} <br />
                            <strong>Qualification:</strong> {supervisor.qualification}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Current_Supervisor;