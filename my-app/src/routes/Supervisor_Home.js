import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';

const Supervisor_Home = () => {
   
  
    const { accountId } = useParams();
    const [students, setStudents] = useState([]);
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
                <Link to={`/PendingRequests/${accountId}`} className="btn btn-outline-primary">
                    Show Pending Requests
                </Link>
                <Link to={`/AcceptedStudents/${accountId}`} className="btn btn-outline-primary">
                    Show Accepted Students
                </Link>
            </div>
        </div>
    );
};

export default Supervisor_Home;