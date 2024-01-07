import React from 'react'

const AboutPage = (props) => {
  const {about} = props
  return (
    <div className='container mt-5' style={{fontSize:"20px", color: "black", paddingTop: '90px'}}>
      {about.map((item,idx) => (
        <div key={idx}><b>{item.heading}</b>
        <p>
          {item.description}</p></div>
      ))}


    </div>
  )
}

export default AboutPage
