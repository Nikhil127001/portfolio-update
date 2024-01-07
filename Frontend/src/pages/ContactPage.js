import React from 'react'
import ContactPageComponent from '../Components/ContactPageComponent'
import MapsComponent from '../Components/MapsComponent'

const ContactPage = () => {
  const Color = 'light'
  return (
    <div class="row mt-5" style={{marginLeft:"0px", marginRight:"0px", border : '0px'}}>
      <div class="col-sm-6  mb-3 mb-sm-0 mt-3">
        <div  style={{ backgroundColor: `${Color === "dark"?"#011e31": "white"}`, marginTop: "40px" }}>
          <div class="card-body ">
            <ContactPageComponent Color = {Color}/>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card " style={{ backgroundColor: "#011e31", marginTop: "40px" }}>
          <div class="card-body">
            <MapsComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
