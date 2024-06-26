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

// Inserting logbook data into the database
app.post('/Logbook/:studentID', (req, res) => {
    const sql = "INSERT INTO LOGBOOK (studentID, date, supervisionStatus, pathology) VALUES (?, ?, ?, ?)";
    db.run(sql, [req.body.studentID, req.body.date, req.body.supervisionStatus, req.body.pathology], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: "Error in inserting logbook entry" });
        } else {
            // Use 'this.lastID' to access the auto-incremented ID of the last inserted row
            res.json({ message: "success", logbookID: this.lastID });
        }
    });
});

// Delete logbook scan data from the database
app.delete('/deleteScan/:logbookID', (req, res) => {
    const sql = "DELETE FROM LOGBOOK WHERE logbookID = ?";
    db.run(sql, [req.params.logbookID], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: "Error in deleting logbook scan" });
        } else {
            res.json({ message: "Delete scan successfully" });
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

//for staff and admin login and supervisor 
app.post('/validateStaff', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM ACCOUNT WHERE username = ? AND password = ? AND (role = 'STAFF' OR role = 'ADMIN' OR role = 'SUPERVISOR')`, [username, password], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send({ error: 'An error occurred while checking the credentials' });
        }
        if (row) {
            return res.send({ validation: true, role: row.role, accountId: row.accountID });
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
                        const sql = `INSERT INTO SUPERVISOR (name, email, qualification, accountID, asarNumber) 
                        VALUES (?, ?, ?, ?, ?) ON CONFLICT(email) 
                        DO UPDATE SET name = excluded.name,
                        qualification = excluded.qualification,
                        accountID = excluded.accountID,
                        asarNumber = excluded.asarNumber`;
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

const placeholderAccountID = 0;
const placeholderAsarNumber = '0000';

console.log('Received request to add supervisor:', req.body);

// Check if the supervisor email already exists
const checkEmailSql = "SELECT supervisorID FROM SUPERVISOR WHERE email = ?";
db.get(checkEmailSql, [email], (err, row) => {
    if (err) {
        console.error('Error checking email existence:', err.message);
        return res.status(500).json({ error: 'Error checking email existence: ' + err.message });
    }

    if (row) {
        const supervisorID = row.supervisorID;
        console.log('Supervisor ID retrieved:', supervisorID);

        // Insert the supervision link with isSupervised set to 0
        const insertSupervision = "INSERT INTO SUPERVISION (studentID, supervisorID, isSupervised) VALUES (?, ?, 0)";
        db.run(insertSupervision, [studentID, supervisorID], (err) => {
            if (err) {
                console.error('Error linking supervisor to student:', err.message);
                return res.status(500).json({ error: 'Error linking supervisor to student: ' + err.message });
            }

            console.log('Supervisor linked to student successfully');
            return res.status(200).json({ message: 'Supervisor linked to student successfully' });
        });
    } else {
        // Insert new supervisor and then link to the student
        const insertSupervisor = `
            INSERT INTO SUPERVISOR (name, email, qualification, accountID, asarNumber)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.run(insertSupervisor, [name, email, qualification, placeholderAccountID, placeholderAsarNumber], function(err) {
            if (err) {
                console.error('Error inserting supervisor:', err.message);
                return res.status(500).json({ error: 'Error adding supervisor: ' + err.message });
            }

            console.log('Supervisor inserted successfully');
            const supervisorID = this.lastID;

            const insertSupervision = "INSERT INTO SUPERVISION (studentID, supervisorID, isSupervised) VALUES (?, ?, 0)";
            db.run(insertSupervision, [studentID, supervisorID], (err) => {
                if (err) {
                    console.error('Error linking supervisor to student:', err.message);
                    return res.status(500).json({ error: 'Error linking supervisor to student: ' + err.message });
                }

                console.log('Supervisor linked to student successfully');
                return res.status(200).json({ message: 'Supervisor added and linked to student successfully' });
            });
        });
    }
});
});



