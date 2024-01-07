import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import loaderImage from '../loading.gif'
const ProjectPageItemsComponentApp = () => {
  const [projects, setProjects] = useState([]);
  const [loader , setLoader] = useState(false);

  const getprojects = async () => {
    try {
      setLoader(true);
      const config = {
        headers :{
          'auth_token' : localStorage.getItem('auth_token')
        }
      }
      const response = await axios.get('/api/apiRoutes/getprojects', config);

      if (response.data.projects) {
        const projectsData = response.data.projects.filter((project) => project.projectType === 'Mobile App')
        setProjects(projectsData)
        setLoader(false);

      }
    } catch (err) {
      console.log(err);
      setLoader(false);

    }
  }

  useEffect(() => {
    getprojects()
  }, [])
  return (
    (loader ? <div style={{ marginTop: '90px', width: '100%',height : '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <Image height={'400px'} width={'400px'} src={loaderImage}></Image> </div> : <div style={{ marginTop: '90px', width: '100%' }}>
    {projects.map((project, idx) => (
      <div key={idx}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }} >
          <div style={{
            height: "500px",
            width: '700px', overflow: "scroll", padding: '5px', border: '1px solid grey'
          }} >
            <div >
            {project.videoLink &&
                <iframe width="100%" height="400" src={project.videoLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}
              {(project.images).map((image, idx) => (
                <div key={idx} ><img alt="nothing to preview" src={image} style={{ maxWidth: "100%" }}></img></div>
              ))}
             
            </div>
          </div>

          <div className = 'ProjectDesc'>
            <h1>{project.title}</h1>
            <p class="font-monospace"><b>Skills :</b>{project.skills}</p>
            <p>
              <b>Frontend :</b>{project.frontendDiscription}
              </p>
              <p>
              <b>Backend :</b> {project.backendDiscription}</p>
            <div ><b>URL :</b> <a href={project.hostedLink} target='_blank' rel="noreferrer">{project.hostedLink}</a></div>
            <div ><b>Github Link :</b> <a href={project.githubLink} target='_blank' rel="noreferrer">{project.githubLink}</a></div>
            <div ><b>video Link :</b> <a href={project.videoLink} target='_blank' rel="noreferrer">{project.videoLink}</a></div>
          </div>
        </div>
        <hr style={{ border: "1px solid red" }} />
      </div>
    ))}
  </div>)
  )
}

export default ProjectPageItemsComponentApp