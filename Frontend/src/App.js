import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import ProjectsPage from "./pages/ProjectsPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import HeaderComponent from "./Components/HeaderComponent";
import { useState } from "react";
import ProjectPageItemsComponentWeb from "./Components/ProjectPageItemsComponentWeb";
import ProjectPageItemsComponentApp from "./Components/ProjectPageItemsComponentApp";
import Adminpage from "./pages/Adminpage";
import axios from "axios";
import { useEffect } from "react";
function App() {
  const [adminData, setAdminData] = useState([]);
  const [about, setAboutData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const getProfile = async () => {
    try {
      const response = await axios.get('/api/apiRoutes/AdminProfile')
      if (response.data.message === "admin details fetched") {
        setAdminData(response.data.admin)
        setAboutData(response.data.admin.about)
      }
    } catch (err) {
      console.log(err);
    }
  }
  const getAllSkillsData = async () => {
    try {
        const response = await axios.get('/api/apiRoutes/getAllSkills');
        if (response.data.message === 'fetched Success') {
            setSkillData(response.data.data)
        } else {
            alert(response.data.message)
        }
    } catch (err) {
        console.log(err);
    }
}

  useEffect(() => {
    getProfile()
    getAllSkillsData();
  }, [])

  return (
    <Router>
      <HeaderComponent  adminData = {adminData}/>
      <Routes>
        <Route exect path="/" element={<HomePage adminData = {adminData} getProfile = {getProfile}  skillData = {skillData}/>}>
        </Route>
        <Route exect path="/projects" element={<ProjectsPage />}>
        </Route>
        <Route exect path="/contact" element={<ContactPage />}>
        </Route>
        <Route exect path="/about" element={<AboutPage about = {about} />}></Route>
        <Route exact path="/projectItemsApp" element={<ProjectPageItemsComponentApp />}>
        </Route>
        <Route exact path="/projectItemsWeb" element={<ProjectPageItemsComponentWeb />}>
        </Route>
        <Route exact path="/adminpage" element={<Adminpage getAllSkillsData = {getAllSkillsData}  skillData = {skillData}/>}>
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
