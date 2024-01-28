import React,{useState} from 'react';
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = ()=>{
  const [username,setUsername]= useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);

  const handleLogin = async(e)=>{
    e.preventDefault();
      if(!username || username.length < 5){
      window.alert("Please Enter Valid Username");
      return;
    }

    if(!password || password.length < 5){
      window.alert("Please Enter Valid Password");
      return;
    }
     try{
     
      setLoading(true);
      const user = {username,password};

      const res = await axios.post("http://localhost:3001/api/v1/auth/login",user);
      
      if(res){
        setLoading(false);
        const userId = res.data.userId;     
        localStorage.setItem('userId', userId); //storing the logged in user (current user) to local storage so it can be easily be fetched when needed
        window.alert("Successfully Login");
        navigate("/chathome");
      }
     }

     catch(error){
      setLoading(false);
      
      window.alert("Something went Wrong ! Please Try again or Credentials mismatch");
     }
  }
  return (
    <div className='login-body'>
      <div>
      <h1 style={{marginBottom:'5px'}}>Login in to Chat App</h1>
      <p style={{color:'#051650'}}>Welcome Back !</p>
      </div>
      <div className='loginform'>
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
       <button onClick={handleLogin} className='regbtn'>Login</button>
        <div className={`loader ${loading ? 'active':''}`}></div>
       <div className='reglogin'>
        <p style={{marginRight:'5px'}}>New to Chat App ?</p>
        <Link to="/"><h4 style={{color:'blue'}}>Register</h4>
        </Link>
       </div>
       <p className='tandc'>By Login up an account I accept Company's Terms of Use and Privacy Policy</p>
       
    </div>
  )
}

export default Login;
