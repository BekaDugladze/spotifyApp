import React, { Component } from 'react';
import './css/main.css';
import Logo from './photo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import Song from './songs';

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
          authorized: false,
          userBut: false,
          username: null,
          searchDiv: false,
          searchQuery: '',
          list: null,
        };
      }
         handleLogout = async () => {
          try {
            const response = await fetch('https://spotify-back-vsee.onrender.com/logout', {
              method: 'GET',
              credentials: 'true', // Include credentials for CORS
            });
      
            if (!response.ok) {
              throw new Error('Logout failed');
            }

            this.setState({authorized: false})
      
            // Redirect or handle UI changes after successful logout
          } catch (error) {
            console.error('Error during logout:', error);
          }
        };
    
      userButtonClick = (prev) => {
        this.setState({ userBut: !prev });
      };
      
      searchButtonClick = (prev) => {
        this.setState({ searchDiv: !prev });
      };
    
      componentDidMount() {
          console.log('I work')
  this.profileData();
}

profileData = async () => {
  try {
    const response = await fetch('https://spotify-back-vsee.onrender.com/profile', {
      method: 'GET',
      credentials: 'true',
    });

    if (!response.ok) {
      console.log('Unauthorized or other error:', response.status);
      this.setState({ authorized: false });
    }

    const data = await response.json();
    console.log('Profile data response:', data);

    if (data.message) {
        console.log(data.message)
      this.setState({ authorized: true, username: data.message });
    } else {
      this.setState({ authorized: false });
    }
  } catch (err) {
    this.setState({ authorized: false });
    console.error('Error during profileData:', err);
  }
};
    
      render() {
          console.log(this.state.authorized)
          console.log(this.state.username)
        return (
          <header className="head">
            <div className="logohead">
              <img id="logo" src={Logo} alt="Logo" />
              <h1>New Spotify</h1>
            </div>
            <a href="">
              <FontAwesomeIcon icon={faHouse} style={{ margin: '0 5px' }} /> Home
            </a>
            <button 
            onClick={() => this.userButtonClick(this.state.userBut)} 
            id="user"
            style={this.state.userBut ? { margin: '10px 0 0 0'} : { margin: '10px 0 10px 0'}}
            >
              <FontAwesomeIcon icon={faUser} style={{ margin: '0 5px' }} /> User
            </button>
            {this.state.userBut && (
              <div style={{width: '100%', marginBottom: '10px'}}>
                {this.state.authorized ? (
                    <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                    >
                        <h1
                        style={{
                            color: 'white',
                            fontSize: '15px',
                            fontFamily: 'Noto Sans Gothic',
                        }}
                        >{this.state.username}</h1>
                        <button id='logout' onClick={() => this.handleLogout()}>logout</button>
                    </div>
                ) : (
                    <>
                        <a id='googleA' className='a' href='https://spotify-back-vsee.onrender.com/auth/google'><FontAwesomeIcon icon={faGoogle} style={{margin: '0 10px 0 0'}}/>Login with Google</a>
                        <a id='facebookA' className='a' href='https://spotify-back-vsee.onrender.com/auth/facebook'><FontAwesomeIcon icon={faFacebook} style={{margin: '0 10px 0 0'}}/>Login with Facebook</a>
                        <a id='spotifyA' className='a' href='https://spotify-back-vsee.onrender.com/auth/spotify'><FontAwesomeIcon icon={faSpotify} style={{margin: '0 10px 0 0'}}/>Login with Spotify</a>
                    </>
                )}
              </div>
            )}
          </header>
        );
      }
}
