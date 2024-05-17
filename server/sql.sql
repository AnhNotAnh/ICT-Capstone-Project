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

-- CREATE TABLE LOGBOOK
-- (
--     logbookID INT,
--     studentID INT NOT NULL,
--     date VARCHAR(255) NOT NULL,
--     supervisionStatus VARCHAR(255) NOT NULL,
--     pathology VARCHAR(255) NOT NULL,
--     FOREIGN KEY(studentID) REFERENCES STUDENT(studentID),
--     PRIMARY KEY(logbookID ASC)
-- );

SELECT * FROM LOGBOOK;
-- DROP TABLE LOGBOOK;


-- INSERT INTO ACCOUNT ( username, password, role)
-- VALUES ( 'TESTUSER', 'TESTPASSWORD', 'STUDENT');

-- INSERT INTO ACCOUNT ( username, password, role)
-- VALUES ( 'staff@unisa.edu.au', 'staff', 'STAFF');

-- INSERT INTO ACCOUNT ( username, password, role)
-- VALUES ( 'admin@unisa.edu.au', 'admin', 'ADMIN');

SELECT * FROM ACCOUNT;

-- delete from ACCOUNT where username = 'anhtest';
-- delete from STUDENT where accountID = 4;

-- DROP TABLE SUPERVISOR; 
-- CREATE TABLE SUPERVISOR
-- (
--     supervisorID INTEGER,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     qualification varchar(255) NOT NULL,
--     accountID INT NOT NULL,
--     asarNumber VARCHAR(4) NOT NULL,
--     FOREIGN KEY(accountID) REFERENCES ACCOUNT(accountID),
--     PRIMARY KEY(supervisorID ASC)
-- );

-- INSERT INTO SUPERVISOR (name, email, qualification, accountID) VALUES ( 'Dr. John', 'john@abc.com', 'PhD', 5);

-- CREATE TABLE SUPERVISION
-- (
--     supervisorID INTEGER,
--     studentID INTEGER,
--     isSupervised BOOLEAN NOT NULL,
--     PRIMARY KEY(supervisorID, studentID)
-- );
