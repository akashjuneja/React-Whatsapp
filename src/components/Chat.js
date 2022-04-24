import React,{useState,useEffect} from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { DataLayerValue } from '../data layer/Data';
import firebase from "firebase"


export default function Chat() {
    //const [seed, setseed] = useState("");
    const [message, setMessage] = useState('');
    const {roomId} =useParams();
    const [roomName, setroomName] = useState("");
    const [{ user}] = DataLayerValue();
    const [seed, setseed] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setseed(Math.floor(Math.random()*5000))
    }, []); 
    
    useEffect(() => {
       if(roomId){
         db.collection('Rooms').doc(roomId).onSnapshot(snap => 
          setroomName(snap.data().Name))
       }
       db.collection('Rooms').doc(roomId).collection('message').orderBy('timeStamp','asc')
       .onSnapshot(sc => (
         setMessages(sc.docs.map(msg =>
          msg.data()))
      ))
    }, [roomId]);

    const sendMessage= e =>{
          e.preventDefault();
          setMessage("");
         db.collection("Rooms").doc(roomId).collection("message").add({
           message: message,
           name: user.displayName,
           timeStamp:firebase.firestore.FieldValue.serverTimestamp()
         });
    }
    console.log(messages)
    return (
      <div className="chat">
        <div className="chatHeader">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="chatHeaderInfo">
            <h3>{roomName}</h3>
              <p>Last Seen{""}
                  {new Date(messages[messages.length-1]?.timeStamp?.toDate()).toUTCString()}</p>
          </div>
          <div className="chatHeaderRight">
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="chatBody">
          {messages.map(message =>(
            <>
            <p className={`chatMessage ${message.name == user.displayName && "chatReceiver"}`}>
            <span className="chatText">{message.name}</span>{message.message}
          <span className="chatTimestamp">{new Date(message.timeStamp?.toDate()).toUTCString()}</span>
          </p>
          </>
          ))} 
        </div>
        <div className="chatFooter">
          <InsertEmoticonIcon />
          <form>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Send Message"
            />
            <MicIcon />
            <button type="submit" onClick={sendMessage}>
              Send
            </button>
          </form>
        </div>
      </div>
    );
}
