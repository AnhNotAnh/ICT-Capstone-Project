-- DROP TABLE STUDENT;
-- CREATE TABLE STUDENT (
--     studentID INT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     accountID INT NOT NULL,
--     phoneNumber VARCHAR(255) NOT NULL,
--     asarNumber VARCHAR(4) NOT NULL,
--     FOREIGN KEY (accountID) REFERENCES ACCOUNT(accountID));

-- DROP TABLE STAFF;
-- CREATE TABLE STAFF
-- (
--     staffID INTEGER,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     phoneNumber VARCHAR(255) NOT NULL,
--     accountID INT NOT NULL,
--     FOREIGN KEY(accountID) REFERENCES ACCOUNT(accountID),
--     PRIMARY KEY(staffID ASC)
-- );

-- CREATE TABLE SYSTEMMANAGER (
--     studentID INT,
--     staffID INT,
--     levelOfAccess INT NOT NULL,
--     PRIMARY KEY (studentID, staffID)
-- );

-- DROP TABLE ACCOUNT;
-- CREATE TABLE ACCOUNT 
-- (
--     accountID INTEGER,
--     username VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role VARCHAR(255) NOT NULL,
--     PRIMARY KEY(accountID ASC)
-- );

-- DROP TABLE LOGBOOK;
-- CREATE TABLE LOGBOOK
-- (
--     logbookID INTEGER, 
--     studentID INT NOT NULL,
--     date VARCHAR(255) NOT NULL,
--     supervisionStatus VARCHAR(255) NOT NULL,
--     pathology VARCHAR(255) NOT NULL,
--     FOREIGN KEY(studentID) REFERENCES STUDENT(studentID),
--     PRIMARY KEY(logbookID ASC)
-- );

SELECT * FROM LOGBOOK;


-- INSERT INTO ACCOUNT ( username, password, role)
-- VALUES ( 'staff@unisa.edu.au', 'staff', 'STAFF');

-- INSERT INTO ACCOUNT ( username, password, role)
-- VALUES ( 'admin@unisa.edu.au', 'admin', 'ADMIN');

SELECT * FROM ACCOUNT;

-- delete from ACCOUNT where role = 'STUDENT';
 --delete from ACCOUNT where accountID = 16;

--DROP TABLE SUPERVISOR; 
-- CREATE TABLE SUPERVISOR
-- (
--   supervisorID INTEGER,
--    name VARCHAR(255) NOT NULL,
--    email VARCHAR(255) NOT NULL UNIQUE,
--    qualification varchar(255) NOT NULL,
--    accountID INT NOT NULL,
--    asarNumber VARCHAR(4) NOT NULL,
--    FOREIGN KEY(accountID) REFERENCES ACCOUNT(accountID),
--    PRIMARY KEY(supervisorID ASC)
--);
-- delete from SUPERVISOR where supervisorID = 09;


-- CREATE TABLE SUPERVISION
-- (
--     supervisorID INTEGER,
--     studentID INTEGER,
--     isSupervised BOOLEAN NOT NULL,
--     PRIMARY KEY(supervisorID, studentID)
-- );

-- INSERT INTO SUPERVISION (supervisorID, studentID, isSupervised) VALUES ( 2, 123123123, 1);
-- DELETE FROM SUPERVISION WHERE supervisorID = 1 AND studentID = 123123123;

-- DROP TABLE MILESTONE;
-- CREATE TABLE MILESTONE
-- (
--     milestoneID INTEGER,
--     studentID INTEGER,
--     supervisorID INTEGER,
--     studentSignature VARCHAR(255) NOT NULL,
--     supervisorSignature VARCHAR(255) NOT NULL,
--     milestoneAchievement INTEGER, 
--     status BOOLEAN NOT NULL, 
--     PRIMARY KEY(milestoneID ASC)
-- );

-- DROP TABLE MILESTONEDOC;
-- CREATE TABLE MILESTONEDOC
-- (
--     milestoneID INTEGER,
--     docID INTEGER,
--     role VARCHAR(255) NOT NULL,
--     answerSectionA TEXT NOT NULL,
--     answerSectionB TEXT NOT NULL,
--     answerSectionC TEXT NOT NULL,
--     answerSectionD TEXT NOT NULL,
--     answerSectionE TEXT NOT NULL,
--     answerSectionF TEXT NOT NULL,
--     answerSectionG TEXT NOT NULL,
--     PRIMARY KEY(docID ASC)
-- );

-- DROP TABLE PLANIMPROVEMENT;
-- CREATE TABLE PLANIMPROVEMENT
-- (
--     planID INTEGER,
--     milestoneID INT,
--     planStrategy VARCHAR(255) NOT NULL,
--     comment VARCHAR(255) NOT NULL,
--     planStatus BOOLEAN NOT NULL,
--     supervisorDate VARCHAR(255) NOT NULL,
--     studentDate VARCHAR(255) NOT NULL,
--     PRIMARY KEY(planID ASC)
-- );



-- delete from MILESTONE where milestoneID = 1;


