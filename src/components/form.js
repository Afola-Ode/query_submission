import React, { useState } from "react";
import axios from "axios";
import loading from "../images/loading.gif"

function ContactForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name,
      email,
      subject,
      message,
    };

    // Validate input fields
    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
      return;
    }
    if (!message) {
      setMessageError("Message is required");
      return;
    }

    setFormStatus("submitting");
    axios
      .post(
        "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
        data
      )
      .then(() => {
        setFormStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setNameError(null);
        setEmailError(null);
        setMessageError(null);
      })
      .catch(() => {
        setFormStatus("error");
      });
  };

  return (
    <div className="form-container ">
      {formStatus === "success" && (
        <p className='text-green'>Your message has been sent.</p>
      )}
      {formStatus === "error" && (
        <p className='text-red'>
          There was an error sending your message. Please try again later.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor='name'>Name*</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {!name && <p className='text-red'>Name is required</p>}
          </div>
        <div>
          <label htmlFor='email'>Email*</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {!email && <p className='text-red'>Email is required</p>}
          {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
            <p className='text-red'>Invalid email address</p>
          )}
        </div>
        <div>
          <label htmlFor='subject'>Subject</label>
          <input
            type='text'
            id='subject'
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='message'>Message*</label>
          <textarea
            id='message'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          {!message && <p className='text-red-500'>Message is required</p>}
        </div>
        <button type='submit'>
          {formStatus === "submitting" ? (<img src ={loading} className="loading"/>) : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
