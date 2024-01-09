import {React, Component} from "react";
import './css/song.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            selectedSong: null,
            searchQuery: '',
            tabs: 'but1',
            random: null,
        }
    }

    handleList = async () => {
      try {
        const response = await fetch('https://spotify-back-r0od.onrender.com/songs', {
          method: 'GET',
        });
  
        if (!response.ok) {
          console.log('Fetching error:', response.status);
          this.setState({list: null})
        }
  
        const data = await response.json();
        this.setState({ list: data });
      } catch (err) {
        console.log(err.message)
      }
    };

    handleRandom = async () => {
      try {
        const response = await fetch('https://spotify-back-r0od.onrender.com/random', {
          method: 'GET',
        });
  
        if (!response.ok) {
          console.log('Fetching error:', response.status);
          this.setState({list: null})
        }
  
        const data = await response.json();
        this.setState({ list: data });
      } catch (err) {
        console.log(err.message)
      }
    };

    componentDidMount() {
      this.handleRandom()
    }

      handleListenOnSpotifyClick = (selectedSong) => {
        this.setState({ selectedSong });
      };

      search = async () => {
        try {
          const response = await fetch(`https://spotify-back-r0od.onrender.com/songs?query=${encodeURIComponent(this.state.searchQuery)}`, {
            method: 'GET',
            credentials: 'include',
          });
      
          const data = await response.json();
          this.setState({ list: data });
        } catch (err) {
          console.log(err);
        }
      }




      handleSearch = (value) => {
        this.setState({searchQuery: value});
        this.search(value);
        this.handleList();
      }



      handleTabs = (value) => {
        this.setState({tabs: value});
      }



    render() {
        const { list, artists } = this.state;

    return (
      <div className="songs">
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <input 
                type="text"
                value={this.state.searchQuery}
                onChange={(e) => {this.setState({searchQuery: e.target.value})}}
                placeholder="Search for music..."
                />
                <button 
                style={{margin: '0 10px', background: 'white', color: 'black', border: 'none', borderRadius: '25px', cursor: 'pointer'}}
                onClick={() => {
                  this.handleSearch(this.state.searchQuery)
                }}><FontAwesomeIcon icon={faSearch} style={{ margin: '0 5px' }} />
                </button>
            </div>
        
            {list && list.tracks && list.tracks.items.length > 0 ? (
              <ul className="songUl">
                {list.tracks.items.map((item) => (
                  <li key={item.id}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100% !important'}}>
                      <div style={{display: 'flex', flexDirection: 'column', margin: '0 30px'}}>
                    <p>{item.name}</p>
                    <p>Artist: {item.artists[0].name}</p>
                    <p>Album: {item.album.name}</p>
                    <p>Release Date: {item.album.release_date}</p>
                      </div>
                    <img src={item.album.images[0].url} alt={item.name} style={{width: '150px', height: 'auto', margin: '0 30px'}}/>
                    </div>
                    <p>
                    <iframe
                    title={`Spotify Player - ${item.name}`}
                    src={`https://open.spotify.com/embed/track/${item.id}`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    ></iframe>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{color: 'white'}}>No songs found</p>
            )}

      </div>
    );
    }
}
