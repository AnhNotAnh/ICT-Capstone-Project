import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Milestone from '../components/Milestone';

function Logbook() {
    const { studentID } = useParams();
    {/* Consider the path to have student id so that supervisor and student id access */ }
    const [supervisionStatus, setSupervisionStatus] = useState("full");
    const [date, setDate] = useState("");
    const [pathology, setPathology] = useState("");
    const [logbook, setLogbook] = useState([]);
    const [scanNumber, setScanNumber] = useState(0);
    const [nextLogbookID, setNextLogbookID] = useState(0);
    const [logbook1, setLogbook1] = useState([]);
    const remainder = scanNumber % 5;
    const [isDocSubmitted, setIsDocSubmitted] = useState(false);
    const [milestoneID, setMilestoneID] = useState(0);

    //Could be removed as logbook ID now is auto increment
    useEffect(() => {
    fetch(`http://localhost:8081/Logbook`)
        .then((response) => {
        if (!response.ok) {
            throw new Error(
            `Failed to fetch logbook`
            );
        }
        return response.json();
        })
        .then((data) => {
        console.log(data);
        setNextLogbookID(data.length + 1);
        })
        .catch((err) => {
        console.error(err.message);
        });
    }, []);

    useEffect(() => {
    fetch(`http://localhost:8081/Logbook/${studentID}`)
        .then((response) => {
        if (!response.ok) {
            throw new Error(
            `Failed to fetch student logbook for student ID: ${studentID}`
            );
        }
        return response.json();
        })
        .then((data) => {
        console.log(data);
        setLogbook1(data);
        setScanNumber(data.length);
        })
        .catch((err) => {
        console.error(err.message);
        });
    }, [studentID]);

    useEffect(() => {
    const sortedData = [...logbook1].sort((a, b) => new Date(a.date) - new Date(b.date));
    setLogbook(sortedData);
}, [logbook1]);

    //Milestone alert
    useEffect(() => {
        fetch('http://localhost:8081/milestoneVerification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentID : studentID,
                milestoneAchievement : scanNumber,
            }),
            })
            .then((response) =>  response.json())
            .then((data) => {
                setIsDocSubmitted(data.verification);
                console.log(data.verification);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, [scanNumber, studentID]);

    //Check if student plan is available
    useEffect(() => {
        fetch(`http://localhost:8081/checkStudentPlan/${studentID}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `Failed to check if plan page is ready for: ${studentID}`
                );
            }
            return res.json();
        })
        .then((data) => {
            setMilestoneID(data.milestoneID);
        })
        .catch((err) => {
            console.error(err.message);
        });
    }, [studentID]);

    const handleSubmit = async (event) => { 
    event.preventDefault();
    const logbookData = {
    logbookID: nextLogbookID,
    studentID: studentID,
    date: date,
    supervisionStatus: supervisionStatus,
    pathology: pathology,
    };
    console.log(logbookData);
    try {
        const response = await fetch(`http://localhost:8081/Logbook/studentID`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
            body: JSON.stringify(logbookData),
        });
        if (!response.ok) {
            throw new Error(`Failed to create account`);
        }
        setLogbook1(currentLogbook => {
            return [...currentLogbook,
            {logbookID: logbookData.logbookID, studentID : studentID , date: date, supervisionStatus: supervisionStatus, pathology: pathology },
            ];
        })
        setDate("");
        setSupervisionStatus("full");
        setPathology("");
        setNextLogbookID(nextLogbookID + 1);
        setScanNumber(scanNumber + 1);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
    };

    return (
    <div className="container">
        <h2 style={{ padding: "30px" }}>Cardiac Logbook</h2>
        <p>No of Scan: {scanNumber}</p>
        {(remainder === 0 && scanNumber !== 0 && isDocSubmitted !== true) && 
        <div className="row justify-content-center">
            <div className='col-7'>
                <p style={{color: 'red'}}>You have reach a Milestone, please go to Milestone page to finish your document !</p>
                <Link to={`/Milestone/${studentID}`} className="btn btn-danger">Milestone</Link>
            </div>
        </div>
        }
        { milestoneID !== 0 && 
        <div className="row justify-content-center">
            <div className='col-7'>
                <p style={{color: 'red'}}>Your supervisor have completed Sectioc B Milestone, please go to Milestone page to finish your plan !</p>
                <Link to={`/PlanForImprovement/${milestoneID}`} className="btn btn-danger">Milestone</Link>
            </div>
        </div>
        }
        <form onSubmit={handleSubmit} className="new-scan-form">
            <div className="row justify-content-center" style={{ paddingBottom: "30px" }}>
                <div className="col-3">
                <label htmlFor="dateLogbook" className="form-label">
                    Date
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="dateLogbook"
                    required
                    placeholder="dd/mm/yyyy"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                </div>
                <div className="col-3">
                <label htmlFor="supervisionStatus" className="form-label">
                    Supervision status
                </label>
                <select
                    value={supervisionStatus}
                    className="form-select"
                    onChange={(e) => setSupervisionStatus(e.target.value)}
                    id="supervisionStatus"
                    required
                >
                    <option value="">Please select status</option>
                    <option value="Full">Full supervision</option>
                    <option value="Partial">Partial supervision</option>
                </select>
                </div>
                {/* <div className="col-3">
                        <label htmlFor="pathology" className="form-label">
                        Pathology
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        id="pathology"
                        required
                        placeholder="Pathology"
                        value={pathology}
                        onChange={(e) => setPathology(e.target.value)}
                        />
                    </div> */}
                <div className="col-4">
                    <label htmlFor="pathology" className="form-label">Pathology</label>
                    <select value={pathology} className="form-select"
                    onChange={(e) => setPathology(e.target.value)}
                    id="pathology"
                    required>
                        <option value="">
                        Please select one of cardiac pathologies
                        </option>
                        <option value="Post myocardial infarction">
                        Post myocardial infarction
                        </option>
                        <option value="Left ventricular dysfunction">
                        Left ventricular dysfunction
                        </option>
                        <option
                        value="Left ventricular diastolic dysfunction with preserved systolic
                        function">
                        Left ventricular diastolic dysfunction with preserved systolic
                        function
                        </option>
                        <option value="Hypertensive heart disease ">
                        Hypertensive heart disease
                        </option>
                        <option value="Hypertrophic Cardiomyopathy">
                        Hypertrophic Cardiomyopathy
                        </option>
                        <option value="Dilated Cardiomyopathy">
                        Dilated Cardiomyopathy
                        </option>
                        <option value="Infiltrative Cardiomyopathy">
                        Infiltrative Cardiomyopathy
                        </option>
                        <option value="Aortic stenosis">Aortic stenosis</option>
                        <option value="Mitral regurgitation">
                        Mitral regurgitation
                        </option>
                        <option value="Mitral stenosis">Mitral stenosis</option>
                        <option value="Aortic regurgitation ">
                        Aortic regurgitation
                        </option>
                        <option value="Prosthetic valves (left sided)">
                        Prosthetic valves (left sided)
                        </option>
                        <option value="Aortic aneurysm">Aortic aneurysm</option>
                        <option value="Aortic dissection">Aortic dissection</option>
                        <option value="Right ventricular dysfunction">
                        Right ventricular dysfunction
                        </option>
                        <option value="Post pulmonary embolus">
                        Post pulmonary embolus
                        </option>
                        <option value="Pulmonary hypertension">
                        Pulmonary hypertension
                        </option>
                        <option value="Tricuspid regurgitation">
                        Tricuspid regurgitation
                        </option>
                        <option value="Pulmonary regurgitation">
                        Pulmonary regurgitation
                        </option>
                        <option value="Tricuspid stenosis">Tricuspid stenosis</option>
                        <option value="Pulmonary stenosis">Pulmonary stenosis</option>
                        <option value="Prosthetic valves (right sided)">
                        Prosthetic valves (right sided)
                        </option>
                        <option value="Post pacemaker or ICD">
                        Post pacemaker or ICD
                        </option>
                        <option value="Normal study">Normal study</option>
                        <option value="Infective endocarditis">
                        Infective endocarditis
                        </option>
                        <option value="Masses">Masses</option>
                        <option value="Congenital heart disease">
                        Congenital heart disease
                        </option>
                        <option value="Stress echocardiography">
                        Stress echocardiography
                        </option>
                        <option value="Contrast study">Contrast study</option>
                        <option value="Transesophageal echo">
                        Transesophageal echo
                        </option>
                        <option value="Strain study">Strain study</option>
                        <option value="3D study">3D study</option>
                        <option value="Pericardial effusion">
                        Pericardial effusion
                        </option>
                        <option value="Tamponade">Tamponade</option>
                        <option value="Pericardial constriction">
                        Pericardial constriction
                        </option>
                        <option value="Systemic diseases that affect the heart">
                        Systemic diseases that affect the heart
                        </option>
                        <option value="Post cardiac transplant">
                        Post cardiac transplant
                        </option>
                    </select>
                </div>
                <div className="col-2">
                <label htmlFor="addLogbook" className="form-label">
                    Confirm
                </label>
                <button
                    type="submit"
                    className="btn btn-primary d-grid gap-2 col-8 mx-auto"
                    id="addLogbook"
                >
                    Add
                </button>
                </div>
            </div>
        </form>
        <div className="row justify-content-center">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Date</th>
                    <th scope="col">Full supervision</th>
                    <th scope="col">Partial supervision</th>
                    <th scope="col">Pathology</th>
                </tr>
                </thead>
                <tbody>
                {logbook.map((scan, index) => {
                    const date = new Date(scan.date);
                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    return (
                      // <tr key={scan.id}>
                      <tr key={scan.logbookID}>
                        {/* <th scope="row">{scan.number}</th> */}
                        <th scope="row">{index + 1}</th>
                        <td>{formattedDate}</td>
                        <td>{scan.supervisionStatus === "Full" && "Yes"}</td>
                        <td>{scan.supervisionStatus === "Partial" && "Yes"}</td>
                        <td>{scan.pathology}</td>
                      </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default Logbook;