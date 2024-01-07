import {useState} from "react"
import axios  from 'axios'
import { useNavigate , Link} from "react-router-dom"

const LoginComponent = ({closeCompo}) => {

    const [loginCredentials , setloginCredentials] = useState({email : '' , password : ''})
    const Navigate = useNavigate()
    const [error , setError] = useState('')
    
    const handleLogin = async() => {
        if(loginCredentials.email == '' || loginCredentials.password == ''){
            setError('All fields required')
        }
        else{

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const data = {
                email : loginCredentials.email,
                password : loginCredentials.password
            }
            const response = await axios.post('/api/apiRoutes/AdminLogin',data,config);

            if(response.data.message === "logged In"){
                localStorage.setItem('auth_token' , response.data.Token)
                Navigate('/adminPage')
            }else if (response.data.message === "invalid Credentials"){
                setError('invalid Credentials')
            }else{
                setError('something went Wrong')
            }
        }
    }

    return (
        <div className="loginComponent">
            <text onClick={() => {closeCompo()}} style={{fontSize: '18px', fontWeight: 550, position: 'absolute', top: 10 , right : 45, cursor: 'pointer'}}>X</text>
            <img style={{ width: "50px", height: "50px" }} src="../../images/developer.png" class="card-img-top" alt="..." />
            <h5><b>Admin login</b></h5>
            <div style={{display : 'flex' ,height : '10px', width : '98%',  alignItems : 'center' , justifyContent : 'center', fontSize: '9px', fontWeight: 'bold', color: 'red'}}><h7>{error}</h7></div>
            <input onChange={(e) => {setloginCredentials({...loginCredentials ,email : e.target.value})}} className='loginInput' type="email" placeholder="email" />
            <input onChange={(e) => {setloginCredentials({...loginCredentials ,password : e.target.value})}} className='loginInput' type="password" placeholder="Password" />

            <Link style={{ width: "75%", marginTop: "5px" }} to="#">
                <button onClick={() => {handleLogin()}} style={{ width: "100%", color: "white", fontWeight: "bold" }} type="button" class="btn btn-info">Log in</button>
            </Link>
        </div>
    )
}
export default LoginComponent