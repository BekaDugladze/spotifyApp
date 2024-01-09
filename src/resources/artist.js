import {React, Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './css/artist.css'

export default class Artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
          list: null,
            selectedSong: null,
            searchQuery: '',
            tabs: 'but1'
        }
    }

    
    handleRandom = async () => {
      try {
        const response = await fetch('https://spotify-back-vsee.onrender.com/artists/random', {
          method: 'GET',
        });
  
        if (!response.ok) {
          console.log('Fetching error:', response.status);
          this.setState({list: null})
        }
  
        const data = await response.json();
        this.setState({ list: data.artists });
      } catch (err) {
        console.log(err.message)
      }
    };

    componentDidMount() {
      this.handleRandom()
    }

        
      handleList = async () => {
        try {
          const response = await fetch('https://spotify-back-vsee.onrender.com/artists', {
            method: 'GET',
          });
    
          if (!response.ok) {
            console.log('Fetching error:', response.status);
            this.setState({list: null})
          }
    
          const data = await response.json();
          this.setState({ list: data.artists });
        } catch (err) {
          console.log(err.message)
        }
      };
    
      search = async () => {
        try {
          const response = await fetch(`https://spotify-back-vsee.onrender.com/artists?query=${encodeURIComponent(this.state.searchQuery)}`, {
            method: 'GET',
            credentials: 'include',
          });
      
          const data = await response.json();
          this.setState({ list: data.artists });
        } catch (err) {
          console.log(err);
        }
      }

      handleSearch = (value) => {
        this.setState({searchQuery: value});
        this.search(value);
        this.handleList();
      };
      
    render(){
      const list = this.state.list
    return(
          <div className="artists">
            <div style={{display: 'flex', flexDirection: 'row',   width: '100%', justifyContent: 'center', padding:'5px 0'}}>
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
    
          <div style={{display: 'flex', justifyContent:'center'}}>
            {this.state.list  ?
      (<ul className="artistUl">
      {list.map((item) => (
            <li key={item.id}>
              {item.images[0] && <img src={item.images[0].url} alt={`${item.name} thumbnail`}  style={{width: '100%', borderRadius: '25px 25px 0 0'}}/>}
              <h3>{item.name}</h3>
              <p>Popularity: {item.popularity}</p>
              <p>Genres: {item.genres.join(', ')}</p>
              <p>Followers: {item.followers.total}</p>
              </li>
          ))}

      </ul>) : (
        <div>Search Artist</div>
        )}
    </div>
        </div>)
}
}