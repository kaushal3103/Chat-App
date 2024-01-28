import React,{useState} from 'react';
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = ()=>{
  const [username,setUsername]= useState("");
  const [password,setPassword] = useState("");
  const [name,setName]=useState("");

  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);

  const handleRegister = async(e)=>{
    if(!name || name.length < 3){
      window.alert("Please Enter Name and It should be of length 3 or more");
      return;
    }

    if(!username || username.length < 5){
      window.alert("Please Enter Username and It should be of length 5 or more");
      return;
    }

    if(!password || password.length < 5){
      window.alert("Please Enter Password and It should be of length 5 or more");
      return;
    }

    e.preventDefault();
     try{
     
      setLoading(true);
      const user = {name,username,password};
      const res = await axios.post("http://localhost:3001/api/v1/auth/register",user);
      
      if(res){
        setLoading(false);
        window.alert("Successfully Registered");
        navigate("/login");
      }
     }

     catch(error){
      setLoading(false);   
      window.alert("Something went Wrong ! Please Try again or Username already existed");
     }
  }

  return (
    <div className='register-body'>
      <div>
      <h1 style={{marginBottom:'5px'}}>Register for Chat App</h1>
      <p style={{color:'#051650'}}>Let's get started and connect with everyone</p>
      </div>
      <div className='regform'>
      <div style={{marginTop:'5px'}}>     
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />
      </div>
      <div>   
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Username"
          onChange={(e)=>setUsername(e.target.value)}
        />
      </div>
      <div style={{marginBottom:'10px'}}>
        
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
      </div>
       <button onClick={handleRegister} className='regbtn'>Register</button>
       <div className={`loader ${loading ? 'active':''}`}></div>
       <div className='reglogin'>
        <p style={{marginRight:'5px'}}>Already have an account ?</p>
        <Link to="/login"><h4 style={{color:'blue'}}>Log In</h4>
        </Link>
       </div>
       <p className='tandc'>By signing up to create an account I accept Company's Terms of Use and Privacy Policy</p>
       
    </div>
  )
}

export default Register;
