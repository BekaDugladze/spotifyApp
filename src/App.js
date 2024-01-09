import logo from './logo.svg';
import Main from './resources/main';
import Song from './resources/songs';
import Artist from './resources/artist';
import './App.css';
import React, {useEffect} from 'react';

function App() {
  useEffect(() => {
    const handleContextMenu = (event) => {
        event.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
    };
}, []);
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{display: 'flex', flexDirection: 'column', maxWidth: '25%', justifyContent:'space-between', alignContent:'space-between'}}>
        <Main />
        <Artist />
      </div>
      <Song />
    </div>
  );
}

export default App;
