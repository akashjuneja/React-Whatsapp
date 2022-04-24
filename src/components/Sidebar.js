import React ,{useState, useEffect}from 'react';
import './Sidebar.css'
import {Avatar ,IconButton} from '@material-ui/core'
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from './SidebarChat';
import db from '../firebase';
import { useParams } from 'react-router-dom';
import { DataLayerValue } from '../data layer/Data';

const Sidebar = () => {
  const [rooms, setRooms] = useState([])
  const [{ user }] = DataLayerValue();

  useEffect(() => {
    const unsubscribe =db.collection("Rooms").onSnapshot((snapshot) =>
      setRooms(snapshot.docs.map((doc) => ({
        id:doc.id,
        data:doc.data(),
      })))
    ) 
    return() =>{
      unsubscribe()
    }
  }, []);
  
    return (
      <div className="sideBar">
        <div className="SidebarHeader">
          <Avatar src={user?.photoURL} />
          <div className="SidebarHeaderRight">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="sidebarSearch">
          <div className="sidebarSearchContainer">
            <SearchIcon />
            <input type="text" placeholder="Search or Start a new Chat" />
          </div>
        </div>
        <div className="SidebarChats">
          <SidebarChat addNewChat/>
        {rooms.map( (room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.Name}/>
        ))}

        </div>
      </div>
    );
}

export default Sidebar;
