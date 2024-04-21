import React from 'react';

function Logbook() {
    {/* Consider the path to have student id so that supervisor and student id access */}
    return (
      <div className="container">
        <div className="row justify-content-center">
          <table class="table">
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