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
        <div className="container text-center">
            <h2 style={{ padding: "30px" }}>Current Supervisors</h2>
            {supervisors.length === 0 ? (
                <p>No supervisors found.</p>
            ) : (
                <table className="table">
                    <thead style={{ backgroundColor: "#98C0E6" }}>
                        <tr>
                            <th style={{ color: "#003C72" }}>Name</th>
                            <th style={{ color: "#003C72" }}>Email</th>
                            <th style={{ color: "#003C72" }}>Qualification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supervisors.map((supervisor, index) => (
                            <tr key={index}>
                                <td>{supervisor.name}</td>
                                <td>{supervisor.email}</td>
                                <td>{supervisor.qualification}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default Current_Supervisor;