import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const MilestoneAcceptedStudent = () => {
    const {supervisorID, studentID} = useParams();
    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/getMilestones/${studentID}/${supervisorID}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch milestone ID for: ${studentID} and ${supervisorID}`
                );
            }
            return res.json();
        })
        .then((data) => {
            setMilestones(data);
        })
        .catch((err) => {
            console.error(err.message);
        });
    }, [studentID, supervisorID]);
    return (
        <div className="container text-center">
            <h2 style={{ padding: "30px" }}>Milestone Documents</h2>
            <table className="table mt-3">
                <thead style={{ backgroundColor: "#98C0E6" }}>
                    <tr>
                        <th style={{ color: "#003C72" }}>Number</th>
                        <th style={{ color: "#003C72" }}>Milestone Achievement</th>
                        <th style={{ color: "#003C72" }}>Milestone Summary</th>
                    </tr>
                </thead>
                <tbody>
                {milestones.map((milestone, index) => (
                        <tr key={milestone.milestoneID}>
                            <td>{index + 1}</td>
                            <td>{milestone.milestoneAchievement}</td>
                            <td>
                                <Link to={`/MilestoneSummary/${milestone.milestoneID}`} className="btn btn-primary">
                                    View Summary
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
    }

export default MilestoneAcceptedStudent
