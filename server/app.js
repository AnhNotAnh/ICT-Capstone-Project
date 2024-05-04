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

//for testing login.

app.post('/validatePassword',(req,res) => {
    const {username,password} = req.body

    db.all(`select * from ACCOUNT where username = '${username}'and password ='${password}'`,(err , rows)=>{
         if (err){
            throw err;
         }   
         if(rows.length > 0){
            res.send({validation: true})
         }else{
            res.send({validation: false})
         }
    })
})

//for staff login
app.post('/validateStaff', (req, res) => {
    const { username, password } = req.body;

    db.all(`SELECT * FROM ACCOUNT WHERE username = ? AND password = ? AND role = 'STAFF'`, [username, password], (err, rows) => {
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
                        const sql = "INSERT INTO STUDENT (studentID, name, email, accountID, phoneNumber) VALUES (?, ?, ?, ?, ?)";
                        db.run(sql, [req.body.studentID, req.body.name, req.body.email, accountID ,req.body.phoneNumber], (err) => {
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
                        const sql =
                          "INSERT INTO STAFF (name, email, phoneNumber, accountID,) VALUES (?, ?, ?, ?)";
                        db.run(sql, [ req.body.name, req.body.email, req.body.phoneNumber, accountID], (err) => {
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

const PORT = process.env.PORT ?? 8081; 
app.listen(PORT, () => {
    console.log("Server running on port 8081,listening");
});
