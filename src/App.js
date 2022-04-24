import React,{setUser,useState} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { BrowserRouter as Router,Switch , Route} from 'react-router-dom'
import Login from './components/Login';
import { DataLayerValue } from "./data layer/Data";
function App() {
  
   const [{ user }] = DataLayerValue();
  return (
    <div className="app">
      {!user ?(<Login/>) :(<div className="appBody">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>)}
      
    </div>
  );
}

export default App;
