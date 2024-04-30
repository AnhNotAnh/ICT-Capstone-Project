import React, {useEffect, useState} from 'react';

function Logbook() {

    {/* Consider the path to have student id so that supervisor and student id access */ }
    const [supervisionStatus, setSupervisionStatus] = useState("full");
    const [date, setDate] = useState("");
    const [pathology, setPathology] = useState("");
    const [logbook, setLogbook] = useState([]);
    
    {/* Testing */ }
    const [studentID, setStudentID] = useState(1);
    const [logbook1, setLogbook1] = useState([]);
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
        })
        .catch((err) => {
          console.error(err.message);
        });
    }, [studentID]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Date: ", date);
        console.log("Supervision status: ", supervisionStatus);
        console.log("Pathology: ", pathology);
        setLogbook(currentLogbook => {
            return [...currentLogbook,
            { id: crypto.randomUUID() , number:currentLogbook.length + 1 , date: date, supervisionStatus: supervisionStatus, pathology: pathology },
            ];
        })
        setDate("");
        setSupervisionStatus("full");
        setPathology("");

    };

    return (
    <div className="container">
        <h2 style={{ padding: "30px" }}>Cardiac Logbook</h2>
        <form onSubmit={handleSubmit} className="new-scan-form">
            <div
                className="row justify-content-center"
                style={{ paddingBottom: "30px" }}
            >
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
                {logbook.map((scan) => {
                    const date = new Date(scan.date);
                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    return (
                    <tr key={scan.id}>
                        {/* <tr key={scan.logbookID}> */}
                        <th scope="row">{scan.number}</th>
                        {/* <th scope="row">{scan.logbookID}</th> */}
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