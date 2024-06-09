# ICT-Capstone-Project
Logbook website is designed for Medical Sonography student who has logged their scans manually into logbook. 
The project goal is to allow the cardiac sonography students to digitally log their scans into the logbook site and link their clinical training supervisor to oversee their logbook. At set milestones, it will then automate the delivery of emails to the supervisor to sign off on each milestone and give staff access to ensure the milestone has been met.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contact](#contact)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/AnhNotAnh/ICT-Capstone-Project
    ```

2. **Install dependencies in both server and frontend(my-app)**
    First terminal
    ```bash
    cd your repo
    cd server
    npm install
    ```
    Second terminal
    ```bash
    cd my-app
    npm install
    ```

3. **Create table for database**
    Install sqlite3 extension for your IDE so that we can run database inside IDE
    Run sql.sql for table creation if needed
    

## Usage

1. **Start the development web**:
    ```bash
    cd my-app
    npm start
    ```

2. **Start the server**
    ```bash
    cd server
    node app.js

2. **Open your browser and visit**:
    ```
    http://localhost:3000
    ```

## Features

- Login and register an account for student and supervisor
- Log scan in digital logbook
- Link supervisor with student (student invite supervisor; supervisor accept or reject student's invitation)
- Get notified when student reach milestone
- Allow student and supervisor to gradually finish milestone document as student and supervisor take turn to finish partial of milestone document (3 documents: self-appraisel(student), performance appraisel(supervisor) and student improvement plan(student)).
- Send email notification
- View milestone documents

## Contact

Duy Quoc Anh Nguyen - [Outlook](ngudy105@mymail.unisa.edu.au)
Rjin Reju - [Outlook](rijyy001@mymail.unisa.edu.au)

Project link: [Github](https://github.com/AnhNotAnh/ICT-Capstone-Project)