//fetch the current supervisor onto the student for current supervisor page
app.get('/currentSupervisors/:studentID', (req, res) => {
    const studentID = req.params.studentID;

    const sql = `
        SELECT SUPERVISOR.name, SUPERVISOR.email, SUPERVISOR.qualification
        FROM SUPERVISOR
        JOIN SUPERVISION ON SUPERVISOR.supervisorID = SUPERVISION.supervisorID
        WHERE SUPERVISION.studentID = ? AND SUPERVISION.isSupervised = 1
    `;
    
    db.all(sql, [studentID], (err, rows) => {
        if (err) {
            console.error('Error fetching current supervisors:', err.message);
            return res.status(500).json({ error: 'Error fetching current supervisors: ' + err.message });
        }
        res.status(200).json(rows);
    });
});

//Add milestone doc to the database
//First insert the milestone and then insert the milestone doc
app.post('/submitMilestone', (req, res) => {
    const { studentID, studentSignature, supervisorID, milestoneAchievement, status, answers, role } = req.body;
    const sql = 'INSERT INTO MILESTONE (studentID, supervisorID, studentSignature, supervisorSignature , milestoneAchievement, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(sql, [studentID, supervisorID, studentSignature, 'Not signed', milestoneAchievement, status], (err) => {
        if (err) {
            console.error('Error submitting milestone:', err.message);
            return res.status(500).json({ error: 'Error submitting milestone: ' + err.message });
        }
        else {
            const getMilestoneID = "SELECT milestoneID FROM MILESTONE WHERE studentID = ? and supervisorID = ? and milestoneAchievement = ? and status = ?";
            db.all(getMilestoneID, [studentID, supervisorID, milestoneAchievement, status], (err, results) => {
            if (err) {
                console.error(err.message);
            }
            else {
                const milestoneID = results[0].milestoneID;
                res.json({ message: 'Milestone submitted successfully' });
                const insertDoc = 'INSERT INTO MILESTONEDOC (milestoneID, role, answerSectionA, answerSectionB, answerSectionC, answerSectionD, answerSectionE, answerSectionF, answerSectionG) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                db.run(insertDoc, [milestoneID, role , answers.sectionA, answers.sectionB, answers.sectionC, answers.sectionD, answers.sectionE, answers.sectionF, answers.sectionG], (err) => {
                    if (err) {
                        console.error('Error inserting milestone doc:', err.message);
                    }
                    console.log('Milestone doc inserted successfully');
                }); 
            }
            });
        }});
    })

//Check if the milestone is submited by student.
app.post('/milestoneVerification', (req, res) => {
    const {studentID, milestoneAchievement} = req.body;
    const sql = 'SELECT * FROM MILESTONE WHERE studentID = ? AND milestoneAchievement = ?';
    db.all(sql, [studentID, milestoneAchievement], (err, rows) => {
        if (err) {
            console.error('Error fetching milestone:', err.message);
            return res.status(500).json({ error: 'Error fetching milestone: ' + err.message });
        }
        else {
            if (rows.length > 0) {
                res.json({ verification: true });
            } else {
                res.json({ verification: false });
            }
        }
    });
});


//fetch the student for supervisor home page
app.get('/getSupervisedStudents/:accountId', (req, res) => {
    const accountId = req.params.accountId;

    const sql = `
        SELECT STUDENT.studentID, STUDENT.name, STUDENT.email, SUPERVISION.isSupervised, SUPERVISOR.supervisorID
        FROM STUDENT
        JOIN SUPERVISION ON STUDENT.studentID = SUPERVISION.studentID
        JOIN SUPERVISOR ON SUPERVISOR.supervisorID = SUPERVISION.supervisorID
        WHERE SUPERVISOR.accountID = ?
    `;
    
    db.all(sql, [accountId], (err, rows) => {
        if (err) {
            console.error('Error fetching supervised students:', err.message);
            return res.status(500).json({ error: 'Error fetching supervised students: ' + err.message });
        }
        res.status(200).json(rows);
    });
});


//accept student on supervisor homepage 
app.post('/acceptStudent', (req, res) => {
    const { studentID, accountId } = req.body;

    const getSupervisorIDSql = "SELECT supervisorID FROM SUPERVISOR WHERE accountID = ?";
    db.get(getSupervisorIDSql, [accountId], (err, supervisor) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching supervisor' });
        }

        const supervisorID = supervisor.supervisorID;
        const updateSupervisionSql = "UPDATE SUPERVISION SET isSupervised = 1 WHERE studentID = ? AND supervisorID = ?";

        db.run(updateSupervisionSql, [studentID, supervisorID], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Error updating supervision' });
            }
            res.status(200).json({ message: 'Student accepted successfully' });
        });
    });
});



