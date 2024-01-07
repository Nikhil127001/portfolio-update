import React from 'react'
import { Link } from 'react-router-dom';

const ButtonComponent = () => {
  return (
    
    <button style={{ marginLeft: '10px'}} className="downloadButton"><Link style={{textDecoration: "none", color: 'black'}}  to='/contact' download>Contact Me</Link></button>
  )
}

export default ButtonComponent