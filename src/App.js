import React, { Component } from 'react';
import firebase from "firebase";
import logo from './logo.svg';
import './App.css';
import AddSong from "./components/AddSong.js";
import Playlist from "./containers/Playlist";


class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      playlist:["Shape of You", "Shaky Shaky", "Despacito"]
    };
    // this.addSongToPlaylist = this.addSongToPlaylist.bind(this)
  }

  componentDidMount(){ //llamar a firebase
    const config ={
      apiKey: "AIzaSyBTEw3qIYohYEcEl11M3tAG8WXitjzmnGo",
      authDomain: "spotirank-53712.firebaseapp.com",
      databaseURL: "https://spotirank-53712.firebaseio.com",
      projectId: "spotirank-53712",
      storageBucket: "spotirank-53712.appspot.com",
      messagingSenderId: "409334684875"
    };
    const app = firebase.initializeApp(config);
    this.database = app.database();

    const playlistDatabase = this.database.ref("/playlist");
    playlistDatabase.set({
      songs:["Palmar"]
    });

    playlistDatabase.on("value", (snapshot) =>{
      const songs = snapshot.val();
      console.log(songs);
    });
  }

  addSongToPlaylist = (song) =>{ //funciona con  y remplaza al metodo bind
    let playlist = this.state.playlist;
    playlist.push(song);
    this.setState({
      playlist: playlist
    });
  }

  render() {
    const songs = this.state.playlist;

    return (
      <div className="App">
        <div>
          <h1>SpotiRank</h1>
          <AddSong addSongToPlaylist = {this.addSongToPlaylist}/>
          <Playlist songs = {songs}/>
        </div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
      </div>
    );
  }
}

export default App;
