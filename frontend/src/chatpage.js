import React, { useState, useEffect,} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import imageUrl from './defaultimage.jpeg';
import { Send } from 'react-feather';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

const Chatpage = () => {
   const { user2Id } = useParams();
   const user1Id = localStorage.getItem("userId");
   const [currentuser, setCurrentuser] = useState();
   const [chatlist, setChatlist] = useState({});
   const [chat, setChat] = useState({});
   const [text, setText] = useState("");
   const [chatid,setChatid] = useState();

   useEffect(() => {
      const fetchchat = async () => {

         try {
            const chat = await axios.post(`http://localhost:3001/api/v1/chats/${user2Id}`, { userId: user1Id });
            const current = await axios.post("http://localhost:3001/api/v1/auth/currentuser", { userId: user2Id });
            setChat(chat.data.chat); //fetching the chat if already existed or newly created
            setCurrentuser(current.data.users.username); // loggedIn user (current user)
            setChatlist(chat.data.chat.messages); //setting the list of chats
            setChatid(chat.data.chat._id);  // using the chat._id as joing room for socket.io

         } catch (error) {
            console.log(error);
           
         }
      }
      
      fetchchat();

   }, [user2Id, user1Id, chat._id, chatlist]);

   useEffect(()=>{
   chatid && socket.emit("join_room",chatid);
   },[chatid]);

   const sendmessage = async () => {
      if (text) {
         const message = await axios.post(`http://localhost:3001/api/v1/chats/${user2Id}/${chat._id}`, { userId: user1Id, text })

         //window.location.reload(); (if was not using socket.io then needed this to render after message sending)
         
        await socket.emit("send_message",message);
         
         setText('');
      }
      else {
         window.alert("Message can not be empty");
      }

   }

   return (
      <div style={{ textAlign: 'center' }}>
         <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>My Chats</h1>
         <div className='chatbody'>
            <div className='chatpageuser'>
               <img src={imageUrl} alt="Current-User" className='img' style={{ marginLeft: '20px', marginRight: '25px' }} />
               <h4>{currentuser}</h4>
            </div>
            <div className='chatcontent'>
               <div className='chatlist'>
                  {
                     chatlist.length > 0 && chatlist.map((data) => {
                        return (
                           //keeing the sender message to left side and reciver message to right side(to whom message is being send)
                           data.sender === user1Id ? <div key={data._id} className='sender'>{data.text} </div> : <div key={data._id} className='receiver'>{data.text}</div>
                        )
                     })
                  }
               </div>
               <div className='senddiv'>
                  <input
                     type="text"
                     id="text"
                     placeholder="Type a Message"
                     className="inputsend"
                     onChange={(e) => setText(e.target.value)}
                  />
                  <button className='sendbtn' onClick={sendmessage}>
                     <Send className='sendicon' />
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Chatpage;