//rejecting students
app.post('/rejectStudent', (req, res) => {
    const { studentID, accountId } = req.body;

    const getSupervisorIDSql = "SELECT supervisorID FROM SUPERVISOR WHERE accountID = ?";
    db.get(getSupervisorIDSql, [accountId], (err, supervisor) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching supervisor' });
        }

        const supervisorID = supervisor.supervisorID;
        const deleteSupervisionSql = "DELETE FROM SUPERVISION WHERE studentID = ? AND supervisorID = ?";

        db.run(deleteSupervisionSql, [studentID, supervisorID], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Error updating supervision' });
            }
            res.status(200).json({ message: 'Student rejected successfully' });
        });
    });
});

//milestone for supervisor page
app.get('/getSupervisorMilestone/:milestoneID', (req, res) => {
    const milestoneID = req.params.milestoneID;
    let studentObj = {};
    let supervisorObj = {};
    let docObj = {};
    let studentID = 0;
    let supervisorID = 0;
    const sql = `
        SELECT MILESTONE.studentID, MILESTONE.studentSignature, MILESTONE.supervisorID, MILESTONE.milestoneAchievement, MILESTONEDOC.answerSectionA, MILESTONEDOC.answerSectionB, MILESTONEDOC.answerSectionC, MILESTONEDOC.answerSectionD, MILESTONEDOC.answerSectionE, MILESTONEDOC.answerSectionF, MILESTONEDOC.answerSectionG
        FROM MILESTONE
        JOIN MILESTONEDOC ON MILESTONE.milestoneID = MILESTONEDOC.milestoneID
        WHERE MILESTONE.milestoneID = ? AND MILESTONE.status = 0 AND MILESTONEDOC.role = "STUDENT"`;
    //get the milestone details: studentID, supervisorID, milestoneAchievement, all answers from the milestone doc
    db.get(sql, [milestoneID], (err, row) => {
        if (err) {
            console.error('Error fetching milestone:', err.message);
            return res.status(500).json({ error: 'Error fetching milestone: ' + err.message });
        }
        else if (!row) {
            console.log('Milestone not found or supervisor milestone already submitted');
        }
        else {
        studentID = row.studentID;
        supervisorID = row.supervisorID;
        docObj = {studentSignature: row.studentSignature, milestoneAchievement: row.milestoneAchievement , sectionA: row.answerSectionA, sectionB: row.answerSectionB, sectionC: row.answerSectionC, sectionD: row.answerSectionD, sectionE: row.answerSectionE, sectionF: row.answerSectionF, sectionG: row.answerSectionG};
        //get the student details: name, email, studentID
        const sql2 = 'SELECT * FROM STUDENT WHERE studentID = ?';
        db.get(sql2, [studentID], (err, studentrow) => {
            if (err) {
                console.error('Error fetching student:', err.message);
                return res.status(500).json({ error: 'Error fetching student: ' + err.message });
            }
            studentObj = {name: studentrow.name, email: studentrow.email, studentID: studentrow.studentID};
            //get the supervisor details: name, email, supervisorID 
            const sql3 = 'SELECT * FROM SUPERVISOR WHERE supervisorID = ?';
            db.get(sql3, [supervisorID], (err, supervisorrow) => {
                if (err) {
                    console.error('Error fetching supervisor:', err.message);
                    return res.status(500).json({ error: 'Error fetching supervisor: ' + err.message });
                }
                supervisorObj = {name: supervisorrow.name, email: supervisorrow.email, supervisorID: supervisorrow.supervisorID, accountID: supervisorrow.accountID};
                
                res.json({studentObj: studentObj, supervisorObj: supervisorObj, docObj: docObj});
            });
        });
    }});
});

