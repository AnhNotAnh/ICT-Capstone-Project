import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const MilestoneStudent = () => {

    const {studentID} = useParams();
    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/getStudentMilestones/${studentID}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch milestone ID for: ${studentID}`
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
    }, [studentID]);

  return (
    <div className="container text-center">
        <h2 style={{ padding: "30px" }}>Milestone Documents</h2>
        <div className="row">
            <table className="table mt-3">
                <thead style={{ backgroundColor: "#98C0E6" }}>
                    <tr>
                        <th style={{ color: "#003C72" }}>Milestone Achievement</th>
                        <th style={{ color: "#003C72" }}>Milestone Summary</th>
                    </tr>
                </thead>
                <tbody>
                { milestones.length > 0 ? 
                    milestones.map((milestone) => (
                        <tr key={milestone.milestoneID}>
                            <td>{milestone.milestoneAchievement}</td>
                            <td>
                                <Link to={`/MilestoneSummary/${milestone.milestoneID}`} className="btn btn-primary">
                                    View Summary
                                </Link>
                            </td>
                        </tr>
                    )) : 
                        <tr>
                            <td>No completed milestone document</td>
                            <td></td>
                        </tr>}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MilestoneStudent
