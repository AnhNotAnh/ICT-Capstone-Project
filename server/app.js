import cors from "cors";
import express from "express";
import sqlite3 from "sqlite3";

//const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE,
(err) => {if (err) {console.error(err.message);}}
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());


//for testing purposes
app.get('/Logbook', (req, res) => {
    const sql = "SELECT * FROM LOGBOOK"
    db.all(sql ,(err, results) => {
        if (err) {
            console.error(err.message);
        } else {
            res.json(results);
        }
    })
});

app.get('/Logbook/:studentID', (req, res) => {
    const sql = "SELECT * FROM LOGBOOK WHERE studentID = ? ORDER BY date"
    db.all(sql, [req.params.studentID] ,(err, results) => {
        if (err) {
            console.error(err.message);
        } else {
            res.json(results);
        }
    })
});

app.post('/Logbook/studentID', (req, res) => {
    const sql = "INSERT INTO LOGBOOK (logbookID, studentID, date, supervisionStatus, pathology) VALUES (?, ?, ?, ?, ?)";
    db.run(sql, [req.body.logbookID, req.body.studentID, req.body.date, req.body.supervisionStatus, req.body.pathology], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            res.json({ message: "success" });
        }
    });
});

//for testing student login.
app.post('/validateStudent',(req,res) => {
    const {username,password} = req.body

    db.all(`SELECT * FROM ACCOUNT JOIN STUDENT ON ACCOUNT.accountID = STUDENT.accountID
        WHERE username = ? AND password = ? AND role = 'STUDENT'`, [username, password], (err, rows) => {
         if (err){
            console.error(err.message);
            return res.status(500).send({error: 'An error occured'});
         }   

         if(rows.length > 0){
            res.json({ validation: true, studentID: rows[0].studentID });
         }else{
            res.send({validation: false});
         }
    });
});

//for staff and admin login
app.post('/validateStaff', (req, res) => {
    const { username, password } = req.body;

    db.all(`SELECT * FROM ACCOUNT WHERE username = ? AND password = ? AND (role = 'STAFF' OR role = 'ADMIN' OR role = 'SUPERVISOR')`, [username, password], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send({ error: 'An error occurred while checking the credentials' });
        }
        if (rows.length > 0) {
            return res.send({ validation: true, role: 'STAFF' });
        } else {
            return res.send({ validation: false });
        }
    });
});


//for registration of student
app.post('/registerStudent', (req, res) => {
    const insertAcc = "INSERT INTO ACCOUNT (username, password, role) VALUES (?, ?, ?)";
    db.run(insertAcc, [req.body.username, req.body.password, req.body.role], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            const getAccID = "SELECT accountID FROM ACCOUNT WHERE username = ? and password = ?";
            db.all(getAccID, [req.body.username, req.body.password], (err, results) => {
            if (err) {
                console.error(err.message);
            } else {
                    if (results.length > 0) {
                        const accountID = results[0].accountID;
                        // Now can use accountID to insert data into your student table
                        const sql = "INSERT INTO STUDENT (studentID, name, email, accountID, phoneNumber, asarNumber) VALUES (?, ?, ?, ?, ?, ?)";
                        db.run(sql, [req.body.studentID, req.body.name, req.body.email, accountID ,req.body.phoneNumber, req.body.asarNumber], (err) => {
                            if (err) {
                                console.error(err.message);
                            } else {
                                res.json({ message: "Student registration success" });
                            }
                        });  
                    } else {
                    res.json({ message: "No account found with the provided username and password" });
                    }
                }
            });
                }
            });       
});

//for registration of supervisor
app.post('/registerSupervisor', (req, res) => {
    const insertAcc = "INSERT INTO ACCOUNT (username, password, role) VALUES (?, ?, ?)";
    db.run(insertAcc, [req.body.username, req.body.password, req.body.role], (err) => {
        if (err) {
            console.error(err.message);
        } else {
            const getAccID = "SELECT accountID FROM ACCOUNT WHERE username = ? and password = ?";
            db.all(getAccID, [req.body.username, req.body.password], (err, results) => {
            if (err) {
                console.error(err.message);
            } else {
                    if (results.length > 0) {
                        const accountID = results[0].accountID;
                        // Now can use accountID to insert data into your student table
                        const sql = "INSERT INTO SUPERVISOR (name, email, qualification, accountID, asarNumber) VALUES (?, ?, ?, ?, ?)";
                        db.run(sql, [ req.body.name, req.body.email, req.body.qualification, accountID, req.body.asarNumber], (err) => {
                            if (err) {
                                console.error(err.message);
                            } else {
                                res.json({ message: "Supervisor registration success" });
                            }
                        });  
                    } else {
                    res.json({ message: "No account found with the provided username and password" });
                    }
                }
            });
                }
            });       
});

