import React from "react";
import { Link, useParams } from "react-router-dom";

const CoursePage = () => {
  const { studentID } = useParams();

    return (
    <div className="container text-center">
      <h2 style={{ padding: "30px" }}>Cardiac Logbook</h2>
      <div className="row justify-content-center">
        {/* <div className="col-md-4 align-self-center"> */}
        <div className="col-md-4">
          <div className="course-section">
            <table className="table">
              <thead style={{ backgroundColor: "#98C0E6" }} className="table">
                <tr>
                  <th style={{ color: "#003C72" }} scope="col">
                    Section
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-grid gap-2 col-8 mx-auto">
                      <Link to={`/Logbook/${studentID}`} className="btn btn-outline-primary">
                        Manage Logbook
                      </Link>
                      <button className="btn btn-outline-primary" type="button">
                        Upload Report
                      </button>
                      <button className="btn btn-outline-primary" type="button">
                        Upload Manual Logbook
                      </button>
                      <button className="btn btn-outline-primary" type="button">
                        View Summary
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <div className="course-info">
            {/* Course info content */}
            <p>
              Welcome to the Cardiac Logbook. Here you can upload your scans,
              reports and view your summary.
            </p>
            <h6>Important Information:</h6>
            <div style={{ textAlign: "left" }}>
              <ul>
                <li>
                  This is an important document. Passing the logbook is
                  essential to be eligible to graduate.
                </li>
                <li>
                  Students are required to document a minimum of 2000 scans to
                  be eligible to sit for their OSCEs (Objective Structured
                  Clinical Examination).
                </li>
                <li>
                  Following completion, the logbook will be checked carefully by
                  the academics in the Medical Sonography Program at University
                  of South Australia.
                </li>
                <li>
                  Students with incomplete or inadequate logbook documentation
                  will not be allowed to pass the Clinical Sonography Portfolio
                  course and hence be unable to complete the Program.
                </li>
                <li>
                  If this document is lost, students will be asked to redo the
                  logbook again.
                </li>
                <li>
                  To ensure backup of the logbook, students are advised to scan
                  the logbook pages and upload them to their e-portfolio as they
                  progress through their clinical scanning.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center"></div>
    </div>
  );
};
export default CoursePage;
