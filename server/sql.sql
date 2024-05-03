-- CREATE TABLE STUDENT (
--     studentID INT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     accountID INT NOT NULL,
--     phoneNumber INT NOT NULL,
--     FOREIGN KEY (accountID) REFERENCES ACCOUNT(accountID));

-- CREATE TABLE STAFF
-- (
--     staffID INT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     phoneNumber INT NOT NULL,
--     accountID INT NOT NULL,
--     FOREIGN KEY(accountID) REFERENCES ACCOUNT(accountID)
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

-- INSERT INTO LOGBOOK (logbookID , studentID, date, supervisionStatus, pathology) VALUES (1, 1, '2021-01-01', 'Full', 'Pathology 1');
-- INSERT INTO LOGBOOK (logbookID , studentID, date, supervisionStatus, pathology) VALUES (2, 1, '2021-02-01', 'Partial', 'Pathology 2');
-- INSERT INTO LOGBOOK (logbookID , studentID, date, supervisionStatus, pathology) VALUES (3, 2, '2021-02-01', 'Partial', 'Pathology 2');
SELECT * FROM LOGBOOK;
-- DROP TABLE LOGBOOK;


-- INSERT INTO ACCOUNT ( username, password, role)
-- VALUES ( 'TESTUSER', 'TESTPASSWORD', 'STUDENT');

-- INSERT INTO ACCOUNT ( username, password, role)
-- VALUES ( 'staff@unisa.edu.au', 'staff', 'STAFF');
SELECT * FROM ACCOUNT;

INSERT INTO ACCOUNT ( username, password, role)
VALUES ( 'admin@unisa.edu.au', 'admin', 'ADMIN');

