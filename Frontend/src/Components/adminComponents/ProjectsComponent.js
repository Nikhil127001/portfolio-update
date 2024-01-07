import { useEffect, useState } from "react"
import axios from 'axios'
import loadingGif  from '../../loading.gif'
import { Image } from "react-bootstrap";

const ProjectsComponent = () => {

  const [projects, setProjects] = useState([]);
  const [CreateComponent, setCreateComponent] = useState(false)
  const [index, setIndex] = useState('');
  const [loading , setLoading] = useState(true);
  const [projectData, setProjectData] = useState({
    title: '', frontendDiscription: '',
    backendDiscription: '',
    hostedLink: '',
    githubLink: '',
    projectType: '',
    skills: '',
    images: [],
    videoLink: ''
  })
  

  const [updatedData, setProjectUpdatedData] = useState({
    title: '', frontendDiscription: '',
    backendDiscription: '',
    hostedLink: '',
    githubLink: '',
    projectType: '',
    skills: '',
    videoLink: ''
  })

  const handleImages = (e) => {
    const imageArray = Array.from(e.target.files);
    setProjectData({ ...projectData, images: imageArray })
  }
  const config = {
    headers : {
      'auth_token' : localStorage.getItem('auth_token')
    }
  }

  const handleDelete = async(project) => {
    setLoading(true)
      await axios.delete(`/api/apiRoutes/deleteProject/${project._id}`,config).then((response) => {
        if(response.data.message !== 'deleted Successfully'){
          setLoading(false)
          alert(response.data.message)
        }else if(response.data.message === 'deleted Successfully'){
          setLoading(false)
          alert('project deleted successfully');
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleUpdate = async (project) => {
    try {
      setLoading(true)
      const response = await axios.put(`/api/apiRoutes/updateProject/${project._id}`, updatedData,config)

      if (response.data.message === 'updated Successfully') {
        setLoading(false)
        alert('data updated successfully')
      } else {
        setLoading(false)
        alert('something went wrong')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData();

    if (projectData.title === '' || projectData.frontendDiscription === '' ||
      projectData.backendDiscription === '' ||
      projectData.hostedLink === '' ||
      projectData.githubLink === '' ||
      projectData.projectType === '' ||
      projectData.skills === '' ||
      projectData.images.length === 0
    ) {
      return alert('All fields required')
    }

    // Append other project data to the FormData
    formData.append("title", projectData.title);
    formData.append("frontendDiscription", projectData.frontendDiscription);
    formData.append("backendDiscription", projectData.backendDiscription);
    formData.append("hostedLink", projectData.hostedLink);
    formData.append("githubLink", projectData.githubLink);
    formData.append("projectType", projectData.projectType);
    formData.append("skills", projectData.skills);
    formData.append("videoLink", projectData.videoLink);

    // Append image files
    for (let i = 0; i < projectData.images.length; i++) {
      formData.append("images", projectData.images[i]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth_token" : localStorage.getItem('auth_token')
      },
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/apiRoutes/addProject', formData, config);
      if (response.data.message === 'project posted successfully') {
        setCreateComponent(false);
        setProjectData({
          title: '', frontendDiscription: '',
          backendDiscription: '',
          hostedLink: '',
          githubLink: '',
          projectType: '',
          skills: '',
          images: [],
          videoLink: ''
        })
        setLoading(false)
        alert('Project posted successfully')
      } else {
        setLoading(false)
        alert(response.data.message)
      }
    } catch (err) {
      if (err === 'All fields required') {
        setLoading(false)
        alert('All fields required')
      }
      console.log(err)
    }

  }

  const getprojects = async () => {
   if(localStorage.getItem('auth_token')){
    try {
      setLoading(true);
      const response = await axios.get('/api/apiRoutes/getprojects', config);

      if (response.data.projects) {
        setProjects(response.data.projects)
        setLoading(false)
      }
    } catch (err) {
      console.log(err);
    }
   }else{
    setLoading(false)
    alert('please log in first to access adminPage');
   }
  }

  const handleEdit = (idx, project) => {
    setIndex(idx)

  }

  useEffect(() => {
    getprojects();
  }, [])
  return (
   (loading ? <Image style={{marginTop: '50px'}} height={'400px'} width={'400px'} src={loadingGif} alt="No preview"></Image> :  <>
   <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', marginTop: '10px', overflow: 'scroll', height: '600px' }}>

     <button onClick={() => { setCreateComponent(true) }} className="button_style">Create Project</button>
     {
       projects.map((project, idx) => (
         <div key={idx} className="adminProductPage" style={{ display: 'flex', width: '98%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: '20px', marginBottom: '10px' }}>
           <div style={{ display: 'flex', width: '98%', flexDirection: 'row', marginTop: '', height: '170px', overflow: "scroll", marginTop: '5px' }}>
             {(project.images).map((image, idx) => (
               <img key={idx} style={{ height: '170px ', width: '250px', backgroundColor: 'black', marginLeft: '5px', marginRight: '5px', border: '1px solid grey' }} src={image} />
             ))}
           </div>


           {idx === index ?
             <div style={{ display: 'flex', width: '98%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
               <h4>{project.title}</h4>
               <b>{`Skills${" "}: `}</b>
               <input onChange={(e) => { setProjectUpdatedData({ skills: e.target.value }) }} className="text_input" type="text" defaultValue={project.skills} id='skills_input' />


               <b>Frontend :</b>
               <textarea onChange={(e) => { setProjectUpdatedData({ frontendDiscription: e.target.value }) }} defaultValue={project.frontendDiscription} className='text_input'></textarea>


               <b>Backend :</b> <textarea onChange={(e) => { setProjectUpdatedData({ backendDiscription: e.target.value }) }} defaultValue={project.backendDiscription} className="text_input"></textarea>
               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column' }} >
                 <b>Hosted Website link :</b> <input onChange={(e) => { setProjectUpdatedData({ hostedLink: e.target.value }) }} defaultValue={project.hostedLink} className="text_input"></input>
                 <b>Github repository link :</b> <input onChange={(e) => { setProjectUpdatedData({ githubLink: e.target.value }) }} defaultValue={project.githubLink} className="text_input"></input>
                 <b>Video link :</b> <input onChange={(e) => { setProjectUpdatedData({ videoLink: e.target.value }) }} defaultValue={project.videoLink} className="text_input"></input>

                 <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '95%', right: 12, padding: '5px' }}>
                   <button onClick={() => handleUpdate(project)} className="button_style">update</button>
                   <button onClick={() => { setIndex('') }} className="button_style">back</button>
                 </div>
               </div>
             </div>
             :
             <div style={{ width: '98%', justifyContent: 'center' }}>
               <h4>{project.title}</h4>
               <p class="font-monospace"><b>Skills :</b> {project.skills}</p>
               <p>
                 <b>Frontend :</b>
                 {project.frontendDiscription}
               </p>
               <p><b>Backend :</b>
                 {project.backendDiscription}</p>
               <div className='row ms-1'>
                 <b>Hosted Website link :</b> <a href={project.hostedLink} target='_blank' rel="noreferrer">{project.hostedLink}</a>
                 <b>Github repository link :</b> <a href={project.githubLink} target='_blank' rel="noreferrer">{project.githubLink} </a>
                 <b>Video link :</b> <a href={project.videoLink} target='_blank' rel="noreferrer">{project.videoLink}</a>

                 <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '95%', right: 12, padding: '5px' }}>
                   <button onClick={() => { handleEdit(idx, project) }} className="button_style">Edit</button>
                   <button  onClick={() => {handleDelete(project)}} className="button_style">Delete</button>
                 </div>
               </div>

             </div>
           }
         </div>
       ))
     }

   </div>
   {CreateComponent && <div className="createProject" style={{ height: '500px', width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 90 }}>
     <h4>Create New Project</h4>
     <input onChange={(e) => { setProjectData({ ...projectData, title: e.target.value }) }} className="input_field" type="text" placeholder="Enter Title" />
     <textarea onChange={(e) => { setProjectData({ ...projectData, frontendDiscription: e.target.value }) }} className="input_field" type="text" placeholder="Enter Frontend description" />
     <textarea onChange={(e) => { setProjectData({ ...projectData, backendDiscription: e.target.value }) }} className="input_field" type="text" placeholder="Enter Backend description " />
     <input onChange={(e) => { setProjectData({ ...projectData, hostedLink: e.target.value }) }} className="input_field" type="text" placeholder="Paste Project Link" />
     <input onChange={(e) => { setProjectData({ ...projectData, githubLink: e.target.value }) }} className="input_field" type="text" placeholder="Paste Github Link" />
     <input onChange={(e) => { setProjectData({ ...projectData, projectType: e.target.value }) }} className="input_field" type="text" placeholder="project Type - ex:(Web/Mobile App)" />
     <input onChange={(e) => { setProjectData({ ...projectData, skills: e.target.value }) }} className="input_field" type="text" placeholder="skills" />
     <label>Add images</label>
     <input className="input_field" onChange={handleImages} type="file" name="files" multiple />
     <input onChange={(e) => { setProjectData({ ...projectData, videoLink: e.target.value }) }} className="input_field" type="text" placeholder="Paste video Link" />
     <button onClick={() => { setCreateComponent(false) }} style={{ borderRadius: '30px', height: '40px', width: '40px', position: 'absolute', right: '0', top: '0', border: '0.5px dashed grey' }}>X</button>
     <button onClick={() => { handleSubmit() }} className="button_style">Add Project</button>
   </div>
   }
 </>)
  )
}
export default ProjectsComponent;