app.get('/getStudent/:studentID', (req, res) => {
    const sql = "SELECT name, email FROM STUDENT WHERE studentID = ?"
    db.all(sql, [req.params.studentID], (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Database error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json({ studentName: results[0].name, studentEmail: results[0].email });
        }
    });
})


app.get('/getSupervision/:studentID', (req, res) => {
    const sql = "SELECT SUPERVISION.supervisorID FROM STUDENT JOIN SUPERVISION ON STUDENT.studentID = SUPERVISION.studentID WHERE SUPERVISION.studentID = ? AND SUPERVISION.isSupervised = 1"
    db.all(sql, [req.params.studentID], (err, results) => {
        if (err) {
            console.error(err.message);
        } else {
            if (results.length === 0) {
                console.error("No supervision found");
            } else {
                const supervisorIDs = results.map(result => result.supervisorID);
                const sql2 = `SELECT * FROM SUPERVISOR WHERE supervisorID IN (${supervisorIDs.join(',')})`;
                db.all(sql2, [], (err2, supervisorResults) => {
                    if (err2) {
                        console.error(err2.message);
                    } else {
                        res.json(supervisorResults);
                    }
                });
            }
        }
    });
});


//testing for linking student and supervisor from supervisor detail page

app.post('/addSupervisor', (req, res) => {
    const { studentID, name, email, qualification } = req.body;

    // Use placeholder values for accountID and asarNumber
    const placeholderAccountID = 0;
    const placeholderAsarNumber = '0000';

    // Log the incoming request data
    console.log('Received request to add supervisor:', req.body);

    // SQL to insert or update the supervisor
    const insertSupervisor = `
        INSERT INTO SUPERVISOR (name, email, qualification, accountID, asarNumber)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(email) DO UPDATE SET 
        name = excluded.name,
        qualification = excluded.qualification
    `;
    
    // Execute the SQL to insert or update the supervisor
    db.run(insertSupervisor, [name, email, qualification, placeholderAccountID, placeholderAsarNumber], function(err) {
        if (err) {
            console.error('Error inserting/updating supervisor:', err.message);
            return res.status(500).json({ error: 'Error adding or updating supervisor: ' + err.message });
        }

        console.log('Supervisor inserted/updated successfully');

        // SQL to get the supervisorID of the newly inserted/updated supervisor
        const getSupervisorID = "SELECT supervisorID FROM SUPERVISOR WHERE email = ?";
        db.get(getSupervisorID, [email], (err, row) => {
            if (err) {
                console.error('Error retrieving supervisor ID:', err.message);
                return res.status(500).json({ error: 'Error retrieving supervisor ID: ' + err.message });
            }

            if (row) {
                const supervisorID = row.supervisorID;
                console.log('Supervisor ID retrieved:', supervisorID);

                // SQL to link the supervisor to the student
                const insertSupervision = "INSERT INTO SUPERVISION (studentID, supervisorID, isSupervised) VALUES (?, ?, ?)";

                // Execute the SQL to link the supervisor to the student
                db.run(insertSupervision, [studentID, supervisorID, true], (err) => {
                    if (err) {
                        console.error('Error linking supervisor to student:', err.message);
                        return res.status(500).json({ error: 'Error linking supervisor to student: ' + err.message });
                    }

                    console.log('Supervisor linked to student successfully');
                    return res.status(200).json({ message: 'Supervisor added and linked to student successfully' });
                });
            } else {
                console.error('Supervisor ID not found after insertion');
                return res.status(500).json({ error: 'Supervisor ID not found after insertion' });
            }
        });
    });
});

const PORT = process.env.PORT ?? 8081; 
app.listen(PORT, () => {
    console.log("Server running on port 8081,listening");
});
