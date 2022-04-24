import React,{useState,useEffect} from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db  from '../firebase';
import { Link } from 'react-router-dom';
import { DataLayerValue } from '../data layer/Data';


function SidebarChat({ id, name,addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages ,setMessages ]=useState([])
  useEffect(() => {
    if(id){
       db.collection("Rooms")
         .doc(id)
         .collection("message")
         .orderBy("timeStamp", "desc")
         .onSnapshot((sc) => setMessages(sc.docs.map((msg) => msg.data())));
    }
  }, [id]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please Enter Room For Chat");
    if (roomName) {
      db.collection('Rooms').add({
        Name:roomName
      })
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className="SidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      
      <div className="SidebarChatInfo">
        <h2>{name}</h2>
  <p>{messages[0]?.message}</p>
      </div>
    </div>
    </Link>
  ) : (
    <div className="SidebarChat" onClick={createChat}>
      <h3>Add New Chat</h3>
    </div>
  );
}

export default SidebarChat
