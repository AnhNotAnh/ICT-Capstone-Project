import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Supervisor_Home = () => {
    const { accountId } = useParams();
    const [students, setStudents] = useState([]);

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
            ).filter(student => student.isSupervised === 0));
        })
        .catch(error => {
            console.error('Error updating supervision status:', error);
        });
    };

    return (
        <div>
            <h2>Pending Student Requests</h2>
            {students.filter(student => student.isSupervised === 0).map(student => (
                <div key={student.studentID} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <p>Student ID: {student.studentID}</p>
                    <p>Name: {student.name}</p>
                    <p>Email: {student.email}</p>
                    <button onClick={() => handleDecision(student.studentID, true)}>Accept</button>
                    <button onClick={() => handleDecision(student.studentID, false)}>Reject</button>
                </div>
            ))}
            <h2>Accepted Students</h2>
            {students.filter(student => student.isSupervised === 1).map(student => (
                <div key={student.studentID} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <p>Student ID: {student.studentID}</p>
                    <p>Name: {student.name}</p>
                    <p>Email: {student.email}</p>
                </div>
            ))}
        </div>
    );
};

export default Supervisor_Home;