//Update milestone status, add supervisor signature, add milestone doc, and create comment for plan improvement
app.post('/updateMilestone', (req, res) => {
    const { milestoneID, studentID, supervisorSignature, studentSignature, supervisorID, milestoneAchievement, status, answers, supervisorComment, planStatus, role, supervisorDate } = req.body;
    const sql = `UPDATE MILESTONE SET supervisorSignature = ?, status = ? 
    WHERE milestoneID = ?`;
    db.run(sql, [supervisorSignature, status, milestoneID], (err) => {
        if (err) {
            console.error('Error updating milestone:', err.message);
            return res.status(500).json({ error: 'Error updating milestone: ' + err.message });
        }
        else {
            console.log( 'Milestone submitted successfully' );
            const insertDoc = 'INSERT INTO MILESTONEDOC (milestoneID, role, answerSectionA, answerSectionB, answerSectionC, answerSectionD, answerSectionE, answerSectionF, answerSectionG) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.run(insertDoc, [milestoneID, role , answers.sectionA, answers.sectionB, answers.sectionC, answers.sectionD, answers.sectionE, answers.sectionF, answers.sectionG], (err) => {
                if (err) {
                    console.error('Error inserting milestone doc:', err.message);
                }
                else {
                console.log('Milestone doc inserted successfully');
                const insertComment = 'INSERT INTO PLANIMPROVEMENT (milestoneID, planStrategy, comment, planStatus, supervisorDate, studentDate) VALUES (?, ?, ?, ?, ?, ?)';
                db.run(insertComment, [milestoneID, '', supervisorComment, planStatus, supervisorDate, ''], (err) => {
                    if (err) {
                        console.error('Error inserting comment:', err.message);
                    }
                    res.json({ message: 'Your comment stored successfully' });
                });
                }
            }); 
        }});
    })

//milestone for supervisor and student
app.get('/getSSMilestone/:milestoneID', (req, res) => {
    const milestoneID = req.params.milestoneID;
    let studentObj = {};
    let supervisorObj = {};
    let milestoneObj = {};
    let studentID = 0;
    let supervisorID = 0;
    const sql = `
        SELECT * FROM MILESTONE
        WHERE MILESTONE.milestoneID = ?`;
    //get the milestone details: studentID, supervisorID, milestoneAchievement, all answers from the milestone doc
    db.get(sql, [milestoneID], (err, row) => {
        if (err) {
            console.error('Error fetching milestone:', err.message);
            return res.status(500).json({ error: 'Error fetching milestone: ' + err.message });
        }
        else if (!row) {
            console.log('Milestone not found or supervisor milestone already submitted');
        }
        else {
        studentID = row.studentID;
        supervisorID = row.supervisorID;
        milestoneObj = {studentSignature: row.studentSignature, supervisorSignature: row.supervisorSignature, milestoneAchievement: row.milestoneAchievement, status: row.status};
        //get the student details: name, email, studentID, doc answers
        const sql2 = `SELECT STUDENT.name, STUDENT.email, STUDENT.studentID, MILESTONEDOC.answerSectionA,
        MILESTONEDOC.answerSectionB, MILESTONEDOC.answerSectionC, MILESTONEDOC.answerSectionD, MILESTONEDOC.answerSectionE, 
        MILESTONEDOC.answerSectionF, MILESTONEDOC.answerSectionG FROM STUDENT 
        JOIN MILESTONE ON STUDENT.studentID = MILESTONE.studentID
        JOIN MILESTONEDOC ON MILESTONE.milestoneID = MILESTONEDOC.milestoneID
        WHERE MILESTONE.milestoneID = ? AND MILESTONEDOC.role = "STUDENT"`;
        db.get(sql2, [milestoneID], (err, studentrow) => {
            if (err) {
                console.error('Error fetching student:', err.message);
                return res.status(500).json({ error: 'Error fetching student: ' + err.message });
            }
            studentObj = {name: studentrow.name, email: studentrow.email, studentID: studentrow.studentID, sectionA: studentrow.answerSectionA,
                sectionB: studentrow.answerSectionB, sectionC: studentrow.answerSectionC, sectionD: studentrow.answerSectionD, sectionE: 
                studentrow.answerSectionE, sectionF: studentrow.answerSectionF, sectionG: studentrow.answerSectionG};
            //get the supervisor details: name, email, supervisorID, doc answers
            const sql3 = `SELECT SUPERVISOR.name, SUPERVISOR.email, SUPERVISOR.supervisorID, MILESTONEDOC.answerSectionA,
            MILESTONEDOC.answerSectionB, MILESTONEDOC.answerSectionC, MILESTONEDOC.answerSectionD, MILESTONEDOC.answerSectionE, 
            MILESTONEDOC.answerSectionF, MILESTONEDOC.answerSectionG FROM SUPERVISOR 
            JOIN MILESTONE ON SUPERVISOR.supervisorID = MILESTONE.supervisorID
            JOIN MILESTONEDOC ON MILESTONE.milestoneID = MILESTONEDOC.milestoneID
            WHERE MILESTONE.milestoneID = ? AND MILESTONEDOC.role = "SUPERVISOR"`;
            db.get(sql3, [milestoneID], (err, supervisorrow) => {
                if (err) {
                    console.error('Error fetching supervisor:', err.message);
                    return res.status(500).json({ error: 'Error fetching supervisor: ' + err.message });
                }
                supervisorObj = {name: supervisorrow.name, email: supervisorrow.email, supervisorID: supervisorrow.supervisorID, 
                accountID: supervisorrow.accountID, sectionA: supervisorrow.answerSectionA, sectionB: supervisorrow.answerSectionB, 
                sectionC: supervisorrow.answerSectionC, sectionD: supervisorrow.answerSectionD, sectionE: supervisorrow.answerSectionE, 
                sectionF: supervisorrow.answerSectionF, sectionG: supervisorrow.answerSectionG};
                res.json({studentObj: studentObj, supervisorObj: supervisorObj, docObj: milestoneObj});
            });
        });
    }});
});

