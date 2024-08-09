import React, { useState } from 'react';
import emailjs from '@emailjs/browser'
import './Footer.css'

const Footer = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userMessage: '',});

    const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData((prevData) => ({
         ...prevData,
         [name]: value,
       }));
     };

     const handleSubmit = (e) => {
       e.preventDefault();
   
       const serviceID = 'karekezi';
       const templateID = 'template_ii04bkd';
       const userID = '8C7imFdyzAIyRuYDD';
   
       emailjs.send(serviceID, templateID, formData, userID)
         .then((response) => {
           console.log('SUCCESS!', response.status, response.text);
           alert('Message sent successfully!');
           setFormData({ userName: '', userEmail: '', userMessage: '' });
         })
         .catch((error) => {
           console.error('FAILED...', error);
           alert('Failed to send message. Please try again.');
         });
     };
  return (
    <div className='footer'>
      <div className='footers'>
      <div className='left-footer'>
        <h1>let's <br />talk here</h1>
         <div className='talk'>
         <form onSubmit={handleSubmit}>
         <div className="first">
         <input type="text" name="userName"id='userName' value={formData.userName} placeholder="Your Name"onChange={handleChange} required />
         <input type="email" name="userEmail"id='userEmail' value={formData.userEmail} placeholder="Your Email"onChange={handleChange} required />

         </div>
         <div className="text-area">
         <textarea name="userMessage"id='userMessage' value={formData.userMessage} rows="6" placeholder="Message"onChange={handleChange}></textarea>
         </div>
         <button type="submit" className="submit">Send Message</button>
         </form>
         </div>
      </div>
      <div className='right-footer'></div>
      </div>
        
      
    </div>
  )
}

export default Footer
