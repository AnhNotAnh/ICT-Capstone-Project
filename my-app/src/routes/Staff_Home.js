
import React,{useEffect,useState} from 'react'
import axios from 'axios';


const Staff_Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      axios.get('http://localhost:8081/getAllStudents')
          .then(response => {
              setStudents(response.data);
              setLoading(false);
          })
          .catch(error => {
              console.error('Error fetching students:', error);
              setError(error);
              setLoading(false);
          });
  }, []);

  if (loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>Error: {error.message}</p>;
  }

  return (
      <div className="container text-center">
          <h2 style={{ padding: "30px" }}>Staff Home Page</h2>
          <p>This page is for staff to search up students and to check their progress.</p>
          {students.length === 0 ? (
              <p>No students found.</p>
          ) : (
              <table className="table">
                  <thead style={{ backgroundColor: "#98C0E6" }}>
                      <tr>
                          <th style={{ color: "#003C72" }}>Student ID</th>
                          <th style={{ color: "#003C72" }}>Name</th>
                          <th style={{ color: "#003C72" }}>Email</th>
                          <th style={{ color: "#003C72" }}>Phone Number</th>
                          <th style={{ color: "#003C72" }}>ASAR Number</th>
                      </tr>
                  </thead>
                  <tbody>
                      {students.map(student => (
                          <tr key={student.studentID}>
                              <td>{student.studentID}</td>
                              <td>{student.name}</td>
                              <td>{student.email}</td>
                              <td>{student.phoneNumber}</td>
                              <td>{student.asarNumber}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          )}
      </div>
  );
};


export default Staff_Home;