//get supervisor comments, date consented and plan ID
app.get('/getSupervisorPlan/:milestoneID', (req, res) => {
    const milestoneID = req.params.milestoneID;
    const sql = `
        SELECT planID, comment, supervisorDate FROM PLANIMPROVEMENT
        WHERE PLANIMPROVEMENT.milestoneID = ?`;
    //get the milestone details: studentID, supervisorID, milestoneAchievement, all answers from the milestone doc
    db.get(sql, [milestoneID], (err, row) => {
        if (err) {
            console.error('Error fetching comment:', err.message);
            return res.status(500).json({ error: 'Error fetching comment: ' + err.message });
        }
        res.json(row);
    });
});

//update the plan improvement
app.post('/updatePlan', (req, res) => {
    const { planID, planStrategy, studentDate, planStatus } = req.body;
    const sql = `UPDATE PLANIMPROVEMENT SET planStrategy = ?, planStatus = ?, studentDate = ?
    WHERE planID = ?`;
    db.run(sql, [planStrategy, planStatus, studentDate, planID], (err) => {
        if (err) {
            console.error('Error updating plan:', err.message);
            return res.status(500).json({ error: 'Error updating plan: ' + err.message });
        }
        else {
            res.json({ message: 'PlanForImprovement update successfully'});
        }});
    })

//get the plan improvement
app.get('/getPlan/:milestoneID', (req, res) => {
    const milestoneID = req.params.milestoneID;
    const sql = `
        SELECT * FROM PLANIMPROVEMENT
        WHERE PLANIMPROVEMENT.milestoneID = ?`;
    //get the milestone details: studentID, supervisorID, milestoneAchievement, all answers from the milestone doc
    db.get(sql, [milestoneID], (err, row) => {
        if (err) {
            console.error('Error fetching comment:', err.message);
            return res.status(500).json({ error: 'Error fetching comment: ' + err.message });
        }
        res.json(row);
    });
});

//Get all completed milestones doc of a student under a supervisor
app.get('/getMilestones/:studentID/:supervisorID', (req, res) => {
    const { studentID, supervisorID } = req.params;
    const sql = `
        SELECT MILESTONE.milestoneID, MILESTONE.milestoneAchievement FROM MILESTONE
        JOIN PLANIMPROVEMENT ON MILESTONE.milestoneID = PLANIMPROVEMENT.milestoneID
        WHERE PLANIMPROVEMENT.planStatus = 1 AND MILESTONE.studentID = ? AND MILESTONE.supervisorID = ?
        `;
    db.all(sql, [studentID, supervisorID], (err, rows) => {
        if (err) {
            console.error('Error fetching milestones:', err.message);
            return res.status(500).json({ error: 'Error fetching milestones: ' + err.message });
        }
        else if (rows.length === 0) {
            console.log('No milestones found');
        }
        res.json(rows);
    });
});

