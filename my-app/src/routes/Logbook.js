import React, {useState} from 'react';

function Logbook() {
    {/* Consider the path to have student id so that supervisor and student id access */ }
    const [supervisionStatus, setSupervisionStatus] = useState("");
    const [date, setDate] = useState("");
    const [pathology, setPathology] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Date: ", date);
        console.log("Supervision status: ", supervisionStatus);
        console.log("Pathology: ", pathology);
    }


    return (
    <div className="container">
        <h2 style={{ padding: "30px" }}>Cardiac Logbook</h2>
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
                <div className="col-4">
                    <label htmlFor="supervisionStatus" className="form-label">
                    Supervision status
                    </label>
                    <select
                    defaultValue={supervisionStatus}
                    className="form-select"
                    onSelect={(e) => setSupervisionStatus(e.target.value)}
                    id="supervisionStatus"
                    >
                    <option value="Full supervision">
                        Select status (default status is full supervision)
                    </option>
                    <option value="Full supervision">Full supervision</option>
                    <option value="Partial supervision">Partial supervision</option>
                    </select>
                </div>
                <div className="col-3">
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
                <tr>
                    <th scope="row">1</th>
                    <td>15/04/2024</td>
                    <td></td>
                    <td>Yes</td>
                    <td>ABC</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>16/04/2024</td>
                    <td>Yes</td>
                    <td></td>
                    <td>ABC</td>
                </tr>
                </tbody>
            </table>
        </div>
      </div>
    );
}

export default Logbook;