import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';


const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [emailTo, setEmailTo] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSumit = (e) => {
        e.preventDefault();
        
        const serviceID = process.env.REACT_APP_SERVICE_ID;
        const templateID = process.env.REACT_APP_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_PUBLISH_KEY;

        const emailParams = {
        from_name: name,
        from_email: email,
        to_email: emailTo,
        to_name: 'Your Supervisor name',
        message: message
        }

        emailjs.send(serviceID, templateID, emailParams, publicKey)
        .then(response => {
            console.log('SUCCESS!', response.status, response.text);
            setName('');
            setEmail('');
            setEmailTo('');
            setMessage('');
        })
        .catch(error => {
            console.log('FAILED...', error);
        });
    }

  return (
    <div>
        <form onSubmit={handleSumit}>
            <div className="row justify-content-center">
                <div className="col-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> 
                </div>
                <div className="col-3">
                    <label htmlFor="Supervisor">Supervisor's email:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Supervisor"
                        required
                        placeholder="Supervisor's Email here"
                        value={emailTo}
                        onChange={(e) => setEmailTo(e.target.value)}
                    /> 
                </div>
                <div className="col-3">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /> 
                </div>
                <div className="col-3">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        className="form-control"
                        cols="30"
                        rows="10"
                        id="text"
                        required
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    /> 
                </div>
            </div> 
            <button type="submit" className="btn btn-primary">Send Email</button>
        </form>
    </div>
  )
}

export default EmailForm
