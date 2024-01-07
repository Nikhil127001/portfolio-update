import axios from 'axios'
import React, { useState } from 'react'
import { Image } from 'react-bootstrap';
import loadingGif  from '../loading.gif'

const ContactPageComponent = () => {
  const [message , setMessage] = useState({name : '' , email : '' , subject : '' , message : ''})
  const[displayMessage , setDisplayMessage] = useState(true);
  const [alert , setAlert] = useState('');
  const [loading , setLoading] = useState(false);
  const handleContact = async() => {
      console.log(message);

      if(message.name=== '' || message.email=== '' || message.subject=== '' || message.message=== ''){
        setAlert('All fields Required');
        return setDisplayMessage(true)
      }else{
        try{
          setLoading(true)
          const response = await axios.post('/api/apiRoutes/sendMessage', message)
          if(response.data.message === 'message send successfully') {
            setLoading(false)
            setAlert("Message sent successfully! I'll contact you shortly.")
            setDisplayMessage(true);
            setTimeout(() => {
              window.location.reload();
            },3000)
          }else{
            setLoading(false);
            alert('something went wrong')
          }
        }catch(err){
          console.log(err)
        }
      }
  }

  return (
    <div class=" text-center mt-4 p-5 contact">
      <div style={{ textAlign: "left", fontFamily: "'Fugaz One', cursive", fontSize: "40px", color: "black" }}>Contact Me</div>
      <p className='' style={{ textAlign: "left", color: "black" }}><b>I'm interested in internship as well as  full time job opportunity. However, if you have other offers then feel free to fill the contact form below</b></p>
      {displayMessage && <text style={{color: 'green'}}>{alert}</text>}
      {loading ? <Image style={{width : '400px' , height : '400px'}} src={loadingGif} alt='loading'></Image> : <>
      <div class="row   text-dark " >
        <div class="col " ><input onChange={(e) => {setMessage({...message,name : e.target.value})}} class=" form-control text-dark   textbox1" style={{ height: "60px", backgroundColor : "white" }} type="text" placeholder="Name" aria-label=".form-control-lg example" /></div>
        <div class="col " ><input onChange={(e) => {setMessage({...message,email : e.target.value})}} class="form-control text-dark  textbox2" style={{ height: "60px", backgroundColor : "white" }} type="text" placeholder="Email" aria-label=".form-control-lg example" /></div>
      </div>

      <div class="row mt-2 " ><input onChange={(e) => {setMessage({...message,subject : e.target.value})}} class="form-control text-dark" style={{ height: "60px", backgroundColor : "white" }} type="text" placeholder="Subject" aria-label=".form-control-lg example" /></div>

      <div class="row mt-2">
        <textarea onChange={(e) => {setMessage({...message,message : e.target.value})}} class="form-control" style={{ height: "200px", backgroundColor : "white", color: "black" }} placeholder="Message" id="floatingTextarea"></textarea>
        <label for="floatingTextarea" />
        <button onClick={() => {handleContact()}} type="button" style={{ border: `2px solid #1CBE8E `, color: "#1CBE8E" }} class="btn btn-outline-secondary mb-3 ">Send Message!</button>
      </div>
      </>}
      <div className='mt-3' style={{height: "20px"}}>
        <a  href="https://www.linkedin.com/in/nikhil-prajapati-126257256/"><i  class="fa-brands fa-linkedin fa-2xl mx-2"></i></a>
        <a href="https://github.com/Nikhil127001?tab=overview"> <i class="fa-brands fa-square-github fa-2xl mx-2"></i> </a>
        <a class="button" href="mailto:prajapatinikhil166@gmail.com"><i class="fa-solid fa-square-envelope fa-2xl mx-2"></i></a>

      </div>
    </div>

  )
}

export default ContactPageComponent