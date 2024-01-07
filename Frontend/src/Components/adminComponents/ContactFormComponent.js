
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import loadingGif  from '../../loading.gif'
import { Image } from "react-bootstrap";
const ContactFormComponent = () => {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getmessages = async () => {

    const config = {
      headers : {
        'auth_token' : localStorage.getItem('auth_token')
      }
    }
    setLoading(true)
    await axios.get('/api/apiRoutes/getMessages', config).then((response) => {if(response.data.message === 'message fetched success'){
      setContacts(response.data.Message)
      setLoading(false)
    }else{
        alert(response.data.message);
        setLoading(false);
      }
    }).catch((err) => {
      alert(err);
      setLoading(false)
    })
  }

  useMemo(() => {
      getmessages()
  },[])

  return (
    (loading ? <Image style={{marginTop: '50px'}} height={'400px'} width={'400px'} src={loadingGif} alt="No preview"></Image>:<div style={{ display: 'flex', justifyContent: 'center', }}  >
    <div style={{ display: 'flex', width: '90%', flexWrap : 'wrap', padding: '20px', height: '600px', overflow: 'scroll',justifyContent: 'center' , alignItems: 'center'}}>

      {contacts.map((contact, idx) =>
      (
        <div key={idx} class="card  mb-3 mx-5 github_cards" style={{ boxSizing: "border-box", width: "350px", fontFamily: "'Fugaz One', cursive", border: "1px solid #ff6b08", backgroundColor: "white", height: '200px', overflow: 'scroll' }}>
          <div class="card-body" style={{ color: "black" }}>
            <h4 class="card-title">Name : {contact.name}</h4>
            <h5 class="card-title">Email : <a href={`mailto:${contact.email}`}>{contact.email}</a></h5>
            <text>Subject : {contact.subject}</text>
            <p class="card-text">Message : {contact.message}</p>
          </div>
        </div>
        
      ))}
    </div>
  </div>)
  )
}
export default ContactFormComponent