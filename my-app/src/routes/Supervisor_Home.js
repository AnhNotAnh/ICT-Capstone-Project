import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Supervisor_Home = () => {
   
    const { accountId } = useParams();
    const [students, setStudents] = useState([]);
    const [showPending, setShowPending] = useState(false);
    const [showAccepted, setShowAccepted] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8081/getSupervisedStudents/${accountId}`)
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, [accountId]);

    const handleDecision = (studentID, decision) => {
        const endpoint = decision ? 'acceptStudent' : 'rejectStudent';
        axios.post(`http://localhost:8081/${endpoint}`, {
            studentID: studentID,
            accountId: accountId
        })
        .then(response => {
            console.log(response.data.message);
            // Refresh the student list to reflect changes
            setStudents(students.map(student => 
                student.studentID === studentID ? { ...student, isSupervised: decision ? 1 : 0 } : student
            ));
        })
        .catch(error => {
            console.error('Error updating supervision status:', error);
        });
    };

    return (
        <div className="container text-center">
            <h2 style={{ padding: "30px" }}>Supervisor Dashboard</h2>
            <div className="d-grid gap-2 col-8 mx-auto">
                <button className="btn btn-outline-primary" onClick={() => setShowPending(!showPending)}>
                    {showPending ? 'Hide Pending Requests' : 'Show Pending Requests'}
                </button>
                <button className="btn btn-outline-primary" onClick={() => setShowAccepted(!showAccepted)}>
                    {showAccepted ? 'Hide Accepted Students' : 'Show Accepted Students'}
                </button>
            </div>

            {showPending && (
                <div>
                    <h2>Pending Student Requests</h2>
                    {students.filter(student => student.isSupervised === 0).length === 0 ? (
                        <p>No pending requests</p>
                    ) : (
                        <table className="table">
                            <thead style={{ backgroundColor: "#98C0E6" }}>
                                <tr>
                                    <th style={{ color: "#003C72" }}>Student ID</th>
                                    <th style={{ color: "#003C72" }}>Name</th>
                                    <th style={{ color: "#003C72" }}>Email</th>
                                    <th style={{ color: "#003C72" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.filter(student => student.isSupervised === 0).map(student => (
                                    <tr key={student.studentID}>
                                        <td>{student.studentID}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>
                                            <div className="d-grid gap-2 col-8 mx-auto">
                                                <button className="btn btn-outline-primary" onClick={() => handleDecision(student.studentID, true)}>Accept</button>
                                                <button className="btn btn-outline-primary" onClick={() => handleDecision(student.studentID, false)}>Reject</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {showAccepted && (
                <div>
                    <h2>Accepted Students</h2>
                    {students.filter(student => student.isSupervised === 1).length === 0 ? (
                        <p>No accepted students</p>
                    ) : (
                        <table className="table">
                            <thead style={{ backgroundColor: "#98C0E6" }}>
                                <tr>
                                    <th style={{ color: "#003C72" }}>Student ID</th>
                                    <th style={{ color: "#003C72" }}>Name</th>
                                    <th style={{ color: "#003C72" }}>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.filter(student => student.isSupervised === 1).map(student => (
                                    <tr key={student.studentID}>
                                        <td>{student.studentID}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};
     

export default Supervisor_Home;