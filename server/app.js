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
app.get('/Logbook/:studentID', (req, res) => {
    const sql = "SELECT * FROM LOGBOOK WHERE studentID = ?"
    db.all(sql, [req.params.studentID] ,(err, results) => {
        if (err) {
            console.error(err.message);
        } else {
            res.json(results);
        }
    })
});

const PORT = process.env.PORT ?? 8081; 


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

app.listen(PORT, () => {
  console.log("Server running on port 8081,listening");
});
