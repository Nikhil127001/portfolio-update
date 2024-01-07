import { useEffect, useState } from "react"
import axios from "axios";
import loadingGif from '../../loading.gif'
import { Image } from "react-bootstrap";


const ProfileComponent = (props) => {
    const {getAllSkillsData , skillData} = props
    const [adminData, setAdminData] = useState([]);
    const [about, setAboutData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const [skillImage, setSkillImage] = useState();
    const [display , setDisplay] = useState(false);
    const [skill, setSkill] = useState({ name: '', progress: '' });
    const [profile, setProfile] = useState({ email: '', password: '', introName: '', linkedInUrl: '', githubUrl: '', resume: '', introDescription: '', about: [], image: '' })

    const handleImage = (e) => {
        const file = e.target.files[0]
        setImage(file);
    }
    const handleSkillImage = (e) => {
        const file = e.target.files[0]
        setSkillImage(file);
    }

    const verifyIsLoggedIn = async() => {
        const config = {
            headers: {
                "auth_token": localStorage.getItem('auth_token')
            }}

        const response = await axios.get('/api/apiRoutes/verifyIsLoggedIn', config)

        if(response.data.message === 'user Logged In'){
            setDisplay(true);
        }else{
            setDisplay(false);
        }
    }

    const createSkill = async () => {
        if (!(skill.name || skill.progress || skillImage)) {
            return alert('all fields required')
        }
        else {
            const formDataSkill = new FormData()
            formDataSkill.append('name', skill.name)
            formDataSkill.append('progress', skill.progress)
            formDataSkill.append('file', skillImage)

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "auth_token": localStorage.getItem('auth_token')
                },
            }

            try {
                const response = await axios.post('/api/apiRoutes/createSkills', formDataSkill, config)
                if (response.data.message === 'skill added') {
                    getAllSkillsData();
                } else {
                    alert(response.data.message);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const deleteSkill = async (item) => {
        const config = {
            headers: {
                "auth_token": localStorage.getItem('auth_token')
            },
        }
            try {
                const response = await axios.delete(`/api/apiRoutes/deleteSkill/${item._id}`, config)
                if (response.data.message === 'skill deleted') {
                    getAllSkillsData();
                } else {
                    alert(response.data.message);
                }
            } catch (err) {
                console.log(err);
            }
        }
    




    const updateProfile = async () => {
        const formData = new FormData()
        formData.append('email', profile.email || adminData.email)
        formData.append('password', profile.password || adminData.password)
        formData.append('introName', profile.introName || adminData.introName)
        formData.append('introDescription', profile.introDescription || adminData.introDescription)
        formData.append('linkedInUrl', profile.linkedInUrl || adminData.linkedInUrl)
        formData.append('resume', profile.resume || adminData.resume)
        formData.append('githubUrl', profile.githubUrl || adminData.githubUrl)

        about.forEach((item, idx) => {
            formData.append(`about[${idx}][heading]`, item.heading)
            formData.append(`about[${idx}][description]`, item.description)
        })
        formData.append('file', image)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "auth_token": localStorage.getItem('auth_token')
            },
        }
        try {
            setLoading(true)
            const response = await axios.put('/api/apiRoutes/updateAdminProfile', formData, config)

            if (response.data.message === 'admin details updated') {
                alert('admin details updated')
                getProfile();
                setLoading(false)
            }
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }


    const handleOnchange = (idx, field, value) => {
        const About = adminData.about;
        About[idx][field] = value;
        setProfile({ ...profile, about: About })
    }


    const getProfile = async () => {
        const config = {
            headers: {
                'auth_token': localStorage.getItem('auth_token')
            }
        }
        try {
            setLoading(true)
            const response = await axios.get('/api/apiRoutes/AdminProfile', config)
            if (response.data.message === "admin details fetched") {
                setAdminData(response.data.admin)
                setAboutData(response.data.admin.about)
                setLoading(false)
            }
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfile()
        getAllSkillsData()
        verifyIsLoggedIn();
    }, [])


    return (
        (loading ? <Image style={{ marginTop: '50px' }} height={'400px'} width={'500px'} src={loadingGif} alt="No preview"></Image> :
            < div style={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'scroll', height: '600px', alignItems: 'center' }}>

                <>
                    <div className="createProject" style={{ width: '75%', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '900px', marginTop: '5px' }}>
                        <h4>Hii! {adminData.introName} here is your profile</h4>
                        <label style={{ lineHeight: '7px', marginTop: '5px' }}>Name</label>
                        <input onChange={(e) => setProfile({ ...profile, introName: e.target.value })} defaultValue={adminData.introName} className="input_field" type="text" placeholder="Name" />
                        <label style={{ lineHeight: '7px', marginTop: '5px' }}>Email</label>
                        <input onChange={(e) => setProfile({ ...profile, email: e.target.value })} defaultValue={adminData.email} className="input_field" type="text" placeholder="Email" />
                        <label style={{ lineHeight: '7px', marginTop: '5px' }}>Home page Description</label>
                        <textarea onChange={(e) => setProfile({ ...profile, introDescription: e.target.value })} defaultValue={adminData.introDescription} className="input_field" type="text" placeholder="Description" />
                        <label style={{ lineHeight: '7px', marginTop: '5px' }}>Edit About Page content</label>
                        <div style={{ height: '500px', overflow: 'scroll', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '5px', marginBottom: '5px' }}>
                            {about.map((item, idx) => (
                                <div key={idx} style={{ width: '80%' }}>
                                    <input onChange={(e) => { handleOnchange(idx, "heading", e.target.value) }} style={{ width: '100%', border: '1px dashed grey', fontWeight: 'bolder' }} defaultValue={item.heading} className="input_field" type="text" placeholder="Heading" />
                                    <textarea onChange={(e) => { handleOnchange(idx, "description", e.target.value) }} style={{ width: '100%', border: '1px dashed grey' }} defaultValue={item.description} className="input_field" type="text" placeholder="Description" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <label style={{ lineHeight: '7px', marginTop: '5px' }}>Current Profile Photo ----</label>
                            <img style={{ margin: '3px' }} height={'120px'} width={'120px'} src={adminData.profileUrl} alt="No preview"></img>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ lineHeight: '7px', marginTop: '5px', width: '250px' }}>Change Profile Photo</label> <input onChange={handleImage} className="input_field" type="file" name="file" />

                            </div></div>
                        <label style={{ lineHeight: '7px', marginTop: '5px' }}>linkedIn URL</label>
                        <input onChange={(e) => setProfile({ ...profile, linkedInUrl: e.target.value })} defaultValue={adminData.linkedInUrl} className="input_field" type="text" placeholder="Password" />
                        <label style={{ lineHeight: '7px', marginTop: '5px' }}>Github URL</label>
                        <input onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })} defaultValue={adminData.githubUrl} className="input_field" type="text" placeholder="Password" />
                        <label style={{ lineHeight: '7px', marginTop: '5px' }}>Resume URL</label>
                        <input onChange={(e) => setProfile({ ...profile, resume: e.target.value })} defaultValue={adminData.resume} className="input_field" type="text" placeholder="resume" />
                        {display && <><label style={{ lineHeight: '7px', marginTop: '5px' }}>Password</label>
                        <input onChange={(e) => setProfile({ ...profile, password: e.target.value })} defaultValue={adminData.password} className="input_field" type="text" placeholder="Password" /></>}
                        <button style={{ marginBottom: '20px' }} onClick={() => { updateProfile() }} className="button_style">Update profile</button>

                    </div>

                    <div className="createProject" style={{ width: '75%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px' }}>
                        <h4>Skills</h4>
                        <div style={{  margin: '5px',flexDirection: 'column', display: 'flex', width: '90%', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>

                            {skillData &&
                                skillData.map((item, idx) => (
                                    <div key={idx} style={{backgroundColor: 'white', margin: '5px', display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                                            <div>
                                                <img style={{ margin: '3px' }} height={'80px'} width={'80px'} src={item.imageUrl} alt="No preview"></img>
                                            </div>
                                            <div>
                                                <p><b>Name :</b> {item.name}</p>
                                                <p><b>Progress :</b>{item.progress}%</p>
                                            </div>
                                            <button style={{ marginBottom: '20px' }} onClick={() => { deleteSkill(item) }} className="button_style">Delete</button>

                                        </div>

                                    </div>
                                )
                                )}
                        </div>
                        <div>
                            <h4 style={{backgroundColor: 'black', color: 'white', padding: '2px'}}>Add New Skill</h4>
                            <label style={{ lineHeight: '7px', marginTop: '5px' }}>Skill Name</label>
                            <input onChange={(e) => setSkill({ ...skill, name: e.target.value })} className="input_field" type="text" placeholder="Skill Name" />
                            <label style={{ lineHeight: '7px', marginTop: '5px' }}>Progress</label>
                            <input onChange={(e) => setSkill({ ...skill, progress: e.target.value })} defaultValue={adminData.email} className="input_field" type="Number" placeholder="progress in percentage" />
                            <div>

                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ lineHeight: '7px', marginTop: '5px', width: '250px' }}>Add Image</label> <input onChange={handleSkillImage} className="input_field" type="file" name="file" />

                                </div></div>
                            <button style={{ marginBottom: '20px' }} onClick={() => { createSkill() }} className="button_style">Add Skills</button>
                        </div>
                    </div>
                </>

            </div>
        )
    )
}
export default ProfileComponent