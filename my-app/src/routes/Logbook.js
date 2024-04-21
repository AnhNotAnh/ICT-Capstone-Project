import React, {useState} from 'react';

function Logbook() {
    {/* Consider the path to have student id so that supervisor and student id access */ }
    const [supervisionStatus, setSupervisionStatus] = useState("full");
    const [date, setDate] = useState("");
    const [pathology, setPathology] = useState("");
    const [logbook, setLogbook] = useState([]);

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
                    value={supervisionStatus}
                    className="form-select"
                    onChange={e => setSupervisionStatus(e.target.value)}
                    id="supervisionStatus"
                    required
                    >
                    <option value="">
                        Please select status
                    </option>
                    <option value="Full">Full supervision</option>
                    <option value="Partial">Partial supervision</option>
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
                {logbook.map(scan => {
                    return(
                    <tr key={scan.id}>
                      <th scope="row">{scan.number}</th>
                      <td>{scan.date}</td>
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