import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import '../App.css'

const HeaderComponent = (props) => {
  const {adminData} = props
  return (
  <div style={{display:'flex', justifyContent: 'center',
   alignItems: 'center', width: '100%', height: '70px', position: 'fixed', zIndex: 2, top: 0, backgroundColor: 'white'}}>

     


     <Nav style={{display : 'flex' , justifyContent : 'center', alignItems:'center', flexWrap : 'wrap'}} className={`Nikhilx`} activeKey="/home">
     <div style={{display : 'flex' ,justifyContent : 'center', flexDirection: 'row', alignItems : 'center'}}>
     <Nav.Item style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}} >
        <Link to="/"  className = "Nav_links_Styles">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/projects"  className = "Nav_links_Styles">Projects</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/contact" className = "Nav_links_Styles">Contact</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/about" className = "Nav_links_Styles">
          About
        </Link>
      </Nav.Item>
      <Nav.Item >
        <Link to="/about" >
        </Link>
      </Nav.Item>
     </div >


     <div style={{fontSize: '20px'  }} >
          <a id='navIcons'  href={adminData.linkedInUrl} target="_blank"><i class="fa-brands fa-linkedin fa-xl mx-2"></i></a>
          <a id='navIcons' href={adminData.githubUrl} target="_blank"> <i class="fa-brands fa-square-github fa-xl mx-2"></i> </a>
          <a id='navIcons' class="button" href={`mailto:${adminData.email}` } target="_blank"><i class="fa-solid fa-square-envelope fa-xl mx-2"></i></a>
        </div>
      
      
    </Nav>
   
  </div>
  )
}

export default HeaderComponent