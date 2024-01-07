import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonComponent from "../Components/ButtonComponent";
import CardsComponent from "../Components/CardsComponent";
import SkillsComponent from "../Components/SkillsComponent";
import { useEffect, useState } from "react";
import LoginComponent from "../Components/loginComponent";
import axios from "axios";

import '../index.css'
const HomePage = (props) => {
    const {adminData, getProfile, skillData} = props
    const Color = 'light'
    const [show, setShow] = useState(false);
    const [projects, setProjects] = useState([]);

    const displayLoginComponent = () => {
        if (show === true) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    const getprojects = async () => {
        try {
            const response = await axios.get('/api/apiRoutes/getprojects');

            if (response.data.projects) {
                setProjects(response.data.projects)
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getprojects()
        getProfile()
    }, [])
    return (
        <div className="homePageData">
            <pre style={{ fontWeight: "bold", border: "0px", fontSize: "20px", fontFamily: "'Satisfy', cursive", backgroundColor: 'white' }}><h2>
                &lt; Intro &gt;</h2>
            </pre>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center ', justifyContent: 'center' }}>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around' }} className=" row container-fluid ">
                    <div className="  mt-4 col  ">
                        <p className="fonts text-dark" style={{ fontFamily: "'Fugaz One', cursive", marginLeft: "40px" }}><p><h1>Hii! I'm</h1></p>

                            <div className="gradient">{adminData.introName}</div>
                            <h4>{adminData.introDescription} </h4></p>
                    </div>


                    <div className="md-6 col text-center ">
                        <Image className="image" src={adminData.profileUrl} alt="no image to preview" style={{
                            height
                                : "310px", width: "310px",
                            borderRadius: '300px'
                        }} />
                        <div className="text-center img-fluid ">
                            <button type="button" className="downloadButton"><a style={{ textDecoration: "none", color: "black" }} target="_blank" href={adminData.resume} download ><i class="fa-solid fa-download fa-bounce fa-xl"></i> Download Resume</a></button>
                            <ButtonComponent Color={Color} />
                        </div>

                    </div>

                </div>
            </div>
            <pre style={{ fontWeight: "bold", border: "0px", fontSize: "20px", fontFamily: "'Satisfy', cursive", backgroundColor: "white" }}>
                <h2>&lt;/ Intro &gt;</h2>
            </pre>
            <pre style={{ fontWeight: "bold", border: "0px", fontSize: "20px", fontFamily: "'Satisfy', cursive", backgroundColor: "white" }}>
                <h2> &lt; Skills &gt;</h2>
            </pre>
            <section>
            <SkillsComponent skillData = {skillData}/>
            </section>
            <pre style={{ fontWeight: "bold", border: "0px", fontSize: "20px", fontFamily: "'Satisfy', cursive", backgroundColor: `${Color == "dark" ? "black" : "white"}` }}>
                <h2> &lt;/ Skills &gt;</h2>
            </pre>
            <pre style={{ fontWeight: "bold", border: "0px", fontSize: "20px", fontFamily: "'Satisfy', cursive", backgroundColor: "white" }}>
                <h2> &lt; Github &gt;</h2>
            </pre>
            < CardsComponent projects={projects} />
            <pre style={{ fontWeight: "bold", border: "0px", fontSize: "20px", fontFamily: "'Satisfy', cursive", backgroundColor: "white" }}>
                <h2> &lt;/ Github &gt;</h2>
            </pre>
            <div style={{ display: 'flex', position: "sticky", width: '100%', bottom: 30, 
            justifyContent: 'flex-end' }} >
                <Image style={{ display: `${show === true ? 'none' : ''}` }} onClick={displayLoginComponent} className="admin_btn" src="/images/developer.png" alt="Admin" />
                <div style={{ height: '250px', width: '200px', marginRight: '30px', display: `${show === false ? 'none' : ''}` }}>
                    <LoginComponent closeCompo = {() => {
                        setShow(false)
                    }} />
                </div>
            </div>
        </div>
    )


};

export default HomePage;