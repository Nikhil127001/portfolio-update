import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import ContactFormComponent from '../Components/adminComponents/ContactFormComponent';
import ProjectsComponent from '../Components/adminComponents/ProjectsComponent';
import ProfileComponent from '../Components/adminComponents/profileComponent';
import '../App.css'
import { useState } from 'react';
const Adminpage = (props) => {
    const {getAllSkillsData , skillData} = props
    const [contactFormComponent , setContactFormComponent] = useState(false)
    const [projectsComponent , setprojectsComponent] = useState(true)
    const [profileComponent , setProfileComponent] = useState(false)
    const[data , setdata] = useState([])

    const handleOnclick = (item) => {
        if(item === 'projects'){
            setprojectsComponent(true);
            setContactFormComponent(false)
            setProfileComponent(false)

        }else if(item === 'contact'){
            setContactFormComponent(true);
            setprojectsComponent(false);
            setProfileComponent(false)
        }else{
          setContactFormComponent(false);
          setprojectsComponent(false);
          setProfileComponent(true);
        }
    }

    const logout = () => {
      localStorage.removeItem('auth_token')
    }

  return (
    <div><div style={{display:'flex', justifyContent: 'space-evenly',flexWrap: 'wrap', width: '100%',position: 'fixed', zIndex: 2, marginTop : '42px'}}>
    <Nav className={`adminNav`} activeKey="/home" style={{ backgroundColor: 'white' }}>
     <Nav.Item >
       <li onClick={() => {handleOnclick('contact')}}  className=" px-2 mt-0 Nav Hello text-dark" style={{ fontWeight: "bolder", fontSize: "15px" }}>Contact Form Data</li>
     </Nav.Item>
     <Nav.Item>
       <li onClick={() => {handleOnclick('projects')}} className=" px-2 mt-0  Nav Hello text-dark" style={{ fontWeight: "bolder", fontSize: "15px" }}>All Projects</li>
     </Nav.Item>
     <Nav.Item>
       <Link onClick={() => {logout()}} to="/" className="px-2 mt-0  Nav Hello text-dark "style={{ fontWeight: "bolder", fontSize: "15px" }}>Logout</Link>
     </Nav.Item>
     <Nav.Item>
       <li onClick={() => {handleOnclick('profile')}} className=" px-2 mt-0  Nav Hello text-dark" style={{ fontWeight: "bolder", fontSize: "15px" }}>Your Profile</li>
     </Nav.Item>
    
   </Nav>
   {projectsComponent && <ProjectsComponent/>}
 {contactFormComponent && <ContactFormComponent/>}
 {profileComponent && <ProfileComponent  getAllSkillsData = {getAllSkillsData} skillData = {skillData}/>}
 </div>
 
 </div>
  )
}
export default Adminpage