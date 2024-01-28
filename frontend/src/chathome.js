import React,{useState,useEffect} from 'react';
import axios from 'axios';
import imageUrl from './defaultimage.jpeg';
import { useNavigate } from 'react-router-dom';

const Chat = ()=>{
   const [friendsdata,setFriendsdata] = useState([]);
   const [currentuser,setCurrentuser] = useState();
   const userId = localStorage.getItem('userId');
   const navigate = useNavigate();
   
 useEffect(()=>{
    const fetchusers = async()=>{
     
    const friends = await axios.post("http://localhost:3001/api/v1/auth/getfriends",{userId}); //list of users we can chat
    const current = await axios.post("http://localhost:3001/api/v1/auth/currentuser",{userId}); //loggedin user(current user)
    setFriendsdata(friends.data.users);
    setCurrentuser(current.data.users.username);
    }
   fetchusers();
 },[userId]);

 const handlelogout = ()=>{
  localStorage.removeItem('userId');
  navigate("/login");
 }

 //passing the user2Id (to whom we want to have chat)
 const chatnav = (e)=>{    
    navigate(`/chatpage/${e}`);
 }
       
    return (
       <div className="chathome">
         <h1 style={{marginLeft:'40px',marginRight:'40px',marginBottom:'20px',marginTop:'10px'}}>Let's Chat: Connect, Communicate and Share!</h1>
         <div className='currentusercard'>
          <h3 style={{marginLeft:'40px'}}>Whom do you want to chat with ?</h3>
          <div style={{marginRight:'30px'}}>
            <img src={imageUrl} alt="Current-User" className='img'/>
            <h4>{currentuser}</h4>
            <button className='logoutbtn' onClick={handlelogout}>Logout</button>
          </div>
         </div>
     <div className="friends">    
    {
   
     friendsdata.length > 0 &&  friendsdata.map((data)=>{
        return (
            <div key={data._id} className='friendsuser'>
                <div className='usernp'>
             <img src={imageUrl} alt="Current-User" className='img'/>
              <p style={{marginLeft:'20px'}}>{data.username}</p>
              </div>
              <button className='chatbtn' onClick={()=>chatnav(data._id)}>CHAT NOW</button>
           </div>
        )
      })

    }

      </div>   
       </div>
    )
}


export default Chat;