//Check if the section A milestone doc is submited by student.
app.get('/checkSupervisorMilestone/:studentID/:supervisorID', (req, res) => {
    const { studentID, supervisorID } = req.params;
    const sql = `
        SELECT milestoneID, milestoneAchievement FROM MILESTONE
        WHERE studentID = ? AND supervisorID = ? AND status = 0`;
    db.get(sql, [studentID, supervisorID], (err, row) => {
        if (err) {
            console.error('Error fetching milestones:', err.message);
            return res.status(500).json({ error: 'Error fetching milestones: ' + err.message });
        }
        res.json(row);
    });
});

//Check if the section B milestone doc is submited by supervisor which mean the plan page is ready for student to fill in.
app.get('/checkStudentPlan/:studentID', (req, res) => {
    const { studentID } = req.params;
    const sql = `
        SELECT MILESTONE.milestoneID FROM MILESTONE
        JOIN PLANIMPROVEMENT ON MILESTONE.milestoneID = PLANIMPROVEMENT.milestoneID
        WHERE MILESTONE.studentID = ? AND MILESTONE.status = 1 AND PLANIMPROVEMENT.planStatus = 0`;
    db.get(sql, [studentID], (err, row) => {
        if (err) {
            console.error('Error fetching milestones:', err.message);
            return res.status(500).json({ error: 'Error fetching milestones: ' + err.message });
        }
        else if (!row) {
            res.json({ milestoneID: 0});
        }
        else
        {res.json({ milestoneID : row.milestoneID});}
    });
});


//FETCH STUDENTS FROM STUDENT DATABASE FOR STAFF HOMEPAGE
app.get('/getAllStudents', (req, res) => {
    const sql = "SELECT * FROM STUDENT";

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching all students:', err.message);
            return res.status(500).json({ error: 'Error fetching all students: ' + err.message });
        }
        res.status(200).json(rows);
    });
});

//Get all completed milestones doc for a student 
app.get('/getStudentMilestones/:studentID', (req, res) => {
    const { studentID } = req.params;
    const sql = `
        SELECT MILESTONE.milestoneID, MILESTONE.milestoneAchievement FROM MILESTONE
        JOIN PLANIMPROVEMENT ON MILESTONE.milestoneID = PLANIMPROVEMENT.milestoneID
        WHERE PLANIMPROVEMENT.planStatus = 1 AND MILESTONE.studentID = ? ORDER BY MILESTONE.milestoneAchievement
        `;
    db.all(sql, [studentID], (err, rows) => {
        if (err) {
            console.error('Error fetching milestones:', err.message);
            return res.status(500).json({ error: 'Error fetching milestones: ' + err.message });
        }
        else if (rows.length === 0) {
            console.log('No milestones found');
        }
        res.json(rows);
    });
});


//Check if the milestone is finalised. 
app.get('/checkMilestoneCompleted/:studentID/:milestoneAchievement', (req, res) => {
    const { studentID, milestoneAchievement } = req.params;
    const sql = `
        SELECT * FROM MILESTONE
        JOIN PLANIMPROVEMENT ON MILESTONE.milestoneID = PLANIMPROVEMENT.milestoneID
        WHERE PLANIMPROVEMENT.planStatus = 1 AND MILESTONE.studentID = ? AND MILESTONE.milestoneAchievement = ? ORDER BY MILESTONE.milestoneAchievement
        `;
    db.get(sql, [studentID, milestoneAchievement], (err, row) => {
        if (err) {
            console.error('Error fetching milestones:', err.message);
            return res.status(500).json({ error: 'Error fetching milestones: ' + err.message });
        }
        else if (!row) {
            //console.log('No completed milestones found');
            res.json({ verification: false });
        }
        else {
            res.json({ verification: true });
        }
    });
});

//Get each pathology and its count for a student
app.get('/PathologySummary/:studentID', (req, res) => {
    const sql = "SELECT pathology, COUNT(logbookID) AS count FROM LOGBOOK WHERE studentID = ? GROUP BY pathology";
    db.all(sql, [req.params.studentID], (err, results) => {
        if (err) {
            console.error(err.message);
            // Send a 500 Internal Server Error response if there's a database error
            res.status(500).send('Internal server error');
        } else {
            // Send the results back with a 200 OK status code
            res.status(200).json(results);
            }
        }
    )
});

const PORT = process.env.PORT ?? 8081; 
app.listen(PORT, () => {
    console.log("Server running on port 8081, listening for requests..");
});
