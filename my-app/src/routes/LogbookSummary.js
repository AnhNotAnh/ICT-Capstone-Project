import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LogbookSummary = () => {
    const [pathologyCounts, setPathologyCounts] = useState([]);
    const { studentID } = useParams();
    useEffect(() => {
        fetch(`http://localhost:8081/PathologySummary/${studentID}`)
        .then((res) => {if (!res.ok) {
            throw new Error(
            `Failed to fetch student logbook for student ID: ${studentID}`
            );
        }
        return res.json();
        })
        .then((data) => {
            setPathologyCounts(data);
        })
        .catch((err) => {
            console.error(err.message);
        })
    },[studentID]);
                
    return (
        <div className="container text-center">
            <h2 style={{ padding: "30px" }}>Logbook Summary</h2>
            <div className="row">
                <table className="table mt-3">
                    <thead style={{ backgroundColor: "#98C0E6" }}>
                        <tr>
                            <th style={{ color: "#003C72" }}>Study Type</th>
                            <th style={{ color: "#003C72" }}>Totals</th>
                        </tr>
                    </thead>
                    <tbody>
                    { pathologyCounts.length > 0 ? pathologyCounts.map((pathology, index) => (
                            <tr key={index}>
                                <td>{pathology.pathology}</td>
                                <td>{pathology.count}</td>
                            </tr>
                        )) : <tr>
                                <td>No logbook was recorded </td>
                                <td></td>
                            </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LogbookSummary;