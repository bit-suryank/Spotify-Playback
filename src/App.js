import './App.css';
import Login from './Login';
import Player from './Player';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      // const response = await fetch('auth/token');
      // const json = await response.json();
      // console.log(json)
      // setToken(json.access_token);
      const response = await axios.get('http://localhost:3000/auth/token', {
        headers:{
          "Content-Type":"aplication/json",
        }
      });
      console.log(response)
      setToken(response.data.access_token)
    }
    getToken();

  }, []);

  return (
    <div className="App">
      { (token === '') ? <Login/> : <Player token={token} /> }
    </div>
  );
}

export default App;
