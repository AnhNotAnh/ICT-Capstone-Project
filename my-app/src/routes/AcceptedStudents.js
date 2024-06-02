import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AcceptedStudents = () => {
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

    return (
        <div className="container text-center">
            <h2 style={{ padding: "30px" }}>Accepted Students</h2>
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
    );
};

export default AcceptedStudents;